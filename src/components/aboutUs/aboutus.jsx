import React from "react";
import style from "./aboutUs.module.css";

import { PiUsersThreeDuotone } from "react-icons/pi";
import { GiMeal } from "react-icons/gi";
import { MdDashboardCustomize } from "react-icons/md";
import { MdMoreTime } from "react-icons/md";
import { TbHealthRecognition } from "react-icons/tb";
import { useTranslation } from "react-i18next";
export default function AboutUs() {
  const { t, i18n } = useTranslation();
  const isAr = i18n.dir();
  console.log(isAr);
  const {
    about,
    us,
    Healthy,
    HealthyP,
    Convenience,
    ConvenienceP,
    Save,
    SaveP,
    Customizable,
    CustomizableP,
    Expertly,
    ExpertlyP,
    Community,
    CommunityP,
  } = t("about");

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="d-flex flex-column align-items-center
      justify-content-center"
    >
      <h1 className={`w-100 my-3 mx-auto text-center ${style.mainTitle}`}>
        {about} <span>{us}</span>
      </h1>
      <div className="container-lg">
        <div
          className={`row p-0 my-3 d-flex flex-wrap w-100 justify-content-center justify-content-md-between align-items-center g-5`}
        >
          <div className=" col-12 col-md-6 d-flex">
            <div className={`${style.icon} col-1 me-4`}>
              <TbHealthRecognition color="#4ECB71" size={40} />
            </div>
            <div
              className={`${style.text} d-flex flex-column gap-2 align-content-center justify-content-start`}
            >
              <div className={style.title}>{Healthy}</div>
              <div className={style.desc}>
                {HealthyP}
              </div>
            </div>
          </div>
          <div className=" col-12 col-md-6 d-flex">
            <div className={`${style.icon} col-1 me-4`}>
              <TbHealthRecognition color="#4ECB71" size={40} />
            </div>
            <div
              className={`${style.text} d-flex flex-column gap-2 align-content-center justify-content-start`}
            >
              <div className={style.title}>{Convenience}</div>
              <div className={style.desc}>
                {ConvenienceP}
              </div>
            </div>
          </div>
          <div className=" col-12 col-md-6 d-flex">
            <div className={`${style.icon} col-1 me-4`}>
              <MdMoreTime color="#4ECB71" size={40} />
            </div>
            <div
              className={`${style.text} d-flex flex-column gap-2 align-content-center justify-content-start`}
            >
              <div className={style.title}>{Save}</div>
              <div className={style.desc}>
                {SaveP}
              </div>
            </div>
          </div>
          <div className=" col-12 col-md-6 d-flex">
            <div className={`${style.icon} col-1 me-4`}>
              <MdDashboardCustomize color="#4ECB71" size={40} />
            </div>
            <div
              className={`${style.text} d-flex flex-column gap-2 align-content-center justify-content-start`}
            >
              <div className={style.title}>{Customizable}</div>
              <div className={style.desc}>
                {CommunityP}
              </div>
            </div>
          </div>
          <div className=" col-12 col-md-6 d-flex">
            <div className={`${style.icon} col-1 me-4`}>
              <GiMeal color="#4ECB71" size={40} />
            </div>
            <div
              className={`${style.text} d-flex flex-column gap-2 align-content-center justify-content-start`}
            >
              <div className={style.title}>{Expertly}</div>
              <div className={style.desc}>
                {ExpertlyP}
              </div>
            </div>
          </div>
          <div className=" col-12 col-md-6 d-flex">
            <div className={`${style.icon} col-1 me-4`}>
              <PiUsersThreeDuotone color="#4ECB71" size={40} />
            </div>
            <div
              className={`${style.text} d-flex flex-column gap-2 align-content-center justify-content-start`}
            >
              <div className={style.title}>{Community}</div>
              <div className={style.desc}>
                {CommunityP}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
