"use client";

import Loading from "./loading";
import { auth, db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const body = () => {
  const [notice, setNotice] = useState([]);


  const router = useRouter();

  const [user] = useAuthState(auth)
  const [isLoading, setLoading] = useState(true);

  const handleClick = () =>{
    if(user){
      router.push('/addNotice')
    }else{
      router.push('/signin')
    }
  }

  //Fetching data
  useEffect(() =>{

    const q = query(collection(db, "notice"));
    const order = query(q, orderBy('createdAt'))
    const unsub = onSnapshot(order, (querySnapshot)=>{
      let qArry = [];
      querySnapshot.forEach((doc) =>{
        qArry.push({id: doc.id, ...doc.data()})
      });
      setNotice(qArry)
      setLoading(false)
    })
    return unsub;
  },[]) 

  return (
    <div className='min-h-screen bg-[url("../assets/shape-5.png")] bg-contain bg-no-repeat bg-slate-700'>
      <h1 className="text-[#dbb743] text-3xl font-bold p-2 text-center">
        Ribs & Rythm Staff Portal
      </h1>
      <p className="text-white text-center p-2 text-xs lg:text-base">
        Any information or notices from the management will be accessed from
        here.
      </p>

      <ul className="flex flex-col justify-center items-center p-5 md:p-6 bg-[url('../assets/shape-5.png')] bg-contain bg-no-repeat bg-slate-950 mx-2 md:mx-10 rounded-md">
        {isLoading ? <Loading /> :
        notice.map((item, id) => (
          <li
            key={id}
            className="flex flex-col max-w-[500px] border odd:bg-slate-700 rounded-md mb-6 gap-3 border-s-white p-6 mx-auto"
          >
            <span className="text-[#dbb743] text-xl">{item.title}</span>
            <span className="text-white text-xs lg:text-base">
              {item.description}
            </span>
            <span className="text-white text-xs lg:text-base">
              From: {item.username}
            </span>
            <span className="text-gray-500 text-xs">{item.createdAt.toDate().toLocaleString()}</span>
            <button></button>
          </li>
        ))}
      <div className="mt-7 z-10 ">
          <button
          onClick={handleClick}
           className="group flex items-center bg-white text-black font-medium border border-gray-300 px-3 py-2 rounded-full transition-all duration-300 ease-in-out w-11 hover:w-52 shadow-lg overflow-hidden">
            <span className="w-6 h-6 flex text-3xl items-center justify-center rounded-full transition-all duration-300 group-hover:mr-3">
              +
            </span>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Click to add notice
            </span>
          </button>
      </div>
      </ul>
    </div>
  );
};

export default body;
