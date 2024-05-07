import React from "react";
import { UserMenu } from "auth/UserMenu";

export const Navbar = () => {
  return (
    <div className="flex bg-white justify-end px-10 py-5 fixed top-0 left-0 right-0">
      <UserMenu />
    </div>
  );
};
