import {
  LoaderFunction,
  ActionFunction,
  json,
  redirect,
} from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import { getUserFromSession, clearSession } from "~/auth.server";
import { prisma } from "~/db.server";
import Button from "~/components/Button";
import Main from "~/components/home/Main";
import createPost from "~/actions/post/createPost";
import getAllPost from "~/actions/post/getAllPost";

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

export const action: ActionFunction = async ({ request }) => {
  const userId = await getUserFromSession(request);
  const formData = await request.formData();
  const actionType = formData.get("actionType");
  let response

  if (actionType === "logout") {
    return clearSession(request);
  } else if (actionType === "post") {
     response = await createPost(formData, userId);
     return response
  }

  return json({ error: "Invalid action" }, { status: 400 });
};

const Dashboard = () => {
  const { posts } = useLoaderData<any>();

  return (
    <div className="text-primary container flex ">
      <aside className="h-screen sticky top-0 max-w-xs w-full p-4 border-r items-end flex flex-col justify-between border-gray-200">
        <div className="self-center">
          <h1 className="text-3xl font-semibold">TweetNest</h1>
        </div>
        <Form method="post">
          <input type="hidden" name="actionType" value={"logout"} />
          <Button width="w-fit" variant="default" type="submit">
            Log Out
          </Button>
        </Form>
      </aside>
      <Main posts={posts} />
    </div>
  );
};

export default Dashboard;
