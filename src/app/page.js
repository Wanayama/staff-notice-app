'use client'
import Header from "@/components/header";
import Body from "@/components/body";
import { Suspense } from "react";




export default function Home() {


  return (
    <>
    <Header/>
    <Suspense>
    <Body/>
    </Suspense>
    </>
  );
}
