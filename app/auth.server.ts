
import { redirect } from "@remix-run/node";
import { prisma } from "~/db.server";
import { destroySession, getSession } from "~/session.server";

export async function getUserFromSession(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const userId = session.get("userId");

  if (!userId) {
    return null;
  }

  return userId;
}

export async function clearSession(request: Request) {
    const session = await getSession(request.headers.get("Cookie"));
    return redirect("/auth/login", {
      headers: {
        "Set-Cookie": await destroySession(session),
      },
    });
  }