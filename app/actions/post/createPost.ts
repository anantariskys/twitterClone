import { data, json } from "@remix-run/node";
import { prisma } from "~/db.server";

const createPost = async (FormData: FormData, userId: number) => {
  const content = FormData.get("content")?.toString() || "";

  if (!content) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  const post = await prisma.post.create({
    data: {
      content,
      userId,
    },
  });

  return json({ message: "Post created successfully",data: post },{ status: 200 });
};

export default createPost;
