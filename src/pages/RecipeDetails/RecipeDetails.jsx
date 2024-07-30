import React from "react";
import style from "./page.module.css";
import Food_Icon from "../../assets/fluent_food-24-filled.svg";
import { IoTime } from "react-icons/io5";
import { BsDiagram3, BsFire } from "react-icons/bs";
import { useLocation } from "react-router-dom";

import MealCard from "../../components/mealCard/mealCard";
import CommonMeals from "../../components/commonMeals/commonMeals";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
const RecipeDetails = () => {
  const location = useLocation();
  const { meal } = location.state || {};

  console.log("🚀 ~ RecipeDetails ~ meal:", meal);
  const stepsArray = meal?.steps ? meal.steps.split(",") : [];
  const ingredientsArray = meal?.steps ? meal.ingredients.split(",") : [];
  console.log(stepsArray);
  let x = [1, 2, 35, 459, 88, 113, 87, 2];
  const { t } = useTranslation();
  const {
    apply,
    minutes,
    components,
    people,
    Ingredients,
    Directions,
    Latest,
  } = t("View");
  return (
    <div className="p-md-5 mx-md-5 my-4">
      <Helmet>
        <title>Recipe Detailes</title>
        <meta name="description" content="Recipe Detailes of the meal" />
      </Helmet>
      <div className="row justify-content-between p-3">
        <div className="col-12 col-lg-5 d-flex flex-column gap-5 px-4 mb-5 mb-lg-0">
          <h3 className={style.head_title}>{meal.recipeName}</h3>
          <div
            className={`d-flex  gap-5 align-items-center mt-3 ${style.customize} flex-wrap`}
          >
            <div className="d-flex gap-2 ">
              <img className={style.Food_Icon} src={Food_Icon} alt="icon" />
              <div className="d-flex flex-column">
                <p className="m-0 opacity-50">{apply}</p>
                <span className="fw-bold fs-5 text-center">
                  <big>{meal.EnoughFor}</big> {people}
                </span>
              </div>
            </div>
            {/* <button
              className="border-0 rounded-3 px-2 "
              style={{
                background: "var(--green)",
                color: "var(--text_white)",
                height: "3rem",
              }}
            >
              customize
            </button> */}
          </div>
          <svg
            className="ms-lg-4"
            xmlns="http://www.w3.org/2000/svg"
            width="350"
            height="2"
            viewBox="0 0 557 2"
            fill="none"
          >
            <path
              d="M1.5 1.00006L555.5 1.00001"
              stroke="#049601"
              stroke-width="2"
              stroke-linecap="round"
              stroke-dasharray="4 4"
            />
          </svg>
          <div className="d-flex gap-3 flex-wrap">
            <div
              className={`d-flex gap-2 align-items-center ${style.borderDash}`}
            >
              <IoTime className={style.icon_details} />
              <span className={style.icon_value}>
                {" "}
                <big className="fw-bold">{meal.times}</big> {minutes}
              </span>
            </div>
            <div
              className={`d-flex gap-2 align-items-center ${style.borderDash}`}
            >
              <BsFire className={style.icon_details} />
              <span className={style.icon_value}>
                {" "}
                <big className="fw-bold">{meal.times}</big> {minutes}
              </span>
            </div>
            <div className={`d-flex gap-2 align-items-center `}>
              <BsDiagram3 className={style.icon_details} />
              <span className={style.icon_value}>
                {" "}
                <big className="fw-bold">{meal.calories}</big> {components}
              </span>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <img style={{ width: "100%" }} src={meal.image.url} alt="dish" />
        </div>
      </div>
      <h2 className={style.divider_title}>{Ingredients}</h2>
      <div className="row p-3">
        <div className="col-12 col-md-8 d-flex flex-column gap-5">
          {ingredientsArray?.map((x, ind) => {
            return (
              <div
                key={ind}
                className={`d-flex justify-content-between align-items-center ${style.directionDiv}`}
              >
                <span>{ind + 1}</span>
                <p className="m-0">{x}</p>
              </div>
            );
          })}
        </div>
      </div>
      <h2 className={style.divider_title}>{Directions}</h2>
      <div className="row p-3">
        <div className="col-12 col-md-8 d-flex flex-column gap-4">
          {stepsArray?.map((x, ind) => {
            return (
              <div
                key={ind}
                className={`d-flex justify-content-between align-items-center ${style.directionDiv}`}
              >
                <span>{ind + 1}</span>
                <p className="m-0">{x}</p>
              </div>
            );
          })}
        </div>
      </div>
      <h2 className={style.divider_title}>{Latest}</h2>
      <div className="row">
        <CommonMeals />
      </div>
    </div>
  );
};

export default RecipeDetails;
