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

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserFromSession(request);

  if (!userId) {
    return redirect("/auth/login");
  }


  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  
  return json({ user });
};

export const action: ActionFunction = async ({ request }) => {
  return clearSession(request);
};

const Dashboard = () => {
  const { user } = useLoaderData<{ user: { id: string; email: string; username: string } }>();

  return (
    <div className="text-primary container flex gap-4">
      <aside className="h-screen sticky top-0 max-w-xs w-full p-4 border-r items-end flex flex-col justify-between border-gray-200">
        <div className="self-center">
          Halo
        </div>
        <Form method="post">
          <Button width="w-fit" variant="default" type="submit">
            Log Out
          </Button>
        </Form>
      </aside>
      <Main user={user} />
    </div>
  );
};

export default Dashboard;
