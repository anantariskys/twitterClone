import { json } from "@remix-run/node";
import {prisma } from "~/db.server";

const getAllPost = async () => {
    const posts = await prisma.post.findMany({
        include:{
            user:true,
     
        },
        orderBy:{
            created_at: "desc"
        }
    });
    return posts;
};

export default getAllPost