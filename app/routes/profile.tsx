import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import Button from "~/components/Button";
import Sidebar from "~/components/Sidebar";

const profile = () => {
  return (
    <div className="text-primary container flex ">
      <Sidebar />
      <main className="w-full">
        <section className="p-4 sticky top-0 border-b flex items-center gap-4">
          <Icon icon={"weui:back-filled"} className="text-2xl font-bold" />
          <div>
            <h3 className="font-semibold">ananta risky susanto</h3>
            <small className="text-gray-500">0 Postingan</small>
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
              <h1 className="text-2xl font-semibold">Ananta risky susanto</h1>
              <p>@susanto_ananta</p>
            </div>
            <div className="flex gap-4">
              <p>0 Mengikuti</p>
              <p>0 Pengikut</p>
            </div>
          </div>
          <h3 className="font-semibold">Postingan</h3>
        </section>
        <section>
          ini section postingan
        </section>
        
      </main>
    </div>
  );
};

export default profile;
