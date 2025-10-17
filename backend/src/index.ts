import { Hono } from 'hono'
import { getPrisma } from './usefulFunctions/prismaFunction'
import { sign, verify } from 'hono/jwt'
import { userRouter } from './routes/user'
import { blogRouter } from './routes/blog'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string,
  }
}>()

app.route('/api/v1/user', userRouter);
app.route('/api/v1/blog', blogRouter);

app.get('/', async (c) => {
  const prisma = getPrisma(c.env.DATABASE_URL)

  return c.text('Hello Hono!')
})



export default app

