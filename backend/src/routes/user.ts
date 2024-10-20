import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { signinInput, signupInput } from "@shashwat_1205/medium-common";

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string
        SECRET: string
    }
}>();


userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({ 
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json()
  const { success } = signupInput.safeParse(body)
  if(!success){
    c.status(411)
    return c.json({message:"Invalid request body"})
  }
  try{
    const user = await prisma.user.create({
      data:{
        email: body.username,
        password: body.password,  
        name: body.name
      }
    })
    const token = await sign({id: user.id}, c.env.SECRET)
  
    return c.json({
      jwt: token
    })
  }catch{
    c.status(403)
    return c.json({
      error: "Signup Failed, User already exists"
    })
  }

})

userRouter.post('/signin', async (c) => {
    
    const prisma = new PrismaClient({ 
      datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())
  
  const body = await c.req.json()
//   const { success } = signinInput.safeParse(body)
//   if(!success){
//     c.status(411)
//     return c.json({message:"Invalid request body"})
//   }
  const user = await prisma.user.findUnique({
    where: {
      email: body.username,
      password: body.password
    }
  })
  if (!user){
    c.status(403);
    return c.json({
      error: "Invalid credentials" 
    })
  }

  const token = await sign({id: user.id}, c.env.SECRET)
  return c.json({
    jwt: token
  })
})