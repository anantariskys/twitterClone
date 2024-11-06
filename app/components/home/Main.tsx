import React, { useEffect, useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import Button from "../Button";
import Toast from "../Toast";
import TweetCard from "../TweetCard";
import PostForm from "./PostForm";
import { Post } from "~/intefaces/post";

interface Props {
  posts: Post[];
}

const Main: React.FC<Props> = ({ posts }) => {
  const actionData = useActionData<{ error?: string; message?: string }>();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    setShowToast(!!actionData?.error || !!actionData?.message);
  }, [actionData]);

  return (
    <main className=" w-full">
      <PostForm />
      {showToast && (
        <Toast
          message={
            actionData?.error || actionData?.message || "Something went wrong"
          }
          type="primary"
          position={true}
          classname="bottom-4 right-4"
          onClose={() => setShowToast(false)}
          duration={2000}
        />
      )}
      <section className="p-4 w-full max-w-2xl space-y-2">
        {posts.map((post) => (
          <TweetCard post={post} key={post.id} />
        ))}
      </section>
    </main>
  );
};

export default Main;
