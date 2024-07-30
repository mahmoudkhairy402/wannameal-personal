// import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import React, { useMemo } from "react";
import style from "./page.module.css";
import { Link, useLocation } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getuser, logout } from "../../redux/slices/authSlice";
import { IoNotificationsOutline } from "react-icons/io5";
import LanguageSelector from "../../components/languageSelector/LanguageSelector";
import { getTheme, toggleTheme } from "../../redux/slices/systemModeSlice";
import { IoMoonOutline } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { useTranslation } from "react-i18next";
import { getLoggoedUser } from "../../redux/slices/userSLice";
function Navbar() {
  const availableUser = useSelector(getuser);
  const loggedUser = useSelector(getLoggoedUser);
  console.log("🚀 ~ Navbar ~ loggedUser:", loggedUser);
  console.log("🚀 ~ Navbar ~ availableUser:", availableUser);
  const dispatch = useDispatch();
  const theme = useSelector(getTheme);
  console.log("🚀 ~ Navbar ~ theme:", theme);

  let handleLogout = () => {
    Swal.fire({
      toast: true,
      position: "top-end",
      title: "Are you Sure you want to log out ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "rgb(236, 52, 52)",
      cancelButtonColor: "#3ac568",
      confirmButtonText: "Log Out",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout());
        let timerInterval;
        Swal.fire({
          title: "Logging Out!",
          html: "",
          timer: 3000,
          timerProgressBar: true,

          didOpen: () => {
            Swal.showLoading();
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        });
      }
    });
  };

  // let decodedUser = null;
  // try {
  //   decodedUser = jwtDecode(availableUser.result);
  //   console.log("Decoded User:", decodedUser);
  // } catch (error) {
  //   console.error("Error decoding JWT token:", error);
  // }

  const location = useLocation();
  const path = location.pathname;

  const hide = useMemo(() => {
    if (
      path === "/accounting" ||
      path === "/verification" ||
      path === "/forgotPassword" ||
      path === "/reset"
    ) {
      return true;
    } else {
      return false;
    }
  }, [path]);

  const toggletheme = () => {
    dispatch(toggleTheme());
  };
  const { t, i18n } = useTranslation();
  const isAr = i18n.dir();
  console.log(isAr);
  const {
    Home,
    Community,
    Make,
    Profile,
    Contact,
    logoutt,
    dashboard,
    makeMeal,
  } = t("canvas");

  return (
    <>
      {!hide && (
        <nav className={`${style.nav} navbar navbar-expand-lg sticky-lg-top `}>
          <div className="container">
            <button
              class={`${isAr === "ltr" ? style.leftBars : style.rightBars}`}
              type=""
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasRouting"
              aria-controls="offcanvasWithBothOptions"
            >
              <HiBars3 size={22} />
            </button>

            <Link className="" to="/">
              {theme === "light" ? (
                <div className={style.logoContainer}>
                  <img
                    src={require("../../assets/logoLight.png")}
                    alt=""
                    srcset=""
                  />
                </div>
              ) : (
                <div className={style.logoContainer}>
                  <img
                    src={require("../../assets/logoDark.png")}
                    alt=""
                    srcset=""
                  />
                </div>
              )}
            </Link>
            <button
              className={`${style.toggler} navbar-toggler`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className={` ${style.dragMenu} collapse navbar-collapse gap-3`}
              id="navbarSupportedContent"
            >
              <form className={`d-flex mx-auto ${style.navForm}`} role="search">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search recipes"
                  aria-label="Search"
                />
                <div className={`${style.searchIcon}`}>
                  {" "}
                  <IoIosSearch size={20} />
                </div>
                {theme === "light" ? (
                  <div className={style.moon} onClick={toggletheme}>
                    <IoMoonOutline size={22} color="#fff" />
                  </div>
                ) : (
                  <div className={style.sun} onClick={toggletheme}>
                    <IoSunnyOutline size={22} color="#fff" />
                  </div>
                )}
              </form>

              <div className={` ${style.authBtns}`}>
                {availableUser ? (
                  <>
                    <div className={style.userData}>
                      <Link
                        className={` ${style.notification}`}
                        to="/community"
                      >
                        <IoNotificationsOutline
                          size={25}
                          className={style.icon}
                        />
                      </Link>
                      <Link
                        className={` ${style.userName}`}
                        title={availableUser?.data.userName}
                        to="/"
                      >
                        {availableUser?.data.userName}
                      </Link>
                      <Link className={` ${style.userImage}`} to="/profile">
                        <img
                          // src={userImage}
                          src={availableUser?.data.profileImage.url}
                          title={availableUser?.data.userName}
                          alt="user"
                          srcset=""
                        />
                      </Link>
                    </div>
                    {/* <div onClick={handleLogout} className={` ${style.logout}`}>
                      logout
                    </div> */}
                  </>
                ) : (
                  <>
                    <Link className={` ${style.register}`} to="/auth">
                      sign up
                    </Link>
                    <Link className={` ${style.login}`} to="/auth">
                      log in
                    </Link>
                  </>
                )}
              </div>
              <LanguageSelector />
            </div>
          </div>
        </nav>
      )}

      {/*left aside  offcanvas */}
      <div
        className={`offcanvas ${
          isAr === "ltr" ? "offcanvas-start" : "offcanvas-end"
        } ${style.Aside}`}
        tabIndex={-1}
        id="offcanvasRouting"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div className="offcanvas-header">
          {theme === "light" ? (
            <div className={style.logoContainer}>
              <img
                src={require("../../assets/logoLight.png")}
                alt=""
                srcset=""
              />
            </div>
          ) : (
            <div className={style.logoContainer}>
              <img
                src={require("../../assets/logoDark.png")}
                alt=""
                srcset=""
              />
            </div>
          )}
        </div>
        <div className="offcanvas-body p-0">
          <div>
            <ul>
              <li>
                <Link to={"/"}>{Home}</Link>
              </li>
              <li>
                <Link to={"/community"}>{Community}</Link>
              </li>
              <li>
                <Link to={"/makeMeal"}>{Make}</Link>
              </li>
              <li>
                <Link to={"/profile"}>{Profile}</Link>
              </li>
              <li>
                <Link to={"/contact"}>{Contact}</Link>
              </li>
              {loggedUser && loggedUser?.role === "admin" && (
                <>
                  <li>
                    <Link to={"/dashboard"}>{dashboard}</Link>
                  </li>
                  <li>
                    <Link to={"/AddProduct"}>{makeMeal}</Link>
                  </li>
                </>
              )}
            </ul>

            <div className={style.logout} onClick={handleLogout}>
              {logoutt}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
