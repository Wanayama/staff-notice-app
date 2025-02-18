"use client";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useState, useCallback } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const handleSignin = useCallback(
    async (e) => {
      e.preventDefault();
      if (!email || !password) {
        alert("Please fill in all fields.");
        return;
      }

      try {
        const res = await signInWithEmailAndPassword(email, password);
        if (res) {
          setEmail("");
          setPassword("");
          router.push("/");
        }
      } catch (error) {
        console.error("Sign-in error:", error);
      }
    },
    [email, password, signInWithEmailAndPassword, router]
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('../assets/shape-2.png')] bg-contain bg-slate-900">
      <div className="w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Sign In
        </h2>
        <form onSubmit={handleSignin}>
          <div className="mb-4">
            <label className="block text-white font-medium mb-2">Email</label>
            <input
              type="email"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eace7a]"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-white font-medium mb-2">Password</label>
            <input
              type="password"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#eace7a]"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error.message}</p>}
          <button
            type="submit"
            className={`w-full p-3 rounded-lg font-medium transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-[#eace7a] hover:bg-[#ae995a] text-white"
            }`}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
