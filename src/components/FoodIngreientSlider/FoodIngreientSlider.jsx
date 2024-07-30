import React, { useEffect, useState } from "react";
// import { ingredients } from "./ingredients";

import styles from "./FoodIngreientSlider.module.css";
import "animate.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  FreeMode,
} from "swiper/modules";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

import { TiDelete } from "react-icons/ti";
import { RiDeleteBin2Line } from "react-icons/ri";

import { useDispatch, useSelector } from "react-redux";
import { recommendMeals } from "../../redux/slices/recomendedMealsSlice";
import {
  fetchIngredients,
  getIngredients,
  getIngredientsError,
  getIngredientsStatus,
} from "../../redux/slices/ingredients";
import { getuser } from "../../redux/slices/authSlice";
import { getLanguage } from "../../redux/slices/language";
import axios from "axios";
import { useTranslation } from "react-i18next";

function FoodIngreientSlider() {
  // const ingredients = useSelector(getIngredients);
  const ingredients = useSelector(getIngredients);
  console.log("🚀 ~ FoodIngreientSlider ~ ingredients:", ingredients);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredIngredients, setFilteredIngredients] = useState(ingredients);

  const availableUser = useSelector(getuser);
  const dispatch = useDispatch();
  const ingredientsStatus = useSelector(getIngredientsStatus);
  const ingredientError = useSelector(getIngredientsError);
  const language = useSelector(getLanguage);

  const handleCheckboxChange = (ingredient) => {
    setCheckedIngredients((prevIngredients) => {
      const isIngredientChecked = prevIngredients.some(
        (item) => item._id === ingredient._id
      );

      if (isIngredientChecked) {
        return prevIngredients.filter((item) => item._id !== ingredient._id);
      } else {
        return [...prevIngredients, ingredient];
      }
    });
    console.log(
      "🚀 ~ setCheckedIngredients ~ prevIngredients:",
      checkedIngredients
    );
  };

  useEffect(() => {
    const fetch = async () => {
      await dispatch(
        fetchIngredients({ token: availableUser.token, lang: language })
      );
    };

    fetch();
  }, [dispatch, availableUser.token, language]);

  useEffect(() => {
    setFilteredIngredients(ingredients);
  }, [ingredients]);

  useEffect(() => {
    const filtered = ingredients.filter((ingredient) =>
      ingredient.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredIngredients(filtered);
  }, [searchQuery, ingredients]);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        let ingredientNames = ""; // Default value if no checked ingredients
        console.log("🚀 ~ fetchMeals ~ ingredientNames:", ingredientNames);
        if (checkedIngredients.length > 0) {
          ingredientNames = checkedIngredients
            .map((ingredient) => ingredient.name)
            .join(",");
        }

        console.log(
          "🚀 ~ fetchMeals ~ checkedIngredients:",
          checkedIngredients
        );
        console.log(ingredientNames);
        console.log(typeof ingredientNames);

        if (ingredientNames !== "") {
          const response = await dispatch(
            recommendMeals({
              ingredients: ingredientNames,
              lang: language,
              token: availableUser?.token,
            })
          );
          console.log("Recommendation response:", response); // Log the response or handle it as needed
        }
      } catch (error) {
        console.error("Error fetching meals:", error);
      }
    };

    fetchMeals();
  }, [checkedIngredients, dispatch, language]);
  const { t } = useTranslation();
  const { Choose, searchh } = t("make");
  return (
    <>
      <div className="container my-4">
        <div className="row w-100 d-flex justify-content-between ">
          <form>
            <label
              className={`col-4 ${styles.label}`}
              htmlFor="ingredientSearch"
            >
              {Choose}
            </label>
            <input
              className={`col-8 ${styles.searchinput}`}
              type="search"
              id="ingredientSearch"
              name="ingredientSearch"
              placeholder={`${searchh}`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              // autocomplete="off"
            />
          </form>
        </div>

        <div className={`${styles.checkedIngredients} my-2`}>
          {checkedIngredients.length !== 0 && (
            <div
              className={`${styles.deleteAllChecked} `}
              onClick={() => {
                setCheckedIngredients([]);
              }}
            >
              Reset({checkedIngredients.length}){" "}
              <RiDeleteBin2Line className="ms-1 " size={25} />
            </div>
          )}
          {checkedIngredients &&
            checkedIngredients.map((ingredient, index) => {
              return (
                <div
                  key={index}
                  className={`${styles.checkedIngredient} animate__animated animate__bounceIn`}
                >
                  {ingredient.name}

                  <TiDelete
                    onClick={() => {
                      setCheckedIngredients(
                        checkedIngredients.filter(
                          (item) => item._id !== ingredient._id
                        )
                      );

                      console.log("deleted");
                      console.log(checkedIngredients);
                    }}
                    size={25}
                    className={`${styles.delete} rounded-1`}
                  />
                </div>
              );
            })}
        </div>

        <div className={`${styles.ingredients}`}>
          {filteredIngredients && filteredIngredients.length !== 0 ? (
            <Swiper
              modules={[FreeMode]}
              grabCursor={true}
              freeMode={true}
              spaceBetween={2}
              slidesPerView={8.5}
              breakpoints={{
                0: {
                  spaceBetween: 0,
                  slidesPerView: 3.2,
                },

                768: {
                  spaceBetween: 2,
                  slidesPerView: 4.2,
                },
                912: {
                  spaceBetween: 10,
                  slidesPerView: 5.4,
                },
                1024: {
                  spaceBetween: 10,
                  slidesPerView: 8.5,
                },
              }}
              style={{ direction: "ltr" }}
            >
              {filteredIngredients.map((ingredient, index) => (
                <SwiperSlide key={index}>
                  <div className={styles.parentcheckbox}>
                    <input
                      type="checkbox"
                      id={`ingredientCheckbox_${ingredient?._id}`}
                      checked={checkedIngredients.some(
                        (ele) => ele._id === ingredient._id
                      )}
                      onChange={() => handleCheckboxChange(ingredient)}
                    />
                    <label
                      className={
                        checkedIngredients.some(
                          (ele) => ele._id === ingredient._id
                        )
                          ? `${styles.ingredient} ${styles.checked}`
                          : `${styles.ingredient}`
                      }
                      htmlFor={`ingredientCheckbox_${ingredient._id}`}
                    >
                      <div className={styles.symbolImage}>
                        <img src={ingredient?.image?.url} alt="" srcset="" />
                        {/* {String.fromCodePoint(parseInt(ingredient.hex, 16))} */}
                      </div>{" "}
                      <div className={styles.name}>{ingredient.name}</div>
                    </label>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <h1 className={styles.noMatch}>no matching ingredients ..!</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default FoodIngreientSlider;
