import { Hono } from 'hono'
import { getPrisma } from '../usefulFunctions/prismaFunction'
import { sign, verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from '@araf1/medium-common'


export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  },
  Variables: {
    userId: string
  }
}>()


blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header('Authorization') ?? ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader

  if (!token) {
    c.status(401)
    return c.json({ error: 'Missing Authorization token' })
  }

  try {
    const payload = await verify(token, c.env.JWT_SECRET) as Record<string, unknown>;
    const userId = (payload && typeof payload === 'object' && typeof (payload as any).id === 'string') ? (payload as any).id : undefined;
    if (!userId) {
      c.status(401);
      return c.json({ error: 'Invalid token payload' });
    }
    const prisma = getPrisma(c.env.DATABASE_URL);
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      c.status(401);
      return c.json({ error: 'Invalid token payload' });
    }
    c.set("userId", userId)
  } catch (e) {
    c.status(401);
    return c.json({ error: 'Invalid or expired token' });
  }
  return next();
})



blogRouter.post('/', async (c) => {
  const body = await c.req.json();

  const {success} = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({message: "Incorrect input(s)"})
  }

  const prisma = getPrisma(c.env.DATABASE_URL);
  const blog = await prisma.post.create({
    data:{
      title: body.title,
      content: body.content,
      authorId: c.get("userId"),
    }
  })
  return c.json({
    id: blog.id
  })
})

blogRouter.put('/:id', async (c) => {
  const body = await c.req.json();

  const {success} = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({message: "Incorrect input(s)"})
  }

  const id = c.req.param("id");
  const prisma = getPrisma(c.env.DATABASE_URL);

  const blog = await prisma.post.update({
    where:{
      id,
    },
    data:{
      title: body.title,
      content: body.content
    }
  })
  return c.json({id: blog.id})
})

blogRouter.get('/bulk', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL);
  const blogs = await prisma.post.findMany();
  return c.json({blogs})
})

blogRouter.get('/:id', async (c) => {
  const id = c.req.param("id")
  const prisma = getPrisma(c.env.DATABASE_URL);

  try {const blog = await prisma.post.findFirst({ where: { id}});
  return c.json({blog})}
  catch(e){
    c.status(411);
    return c.json({message: "Error while fetching the blog post"})
  }
})





