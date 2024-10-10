import axios from "axios";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { MdStarRate } from "react-icons/md";
import Pagination from "../Pagination";

const RecipesList = ({ titleInput }) => {
  const [loading, setLoading] = useState(true);
  const [foodList, setFoodList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [perPageSize, setPerPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(1000);

  const onPageChange = (pageNoValue) => {
    setPageNo(pageNoValue);
  };

  const getFoodList = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `https://dinesh-api-opensearch.onrender.com/api/recipes/filter?title=${titleInput}&page=${pageNo}&size=${perPageSize}`
      );
      console.log(response);
      const updatedData = response.data.data.map((eachData) => ({
        id: eachData._id,
        index: eachData._index,
        score: eachData._score,
        source: {
          calories: eachData._source.calories,
          fat: eachData._source.fat,
          protein: eachData._source.protein,
          rating: eachData._source.rating,
          sodium: eachData._source.sodium,
          title: eachData._source.title,
        },
      }));
      setFoodList(updatedData);
      setTotalItems(response.data.total);
      setLoading(false);
    } catch (error) {
      console.log("Something Error: ", error);
    }
  };

  const updatePageSize = () => {
    if (window.innerWidth >= 1280) {
      setPerPageSize(12);
    } else {
      setPerPageSize(10);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", updatePageSize);
    updatePageSize();
    getFoodList();
    return () => window.removeEventListener("resize", updatePageSize);
  }, [titleInput, pageNo, perPageSize]);

  return (
    <div>
      <div>
        <h1 className="text-slate-900 text-lg font-medium font-[roboto]">
          Recipes
        </h1>
        {loading && (
          <div className="flex justify-center items-center w-full h-[300px] overflow-y-auto">
            <SyncLoader color="blue" size={12} />
          </div>
        )}
        {foodList.length === 0 && !loading && (
          <div className="w-full h-[350px] flex flex-col justify-center items-center font-[roboto]">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
              alt="empty"
              className="max-w-[350px]"
            />
            <h1 className="text-slate-800 text-lg font-bold pt-3">
              No Products Found!
            </h1>
            <span className="text-slate-500 text-md pt-4">
              We could not find any products. Try other filters.
            </span>
          </div>
        )}
        {!loading && (
          <ul
            className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 font-[Roboto] gap-2 xl:${() =>
              setPerPageSize(12)}`}
          >
            {foodList.map((eachFood) => {
              // console.log(eachFood);
              return (
                <li
                  key={eachFood.id}
                  className="border-2 border-slate-400 grid grid-cols-1 rounded-md px-4 py-4"
                >
                  <div className="flex justify-between items-center">
                    <h1>{eachFood.source.title.slice(0, 20)}</h1>
                    <span className="flex items-center justify-center gap-1">
                      <MdStarRate size={20} className="text-yellow-500" />
                      <span className="text-[12px] font-[Roboto]">
                        {Number(eachFood.source.rating).toFixed(1)}
                      </span>
                    </span>
                  </div>
                  <div className="flex flex-wrap space-x-2">
                    <div className="flex items-center">
                      <span className="text-[10px]">Calories:</span>
                      <span className="text-[10px] px-1 py-0 rounded-lg bg-blue-200">
                        {eachFood.source.calories}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[10px]">Fat:</span>
                      <span className="text-[10px] px-1 py-0 rounded-lg bg-blue-200">
                        {eachFood.source.fat}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[10px]">Protein:</span>
                      <span className="text-[10px] px-1 py-0 rounded-lg bg-blue-200">
                        {eachFood.source.protein}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-[10px]">Sodium:</span>
                      <span className="text-[10px] px-1 py-0 rounded-lg bg-blue-200">
                        {eachFood.source.sodium}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>

     {foodList.length > 1 && <div>
        <Pagination
          totalItems={totalItems}
          itemsPerPage={perPageSize}
          currentPage={pageNo}
          onPageChange={onPageChange}
        />
      </div>
}
    </div>
  );
};

export default RecipesList;
