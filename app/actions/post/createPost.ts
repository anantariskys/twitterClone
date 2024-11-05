import { data, json } from "@remix-run/node";
import { prisma } from "~/db.server";
import { uploadImageToFirebase } from "~/utils/firebase";

const createPost = async (formData: FormData, userId: number) => {
  const content = formData.get("content")?.toString() || "";
  const imageFile = formData.get("image") as File;

 

  if (!content) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  if (imageFile.name) {
    
    const url = await uploadImageToFirebase(imageFile);
    const post = await prisma.post.create({
      data: {
        content,
        userId,
        image: url,
      },
    });

    return json(
      { message: "Post created successfully with image", data: post },
      { status: 200 }
    );
  }

  const post = await prisma.post.create({
    data: {
      content,
      userId,
    },
  });

  return json(
    { message: "Post created successfully without image"},
    { status: 200 }
  );
};

export default createPost;
