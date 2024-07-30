import React, { useEffect, useState } from "react";
import style from "./recipes.module.css";
import Pagination from "../../../components/pagination/pagination";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { fetchMeals } from "../../../redux/slices/dashmeals";
import axios from "axios";
import DashCard from "../../../components/mealCard/dashCard";
const Meals_PER_PAGE = 6;
export default function Recipes() {
  // const dispatch = useDispatch();
  // const meals = useSelector((state) => state.meals.meals);
  // const status = useSelector((state) => state.meals.status);
  // const error = useSelector((state) => state.meals.error);

  // useEffect(() => {
  //   dispatch(fetchMeals());
  // }, [dispatch]);
  // if (!meals) {
  //   return <div>Loading...</div>;
  // }
  // console.log('Meals from Redux:', meals);
  const [meals, setmeals] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    axios.get('https://fast-plat1.vercel.app/meals').then((res) => {
      setmeals(res.data.result)
    })
  }, [meals])
  const startIndex = (currentPage - 1) * Meals_PER_PAGE;
  const selectedMeals = meals.slice(
    startIndex,
    startIndex + Meals_PER_PAGE
  );
  const totalPages = Math.ceil(meals.length / Meals_PER_PAGE);

  return (
    <div className="px-5 my-4">
      <div className={`${style.confirm_recipe}`}>
        <Link to={"/addProduct"}>
          <button className={style.confirm_btn}>Add Recipe</button>
        </Link>
      </div>
      {/* {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && ( */}
      <div
        className="row pb-3 d-flex flex-wrap"
        style={{ borderBottom: "1px solid var(--text_black)" }}
      >
        {selectedMeals?.map((meal) => (
          <div
            key={meal._id}
            className="col-12 col-md-6 col-xl-4 col-xxl-3 mb-4 d-flex flex-wrap justify-content-center align-items-center"
          >
            <DashCard meal={meal} />
          </div>
        ))}
      </div>
      {/* )} */}
      <Pagination
        who={'recipes'}
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        totalUsers={meals.length}
      />
    </div>
  );
};
