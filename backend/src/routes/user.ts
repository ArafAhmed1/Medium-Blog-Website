import { Hono } from 'hono'
import { getPrisma } from '../usefulFunctions/prismaFunction'
import { sign } from 'hono/jwt'
import { signinInput } from '@araf1/medium-common'
import { signupInput } from '@araf1/medium-common'

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()


userRouter.post('/signup', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)

  const body = await c.req.json();
  const {success} = signupInput.safeParse(body)
  if(!success){
    c.status(411);
    return c.json({
      message: "Incorrect input(s)"
    })
  }
  try{const user = await prisma.user.create({
    data:{
      email: body.email,
      password: body.password,
      name: body.name,
    },
  })
  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
  return c.json({jwt})}
  catch(e){
    c.status(411);
    return c.text("Invalid credentials")
  }
})

userRouter.post('/signin', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)
  const body = await c.req.json();
  const {success} = signinInput.safeParse(body)
  if(!success){
    c.status(411);
    return c.json({
      message: "Incorrect input(s)"
    })
  }
  const { email, password } = body ?? {}
  if (!email || !password) {
    return c.json({ error: 'Email and password are required' }, 400)
  }

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user || user.password !== password) {
    return c.json({ error: 'Invalid credentials' }, 401)
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET)
  return c.json({ jwt })
})


