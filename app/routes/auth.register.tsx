import {  ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import {  useActionData } from "@remix-run/react";
import { useState } from "react";

import RegisterForm from "~/components/auth/RegisterForm";
import { registerUser } from "~/actions/auth/registerAction";
import { getUserFromSession } from "~/auth.server";

export const meta = () => {
  return [{ title: "Register Page" }, { description: "Register your account" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserFromSession(request);
  if (userId) {
    return redirect("/");
  }
return userId 
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  return await registerUser(formData);
};

interface ActionData {
  error?: string;
  message?: string;
}

const Register = () => {
  const actionData = useActionData<ActionData>();
  const [credential, setCredential] = useState({
    email: "",
    password: "",
    username: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setCredential((prevCredential) => ({
      ...prevCredential,
      [id]: value,
    }));
  };

  return (
    <div className="h-screen flex">
      <section className="w-full h-full bg-black relative">
        <img
          className="object-cover w-full h-full"
          src="https://random-image-pepebigotes.vercel.app/api/random-image"
          alt="Random background"
        />
        <div className="size-full flex justify-center gap-4 px-20 flex-col absolute left-0 top-0 bg-opacity-70 bg-black">
          <h1 className="text-9xl font-bold">TweetNest</h1>
          <p className="text-xl max-w-2xl">
            Connect and share your thoughts with the world. Join the
            conversation on TweetNest!
          </p>
        </div>
      </section>
      <RegisterForm
        credential={credential}
        handleChange={handleChange}
        error={actionData?.error}
        message={actionData?.message}
      />
    </div>
  );
};

export default Register;
