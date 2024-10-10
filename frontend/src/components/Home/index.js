import React, { useState } from "react";
import SearchBar from "./../SearchBar/index";
import RecipesList from "./../RecipesList/index";
import Pagination from "../Pagination";

const Home = () => {
  const [titleInput, setTitleInput] = useState("");

  return (
    <div className="home-container grid grid-cols-1 justify-center min-h-[calc(100vh-80px)] bg-blue-100 py-8 px-5 sm:px-14 lg:px-32 gap-10 md:gap-5">
      <SearchBar titleInput={titleInput} setTitleInput={setTitleInput} />
      <RecipesList titleInput={titleInput} setTitleInput={setTitleInput} />
    </div>
  );
};

export default Home;
