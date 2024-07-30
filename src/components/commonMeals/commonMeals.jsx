import React, { useEffect } from "react";
import style from "./commonMeals.module.css";
import MealCard from "../mealCard/mealCard";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../loading/loading";
import {
  fetchCommonMeals,
  getCommonMeals,
  getMealsError,
  getMealsStatus,
} from "../../redux/slices/recomendedMealsSlice";
import { MdSmsFailed } from "react-icons/md";
import { getuser } from "../../redux/slices/authSlice";
import { getLanguage } from "../../redux/slices/language";

export default function CommonMeals() {
  const commonMeals = useSelector(getCommonMeals);
  console.log("🚀 ~ CommonMeals ~ commonMeals:", commonMeals);
  const mealsError = useSelector(getMealsError);
  const mealsStatus = useSelector(getMealsStatus);
  const availableUser = useSelector(getuser);
  const language = useSelector(getLanguage);

  const dispatch = useDispatch();

  useEffect(() => {
    if (availableUser?.token) {
      const fetchMeals = async () => {
        await dispatch(
          fetchCommonMeals({ token: availableUser.token, lang: language })
        );
      };
      fetchMeals();
    }
  }, [dispatch, language]);

  if (mealsStatus === "loading")
    return (
      <div className="w-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className={`w-100 my-3 mx-auto text-center ${style.mainTitle}`}>
          Latest <span>recipes</span>
        </h1>
        <Loading />
      </div>
    );

  if (mealsError)
    return (
      <div className="w-100 text-center fs-2 mt-5">
        <h1 className={`w-100 my-3 mx-auto text-center ${style.mainTitle}`}>
          Latest <span>recipes</span>
        </h1>
        <p className="mt-5">
          {mealsError}
          <MdSmsFailed size={25} className="text-danger ms-2 " />
        </p>
      </div>
    );

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column align-items-center justify-content-center"
    >
      <h1 className={`w-100 my-3 mx-auto text-center ${style.mainTitle}`}>
        Latest <span>recipes</span>
      </h1>
      <div className="container-lg">
        <div
          className={`row p-0 my-3 d-flex align-items-center  ${style.recipsContainer}`}
        >
          {commonMeals &&
            commonMeals.slice(0, 6).map((meal) => (
              <div key={meal._id} className="col-sm-12 col-md-5 col-lg p-0">
                <MealCard meal={meal} />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
