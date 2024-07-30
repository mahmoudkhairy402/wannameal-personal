import React, { useEffect, useState } from "react";
import styles from "./mealcard.module.css";
import { IoTime } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { GiCookingPot } from "react-icons/gi";
import { CiBookmark } from "react-icons/ci";
import { Link } from "react-router-dom";
import {
  getMealsError,
  getMealsStatus,
  getsSavedMeal,
  saveMeal,
} from "../../redux/slices/recomendedMealsSlice";
import { useDispatch, useSelector } from "react-redux";
import { getDecodedToken, getuser } from "../../redux/slices/authSlice";
import Swal from "sweetalert2";
import { getLanguage } from "../../redux/slices/language";

function MealCard({ meal }) {
  console.log("🚀 ~ MealCard ~ meal:", meal);
  const dispatch = useDispatch();
  const [isSaved, setIsSaved] = useState(meal?.isSaved || false);
  const availableUser = useSelector(getuser);
  const mealError = useSelector(getMealsError);
  const mealstatus = useSelector(getMealsStatus);
  console.log("🚀 ~ MealCard ~ mealstatus:", mealstatus);
  console.log("🚀 ~ MealCard ~ mealError:", mealError);
  const savedmeal = useSelector(getsSavedMeal);
  console.log("🚀 ~ MealCard ~ savedmeal:", savedmeal);

  useEffect(() => {
    if (savedmeal && savedmeal?._id === meal?._id) {
      setIsSaved(savedmeal.isSaved);
    }
  }, [savedmeal, meal?._id]);

  const row = {
    _id: 182,
    recipeName: "soucees-pgklh",
    image:
      "https://res.cloudinary.com/dz5dpvxg7/image/upload/v1719800011/WannaMeal/meals/0TFBf-7vKLP389w4n9EGY/lypi8rese0p43vw4lmyn.png",
    typeMeals: "Lunch",
    ingredients: "vnbgxxxxxxxx,gfxh",
    steps: "hshtsjrjj,jjy",
    calories: 125,
    times: 145,
    EnoughFor: 5,
  };

  const handleBookmarkClick = async (e) => {
    e.preventDefault();
    const mealData = {
      _id: meal?._id,
      recipeName: meal.recipeName,
      image: meal?.image?.url,
      typeMeals: "Lunch",
      ingredients: meal?.ingredients,
      steps: meal?.steps,
      calories: meal?.calories,
      times: meal?.times,
      EnoughFor: meal?.EnoughFor,
    };
    console.log("🚀 ~ handleBookmarkClick ~ mealData:", mealData);

    try {
      await dispatch(
        saveMeal({
          mealData,
          token: availableUser?.token,
          mealId: meal._id,
        })
      );
      setIsSaved((prevIsSaved) => !prevIsSaved);

      Swal.fire({
        icon: "success",
        title: isSaved
          ? "Meal unsaved successfully"
          : "Meal saved successfully",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });
    } catch (error) {
      console.error("Failed to save meal: ", error);

      Swal.fire({
        icon: "error",
        title: `${mealError || "Failed to save meal"}`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <>
      <Link to={`/recipeDetails/${meal?._id}`} state={{ meal }}>
        <div className={`${styles.mealCard} mx-auto`}>
          <div className={`${styles.imageContainer}`}>
            <img
              src={meal?.image?.url}
              id={meal?.image?.id}
              objectFit="cover"
              alt={`meal ${meal?.name}`}
              loading="lazy"
            />
          </div>
          <div
            className={`${styles.bookmark}`}
            onClick={handleBookmarkClick}
            style={{ backgroundColor: isSaved ? "#3ac568" : "" }}
          >
            <CiBookmark size={35} color="#fff" />
          </div>
          <div className={`${styles.mealInfo}`}>
            <div className={`${styles.mealRates}`}>
              <div className={`${styles.time}`}>
                <IoTime size={25} color="#4CAF50" />
                <span>{meal?.times}</span> Minutes
              </div>
              <div className={`${styles.interacts}`}>
                <BsFire size={25} color="#4CAF50" />
                <span>{meal?.calories}</span>
              </div>
              <div className={`${styles.components}`}>
                <GiCookingPot size={25} color="#4CAF50" />{" "}
                <span>{meal?.ingredients?.split(",").length}</span> Components
              </div>
            </div>
            <h4 className={`${styles.description}`}>{meal?.recipeName}</h4>
          </div>
        </div>
      </Link>
    </>
  );
}

export default MealCard;
