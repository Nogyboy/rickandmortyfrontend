import React from "react";
import useFetchCharacters from "../hooks/useFetchCharacters";

const Home = () => {
  const { characters, loading, error }:any = useFetchCharacters(); 
  console.log("🚀 ~ file: Home.tsx:6 ~ Home ~ error:", error)
  console.log("🚀 ~ file: Home.tsx:6 ~ Home ~ loading:", loading)
  console.log("🚀 ~ file: Home.tsx:6 ~ Home ~ characters:", characters)
 
 

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
     
  </div>
  );
};

export default Home;
