import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BeatLoader } from "react-spinners";

const SearchBar = ({ setTitleInput }) => {
  const [searchInput, setSearchInput] = useState("");
  const [recipeListData, setRecipeListData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);

  const searchForm = (event) => {
    setIsSearch(true);
    setSearchInput(event.target.value);
    // setTitleInput(event.target.value);
  };

  const getRecipesList = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://dinesh-api-opensearch.onrender.com/api/recipes/search?search_q=${searchInput}`
      );
      // console.log(response);
      const updatedData = response.data.map((eachDocument) => ({
        id: eachDocument._id,
        title: eachDocument._source.title,
      }));
      setRecipeListData(updatedData);
      setLoading(false);
    } catch (error) {
      console.log("Error Fetching recipes: ", error);
    }
  };

  useEffect(() => {
    getRecipesList();
  }, [searchInput, isSearch]);

  return (
    <div className="w-full max-w-[500px]">
      <div>
        <input
          type="search"
          placeholder="Search"
          onChange={(e) => searchForm(e)}
          value={searchInput}
          className="w-full outline-none bg-gray-100 py-1 px-3 border focus:border-2 border-gray-400 focus:border-blue-500 rounded-md text-slate-500 focus:shadow-lg placeholder:font-[Roboto]"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setTitleInput(e.target.value);
              setSearchInput("");
              setIsSearch(false);
            }
          }}
        />
      </div>
      {loading && (
        <div className="flex justify-center items-center min-h-[100px]">
          <BeatLoader size={14} color="blue" />
        </div>
      )}
      {recipeListData.length === 0 && !loading && (
        <div className="w-full h-[150px] flex flex-col justify-center items-center font-[roboto]">
          <span className="text-[24px] font-[Roboto] text-slate-800">
            No Search Result Found
          </span>
        </div>
      )}
      {!loading && isSearch && searchInput.length > 0 && (
        <ul className="w-full px-1">
          {recipeListData.map((eachData) => (
            <li
              key={eachData.id}
              className="flex justify-between items-center bg-slate-200 border border-slate-400 rounded-md shadow-md cursor-pointer"
              onClick={() => {
                if (searchInput > 2) {
                  setTitleInput(searchInput);
                } else {
                  setTitleInput(eachData.title.slice(0, 20));
                }
                setSearchInput("");
                setIsSearch(false);
              }}
            >
              <span className="text-slate-600 pl-5 py-2 text-sm font-[Roboto]">
                {eachData.title.slice(0, 50)}
              </span>
              <span className="text-slate-800 bg-slate-300 px-3 py-2 cursor-pointer">
                <FaSearch size={14} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
