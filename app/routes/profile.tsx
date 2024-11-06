import { Icon } from "@iconify/react/dist/iconify.js";
import { json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
import { getUserFromSession } from "~/auth.server";
import Button from "~/components/Button";
import UserPost from "~/components/profile/UserPost";
import Sidebar from "~/components/Sidebar";
import {prisma} from "~/db.server";
import { Post } from "~/intefaces/post";
import { User } from "~/intefaces/user";


export const loader: LoaderFunction = async ({ params, request }) => {
  const userId = await getUserFromSession(request);
  if (!userId) {
    return redirect("/auth/login");
  }
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include:{
      _count:true

    }
  })
  console.log(user)

  const posts = await prisma.post.findMany({
    where:{
      userId: user?.id
    },
    include:{
      user:true
    }
  })
  return json({ user ,posts });
}
const profile = () => {


  interface LoaderData {
    user: User;
    posts: Post[];
  }


  

  const { user,posts } = useLoaderData<LoaderData>();
 
  return (
    <div className="text-primary container flex ">
      <Sidebar />
      <main className="w-full">
        <section className="p-4 sticky top-0 bg-white z-50 border-b flex items-center gap-4">
          <Icon icon={"weui:back-filled"} className="text-2xl font-bold" />
          <div>
            <h3 className="font-semibold">{user.username}</h3>
            <small className="text-gray-500">{user._count?.post} Postingan</small>
          </div>
        </section>
        <section className="w-full max-h-52 h-full relative">
          <img
            src="https://random-image-pepebigotes.vercel.app/api/random-image"
            className="size-full object-cover relative z-10"
            draggable="false"
            alt="header-image"
          />
          <div className="absolute top-0   z-0 size-full bg-gray-300 animate-pulse"></div>
          <div className=" max-w-36 w-full border-2  bottom-0 translate-y-1/2 left-8 aspect-square rounded-full bg-green-200 absolute  z-20"></div>
        </section>
        <section className="flex flex-col gap-4 p-4 border-b">
          <div className="ms-auto">
            <Button type="button" variant="primary-outline" width="w-fit">
              Edit Profile
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <h1 className="text-2xl font-semibold">{user.email}</h1>
              <p>@{user.username}</p>
            </div>
            <div className="flex gap-4">
              <p>{user._count?.following}  Followers</p>
              <p>{user._count?.followers} Following</p>
            </div>
          </div>
          <h3 className="font-semibold">Postingan</h3>
        </section>
        <UserPost posts={posts}  />
        
      </main>
    </div>
  );
};

export default profile;
