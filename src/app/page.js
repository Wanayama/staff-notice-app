'use client'
import Header from "@/components/header";
import Body from "@/components/body";
import { Suspense } from "react";
import Loading from "./loading";




export default function Home() {


  return (
    <>
    <Header/>
    <Suspense fallback={<Loading/>}>
    <Body/>
    </Suspense>
    </>
  );
}
