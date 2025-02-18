"use client";
import { db } from "@/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [newNotice, setNewNotice] = useState({
    title: "",
    description: "",
    username: "",
  });
  // const [file, setFile] = useState(null);

  // const handleFileChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  const router = useRouter();

  const addNotice = async (e) => {
    e.preventDefault();
    if (
      newNotice.username !== "" &&
      newNotice.title !== "" &&
      newNotice.description !== ""
    ) {
      await addDoc(collection(db, "notice"), {
        username: newNotice.username.trim(),
        title: newNotice.title.trim(),
        description: newNotice.description,
        createdAt: serverTimestamp()
      });
      setNewNotice({
        title: "",
        description: "",
        username: "",
      });
      alert("Notice uploaded successfully")
      router.push('/')
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('../assets/shape-2.png')] bg-contain bg-slate-900">
      <div className="w-full max-w-md p-8 sm:mx-4 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Upload Notice
        </h2>
        <form>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border bg-transparent text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eace7a]"
              placeholder="Enter your username"
              value={newNotice.username}
              onChange={(e) => setNewNotice({...newNotice, username: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border bg-transparent text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eace7a]"
              placeholder="Enter notice title"
              value={newNotice.title}
              onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
            />
          </div>
          <div className="mb-4">
            <textarea
              className="w-full p-3 border bg-transparent text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eace7a]"
              placeholder="Enter your message"
              value={newNotice.description}
              onChange={(e) => setNewNotice({...newNotice, description: e.target.value})}
            />
          </div>
          {/* <div className="mb-4">
          <label className="block text-white font-medium mb-2">Upload File</label>
          <input
            type="file" 
            className="w-full text-gray-200 p-3 border rounded-lg focus:outline-none" 
            onChange={handleFileChange}
          />
        </div> */}
          <button
            onClick={addNotice}
            type="submit"
            className="w-full bg-[#eace7a] text-white p-3 rounded-lg font-medium hover:bg-[#eace7a] transition"
          >
            Submit Notice
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
