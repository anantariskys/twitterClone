import React, { useState } from "react";
import Sidebar from "~/components/Sidebar";
import { Form, useLoaderData } from "@remix-run/react";
import { User } from "~/intefaces/user";
import { prisma } from "~/db.server";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { getUserFromSession } from "~/auth.server";
import Button from "~/components/Button";
import ProfileCard from "~/components/profile/ProfileCard";
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";

  const userId = await getUserFromSession(request);
  if (!userId) {
    return redirect("/auth/login");
  }

  if (query) {
    const users = await prisma.user.findMany({
      where: {
        username: {
          contains: query,
        },
        id: {
          not: userId,
        },
      },
      include: {
        _count: true,
      },
    });

    return json({ users });
  } else {
    const users = await prisma.user.findMany({
      where: {
        id: {
          not: userId,
        },
      },
      include: {
        _count: true,
      },
    });

    console.log(users);

    return json({ users });
  }
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserFromSession(request);
  if (!userId) {
    return redirect("/auth/login");
  }
  const formData = await request.formData();
  const targetUserId = parseInt(formData.get("targetUserId") as string, 10);

  if (!targetUserId) {
    return json({ error: "Invalid user ID" }, { status: 400 });
  }

  const existingFollow = await prisma.userFollow.findFirst({
    where: {
      followerId: userId,
      followingId: targetUserId,
    },
  });

  if (existingFollow) {
    await prisma.userFollow.delete({
      where: { id: existingFollow.id },
    });
  } else {
    await prisma.userFollow.create({
      data: {
        followerId: userId,
        followingId: targetUserId,
      },
    });
  }

  return json({ success: true });
};

const Search = () => {
  const data = useLoaderData<{ users: User[] | null }>();
  const [query, setQuery] = useState("");

  return (
    <div className="text-primary container flex ">
      <Sidebar />
      <main className="w-full p-4">
        <h1 className="text-2xl font-semibold mb-4">Search Users</h1>
        <Form method="get" action="/search" className="mb-4 ">
          <input
            type="text"
            name="query"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by username"
            className="border border-primary rounded px-2 py-1 mr-2"
          />
          <button
            type="submit"
            className="bg-primary text-white px-4 py-1 rounded"
          >
            Search
          </button>
        </Form>

        <section className="">
          {data?.users ? (
            <div className="grid grid-cols-3 gap-4 grid-rows-1 ">
              {data.users?.map((user) => (
                <ProfileCard user={user} />
              ))}
            </div>
          ) : (
            <p>No users found.</p>
          )}
        </section>
      </main>
    </div>
  );
};

export default Search;
