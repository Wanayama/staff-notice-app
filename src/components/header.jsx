import Image from "next/image";
import React, { useEffect } from "react";
import logo from "../assets/logo1.PNG";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { HideLogout } from "./protectedRoutes";

const header = () => {
  const [user] = useAuthState(auth);
  console.log({ user });

  return (
    <div className="flex justify-between items-center bg-slate-800 w-full p-3">
      <Image className="sm: w-[100px]" src={logo} alt="" width={150} />
      <HideLogout>
        <button
          onClick={() => {
            signOut(auth);
            sessionStorage.removeItem("user");
          }}
          className="text-white p-2 border-s-white border rounded-md hover:bg-slate-500 hover:text-slate-900 transition 1s ease-in cursor-pointer"
        >
          Logout
        </button>
      </HideLogout>
    </div>
  );
};

export default header;
