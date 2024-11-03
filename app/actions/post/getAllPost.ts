import { json } from "@remix-run/node";
import {prisma } from "~/db.server";

const getAllPost = async () => {
    const posts = await prisma.post.findMany({
        include:{
            user:true,
     
        },
    });
    return posts;
};

export default getAllPost