import React, { useEffect, useState } from "react";
import { Form, useActionData } from "@remix-run/react";
import Button from "../Button";
import Toast from "../Toast";

interface Post {
  id: number;
  content: string;
  userId: number;
  user: User;
  created_at: string;
  image: Image[];
}

interface Image {
  id: number;
  url: string;
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
  console.log("Action Data:", actionData);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    console.log("Effect running. Action Data:", actionData);
    setShowToast(!!actionData?.error);
  }, [actionData]);

  console.log("Render Main Component");

  return (
    <main className="p-4 space-y-4 w-full">
      <input
        type="search"
        placeholder="search"
        className="border-2 border-primary rounded-lg px-2 py-1"
      />

      <Form className="flex flex-col gap-4" method="post">
        <input type="hidden" name="actionType" value="post" />

        <div className="flex flex-col">
          <input
            type="text"
            name="content"
            placeholder={`What's on your mind?`}
            className="border-2 border-primary rounded-lg px-2 py-1"
          />
        </div>
        {/* 
        <div className="flex flex-col">
          <label htmlFor="images" className="text-sm font-semibold">
            Upload Images
          </label>
          <input
            type="file"
            name="images"
            id="images"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="border-2 border-primary rounded-lg px-2 py-1"
          />
          {imagePreviews.length > 0 && (
            <div className="flex gap-2 mt-2">
              {imagePreviews.map((src, index) => (
                <div key={index} className="relative w-20 h-20">
                  <img src={src} alt={`Preview ${index}`} className="w-full h-full object-cover rounded-md" />
                </div>
              ))}
              <button
                type="button"
                onClick={handleClearImages}
                className="text-red-500 font-semibold"
              >
                Clear Images
              </button>
            </div>
          )}
        </div> */}

        <Button type="submit" variant="default" width="w-fit">
          Post!
        </Button>
      </Form>

      {showToast && (
        <Toast
          message={actionData?.error || "Something went wrong"}
          type="primary"
          position={true}
          classname="bottom-4 right-4"
          onClose={() => setShowToast(false)}
          duration={2000}
        />
      )}

      <section className="py-4 w-full max-w-2xl space-y-2">
        {posts.map((post) => (
          <div key={post.id} className="border shadow-lg rounded-md px-2 py-1">
            {/* {post.image?.length > 0 && (
              <div className="flex gap-2">
                {post.image.map((img) => (
                  <div key={img.id} className="relative w-20 h-20">
                    <img src={img.url} alt={`Post image`} className="w-full h-full object-cover rounded-md" />
                  </div>
                ))}
              </div>
            )} */}
            <div className="flex justify-between">
              <small className="font-semibold">{post.user.username}</small>
              <small>{new Date(post.created_at).toLocaleString()}</small>
            </div>
            <p>{post.content}</p>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Main;
