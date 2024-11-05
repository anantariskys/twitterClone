import {
  LoaderFunction,
  ActionFunction,
  json,
  redirect,
  MetaFunction,
} from "@remix-run/node";
import { useLoaderData, Form, Link } from "@remix-run/react";
import { getUserFromSession, clearSession } from "~/auth.server";
import { prisma } from "~/db.server";
import Button from "~/components/Button";
import Main from "~/components/home/Main";
import createPost from "~/actions/post/createPost";
import getAllPost from "~/actions/post/getAllPost";
import { Icon } from "@iconify/react";
import Sidebar from "~/components/Sidebar";
export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserFromSession(request);

  if (!userId) {
    return redirect("/auth/login");
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });
  const posts = await getAllPost();

  return json({ user, posts });
};

export const meta: MetaFunction = () => {
  return [
    { title: "TweetNest" },
    {
      description:
        "TweetNest adalah platform media sosial yang memungkinkan Anda berbagi pemikiran, gambar, dan konten lainnya dengan mudah. Terhubung dengan teman, temukan konten menarik, dan bergabung dalam percakapan yang Anda sukai di TweetNest, sarang media sosial yang ramah dan informatif.",
    },
  ];
};

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserFromSession(request);
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  let response;

  if (actionType === "logout") {
    return clearSession(request);
  } else if (actionType === "post") {
    response = await createPost(formData, userId);
    return response;
  }

  return json({ error: "Invalid action" }, { status: 400 });
};

const Dashboard = () => {
  const { posts } = useLoaderData<any>();

  return (
    <div className="text-primary container flex ">
     <Sidebar/>
      <Main posts={posts} />
    </div>
  );
};

export default Dashboard;
