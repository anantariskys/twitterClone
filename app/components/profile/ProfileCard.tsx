import { Form, useLoaderData } from "@remix-run/react";
import React from "react";
import Button from "../Button";
import { User } from "~/intefaces/user";
import { json, LoaderFunction } from "@remix-run/node";
import { getUserFromSession } from "~/auth.server";



const ProfileCard: React.FC<{ user: User }> = ({ user  }) => {

  return (
    <div
      key={user.id}
      className="border-b space-y-2 p-4 w-full max-w-xs rounded-sm bg-white shadow-md  border-gray-300"
    >
      <div>
        <p className="font-medium">{user.username}</p>
        <p className="text-gray-600 text-xs whitespace-normal">{user.email}</p>
      </div>
      <div className="flex items-center gap-4">
        <p className="text-gray-600 text-xs whitespace-normal">
          {user._count?.followers} Following
        </p>
        <p className="text-gray-600 text-xs whitespace-normal">
          {user._count?.following} Followers

        </p>
       
      </div>
      <Form method="post">
        <input type="hidden" value={user.id} name="targetUserId" />
        <Button variant="default" width="w-fit" type="submit">
          {user.isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </Form>
    </div>
  );
};

export default ProfileCard;
