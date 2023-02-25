import React from "react";
import Header from "../components/generic/Header/Header";
import CreatePost from "@/components/generic/CreatePost/CreatePost";
import MainContent from "@/components/home/MainContent/MainContent";

export default function Home() {
  return (
    <>
      <Header />

      <main className="min-h-[65.3vh] my-8">
        <MainContent />

        <CreatePost />
      </main>
    </>
  );
}
