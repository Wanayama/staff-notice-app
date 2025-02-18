'use client'
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth)
  const router = useRouter()

  const handleSignin = async (e)=>{
    e.preventDefault()
    try{
      const res = await signInWithEmailAndPassword(email, password);
      console.log({res})
      setEmail('')
      setPassword('')
      router.push('/')
    }catch(error){
      console.log(error)
    }
  }


  return (
    <div className="flex min-h-screen items-center justify-center bg-[url('../assets/shape-2.png')] bg-contain bg-slate-900">
      <div className="w-full max-w-md  p-8 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Sign In</h2>
        <form>
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
         
          <button onClick={handleSignin} className="w-full bg-[#eace7a] text-white p-3 rounded-lg font-medium hover:bg-[#ae995a] transition">Sign In</button>
        </form>
      </div>
    </div>
  );
}
