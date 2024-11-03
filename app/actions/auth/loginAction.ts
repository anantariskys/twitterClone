import { json, redirect } from "@remix-run/node";
import {prisma} from '~/db.server';
import bcrypt from 'bcrypt';
import { commitSession, getSession } from "~/session.server";
export const loginAction = async (formData: FormData) => {
  const email = formData.get("email")?.toString() || "";
  const password = formData.get("password")?.toString() || "";

  if ( !email || !password) {
    return json({ error: "All fields are required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return json({ error: "Invalid email" }, { status: 401 });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return json({ error: "Invalid password" }, { status: 401 });
  }


const session = await getSession();
session.set("userId", user.id);


return redirect("/", {
  headers: {
    "Set-Cookie": await commitSession(session),
  },
});
};


