import React, { useEffect } from "react";
import style from "./MyRecips.module.css";
import MealCard from "../mealCard/mealCard";
import { MdSmsFailed } from "react-icons/md";

import noMeals from "../../assets/nomeals.gif";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMyRecipes,
  fetchSavedMeals,
  getMealsError,
  getMealsStatus,
  getMyRecipes,
  getSavedMeals,
} from "../../redux/slices/recomendedMealsSlice";
import { getDecodedToken } from "../../redux/slices/authSlice";
import Loading from "../loading/loading";
import { getLanguage } from "../../redux/slices/language";
export default function SavedMeals() {
  const decodedToken = useSelector(getDecodedToken);
  console.log("🚀 ~ SavedMeals ~ decodedToken:", decodedToken);
  const mealsError = useSelector(getMealsError);
  const mealsStatus = useSelector(getMealsStatus);
  const dispatch = useDispatch();
  const language = useSelector(getLanguage);
  const myRecips = useSelector(getMyRecipes);
  console.log("🚀 ~ SavedMeals ~ myRecips:", myRecips);

  useEffect(() => {
    if (decodedToken?.id) {
      const fetchMeals = async () => {
        await dispatch(
          fetchMyRecipes({ userId: decodedToken?.id, lang: language })
        );
      };
      fetchMeals();
    }
  }, []);

  if (mealsStatus === "loading")
    return (
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <Loading />
      </div>
    );

  if (mealsError)
    return (
      <div className="w-100 text-center fs-2 mt-5">
        <p className="mt-5">
          {mealsError}
          <MdSmsFailed size={25} className="text-danger ms-2 " />
        </p>
      </div>
    );

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="container-lg">
        <div
          className={`row p-0 my-3 d-flex align-items-center  ${style.recipsContainer}`}
        >
          {myRecips && myRecips.length > 0 ? (
            myRecips.map((meal) => (
              <div key={meal._id} className="col-sm-12 col-md-5 col-lg p-0">
                <MealCard meal={meal} />
              </div>
            ))
          ) : (
            <div className={style.noMealscontainer}>
              <div className={style.imageContainer}>
                <img src={noMeals} alt="" srcset="" />
              </div>
              <h3 className={style.mainTitle}>
                You haven't published any recipe yet.
              </h3>
              <p className={style.secondaryTitle}>
                Post your first recipe and you'll find it here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
