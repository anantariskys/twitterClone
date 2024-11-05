import { Icon } from "@iconify/react/dist/iconify.js";
import { Form, Link } from "@remix-run/react";
import React from "react";
import Button from "./Button";

const Sidebar = () => {
  return (
    <aside className="h-screen sticky top-0 max-w-xs w-full p-4 border-r items-end flex flex-col justify-between border-gray-200">
      <div className="self-center space-y-4">
        <Link to={"/"}>
          <h1 className="text-3xl font-semibold">TweetNest</h1>
        </Link>
        <Link
          to={"/profile"}
          className="flex items-center gap-2 text-xl font-semibold"
        >
          <Icon icon={"material-symbols:person"} />
          <p>Profile</p>
        </Link>
      </div>
      <Form method="post">
        <input type="hidden" name="actionType" value={"logout"} />
        <Button width="w-fit" variant="default" type="submit">
          Log Out
        </Button>
      </Form>
    </aside>
  );
};

export default Sidebar;
