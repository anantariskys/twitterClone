
import { json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { uploadImageToFirebase } from "~/utils/firebase";

const createPost = async (formData: FormData, userId: number) => {
  const content = formData.get("content")?.toString() || "";
  const imageFile = formData.get("images") as File;

  if (!content) {
    return json({ error: "All fields are required" }, { status: 400 });
  }



  
  const post = await prisma.post.create({
    data: {
      content,
      userId,
    },
  });

  return json({ message: "Post created successfully"}, { status: 200 });
};

export default createPost;
