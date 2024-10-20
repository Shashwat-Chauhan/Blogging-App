import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    SECRET: string;
  },
  Variables:{
    userId: string;
  }
}>();


blogRouter.use("/*", async (c, next) => {
    const authHeader = c.req.header("authorization") || "";
    const token = authHeader.split(' ')[1]
    const user = await verify(token, c.env.SECRET)
    if (user){
        //@ts-ignore
        c.set("userId", user.id)
        await next()
    }else{
        c.status(403)
        return c.json({
            message: "You are not logged In"
        })
    }
});



blogRouter.post("/", async(c) => {
    const body = await c.req.json();
    const authorId = c.get("userId")
    const prisma = new PrismaClient({ 
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.create({
        data:{
            title: body.title,
            content: body.content,
            authorId: authorId
        }
    })

    return c.json({
        id: blog.id
    });
});

blogRouter.put("/", async(c) => {
    const body = await c.req.json();
    const prisma = new PrismaClient({ 
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.post.update({
        where: {
            id: body.id
        },
        data:{
            title: body.title,
            content: body.content,
        }
    })

    return c.json({
        id: blog.id
    });
});

blogRouter.get("/bulk", async(c) => {
    const prisma = new PrismaClient({ 
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blogs = await prisma.post.findMany();

    return c.json({
        blogs:blogs
    })

});


blogRouter.get("/:id", async(c) => {
    try{
        const id = c.req.param("id")
        const prisma = new PrismaClient({ 
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate())

        const blog = await prisma.post.findFirst({
            where: {
                id: id
            }
        })
        return c.json({
            id: blog
        });
    }catch{
        c.status(411)
        return c.json({error: "Error while fetching blog post"})
    }
    
});

