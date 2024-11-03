import { Form, useActionData } from "@remix-run/react";
import Button from "../Button";

interface Post {
  id: number;
  content: string;
  userId: number;
  user: User;
}
interface User {
  id: number;
  email: string;
  username: string;
  password: string;
}

interface Props {
  posts: Post[];
}

const Main: React.FC<Props> = ({ posts }) => {
  const actionData = useActionData<{ error: string }>();

  return (
    <main className="py-4 space-y-2 w-full">
      <input
        type="search"
        placeholder="search"
        className="border-2 border-primary rounded-lg px-2 py-1"
      />

      <Form className="flex gap-2" method="post">
        <input type="hidden" name="actionType" value="post" />
        <div className="flex flex-col">
          <input
            type="text"
            name="content"
            placeholder={`What's on your mind?`}
            className="border-2 border-primary rounded-lg px-2 py-1"
          />
          {actionData?.error && (
            <small className="text-red-500">{actionData.error}</small>
          )}
        </div>
        <Button type="submit" variant="default" width="w-fit">
          Post!
        </Button>
      </Form>

      <section className=" py-4 w-full max-w-2xl ">
        {posts.map((post) => (
          <div key={post.id} className=" border-primary  px-2 py-1">
            <small className="font-semibold">{post.user.username}</small>
            <p>{post.content}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Main;
