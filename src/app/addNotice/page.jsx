"use client";
import { auth, db } from "@/firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

const Page = () => {
  const [newNotice, setNewNotice] = useState({
    title: "",
    description: "",
    username: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [user] = useAuthState(auth)

  const addNotice = useCallback(async (e) => {
    e.preventDefault();
    if (!newNotice.username || !newNotice.title || !newNotice.description) {
      alert("All fields are required.");
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, "notice"), {
        username: newNotice.username.trim(),
        title: newNotice.title.trim(),
        description: newNotice.description.trim(),
        createdAt: serverTimestamp(),
        userId: user.uid
      });

      setNewNotice({ title: "", description: "", username: "" });
      alert("Notice uploaded successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error adding notice:", error);
      alert("Failed to upload notice. Try again.");
    } finally {
      setLoading(false);
    }
  }, [newNotice, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('../assets/shape-2.png')] bg-contain bg-slate-900">
      <div className="w-full max-w-md p-8 sm:mx-4 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Upload Notice
        </h2>
        <form onSubmit={addNotice}>
          {["username", "title"].map((field) => (
            <div key={field} className="mb-4">
              <input
                type="text"
                className="w-full p-3 border bg-transparent text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eace7a]"
                placeholder={`Enter ${field}`}
                value={newNotice[field]}
                onChange={(e) =>
                  setNewNotice((prev) => ({ ...prev, [field]: e.target.value }))
                }
              />
            </div>
          ))}
          <div className="mb-4">
            <textarea
              className="w-full p-3 border bg-transparent text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eace7a]"
              placeholder="Enter your message"
              value={newNotice.description}
              onChange={(e) =>
                setNewNotice((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </div>
          <button
            type="submit"
            className={`w-full p-3 rounded-lg font-medium transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#eace7a] hover:bg-[#eace7a] text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Notice"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
