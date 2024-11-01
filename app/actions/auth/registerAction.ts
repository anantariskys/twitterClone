
import { json } from "@remix-run/node";
import { prisma } from "../../db.server"; 
import bcrypt from 'bcrypt';

export const registerUser = async (formData: FormData) => {
  const username = formData.get("username")?.toString() || '';
  const email = formData.get("email")?.toString() || '';
  const password = formData.get("password")?.toString() || '';

  if (!username || !email || !password) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  const existingEmail = await prisma.user.findUnique({
    where: { email },
  });
  if (existingEmail) {
    return json({ error: "Email already exists" }, { status: 400 });
  }
  
  const existingUsername = await prisma.user.findUnique({
    where: { username },
  });
  if (existingUsername) {
    return json({ error: "Username already exists" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });

  return json({ message: "User created successfully!" });
};
