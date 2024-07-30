import React from "react";
import { MdSmsFailed } from "react-icons/md";
import styles from "./mealsslider.module.css";

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
import MealCard from "../mealCard/mealCard";

import { useSelector } from "react-redux";
import {
  getMealsError,
  getMealsStatus,
  getRecommendMeals,
} from "../../redux/slices/recomendedMealsSlice";
import Loading from "../loading/loading";
import CommonMeals from "../commonMeals/commonMeals";

function MealsSlider() {
  const recomendedMeals = useSelector(getRecommendMeals);
  console.log("🚀 ~ MealsSlider ~ recomendedMeals:", recomendedMeals);
  const mealsStatus = useSelector(getMealsStatus);
  console.log("🚀 ~ MealsSlider ~ mealsStatus:", mealsStatus);
  const error = useSelector(getMealsError);
  console.log("🚀 ~ MealsSlider ~ error:", error);

  if (recomendedMeals && recomendedMeals.length == 0) {
    return <CommonMeals />;
  }
  if (mealsStatus == "loading")
    return (
      <div className="w-100 d-flex justify-content-center align-items-center">
        <Loading />
      </div>
    );
  if (error)
    return (
      <p className="w-100 text-center fs-2 mt-5">
        {" "}
        {error} <MdSmsFailed size={25} className="text-danger ms-2" />
      </p>
    );

  return (
    <div className="container mb-3">
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={2.75}
        breakpoints={{
          0: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },

          768: {
            slidesPerView: 1.5,
            spaceBetween: 10,
          },
          912: {
            slidesPerView: 1.7,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2.75,
            spaceBetween: 40,
          },
        }}
        style={{ direction: "ltr" }}
      >
        {recomendedMeals?.map((meal, index) => (
          <SwiperSlide key={index}>
            <MealCard meal={meal} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MealsSlider;
