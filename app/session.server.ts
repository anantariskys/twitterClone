import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 60 * 60 * 1, 
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
});

export const { getSession, commitSession, destroySession } = sessionStorage;
