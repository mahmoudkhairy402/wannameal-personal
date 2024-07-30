import React, { useEffect, useState } from "react";
import style from "./page.module.css";
import { MdDashboard, MdOutlineSettings } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { GiHotMeal, GiShinyApple } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";

function Sidebar() {
  const [choosen, setChoosen] = useState("");
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") {
      setChoosen("Dashboard");
    } else if (path === "/dashboard/users") {
      setChoosen("Users");
    } else if (path === "/dashboard/ingredients") {
      setChoosen("Ingredients");
    } else if (path === "/dashboard/recipes") {
      setChoosen("Recipes");
    } else if (path === "/dashboard/settings") {
      setChoosen("Settings");
    }
  }, [location.pathname]);

  return (
    <div className={style.main_div}>
      <Link to={"/"} className={style.logo}>
        Fast Plate
      </Link>
      <div className={style.divider}></div>
      <div className="d-flex flex-column gap-5 my-5 align-items-start ps-0  ps-lg-5">
        <Link to={"/dashboard"}>
          <div
            onClick={() => setChoosen("Dashboard")}
            className={`d-flex gap-3 align-items-center ${style.title_div}  ${choosen === "Dashboard" ? style.active : ""
              }`}
          >
            <MdDashboard size={40} />
            <h4 className="m-0">Dashboard</h4>
          </div>
        </Link>
        <Link to={"/dashboard/users"}>
          <div
            onClick={() => setChoosen("Users")}
            className={`d-flex gap-3 align-items-center ${style.title_div}  ${choosen === "Users" ? style.active : ""
              }`}
          >
            <FaUsers size={40} />
            <h4 className="m-0">Users</h4>
          </div>
        </Link>
        <Link to={"/dashboard/ingredients"}>
          <div
            onClick={() => setChoosen("Ingredients")}
            className={`d-flex gap-3 align-items-center ${style.title_div}  ${choosen === "Ingredients" ? style.active : ""
              }`}
          >
            <GiShinyApple size={40} />
            <h4 className="m-0">Ingredients</h4>
          </div>
        </Link>
        <Link to={"/dashboard/recipes"}>
          <div
            onClick={() => setChoosen("Recipes")}
            className={`d-flex gap-3 align-items-center ${style.title_div}  ${choosen === "Recipes" ? style.active : ""
              }`}
          >
            <GiHotMeal size={40} />
            <h4 className="m-0">Recipes</h4>
          </div>
        </Link>
        <div
          onClick={() => setChoosen("Settings")}
          className={`d-flex gap-3 align-items-center ${style.title_div}  ${choosen === "Settings" ? style.active : ""
            }`}
        >
          <MdOutlineSettings size={40} />
          <Link to={"/profile/edit"}>
            <h4 className="m-0">Settings</h4>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
