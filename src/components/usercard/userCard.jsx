import React, { useEffect, useState } from "react";
import style from "./usercard.module.css";
import profile from "../../assets/man-user.svg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDecodedToken, getuser } from "../../redux/slices/authSlice";
import {
  getProfileById,
  followUser,
  getSuggestedUsers,
  fetchSuggestedUsers,
} from "../../redux/slices/communityUserSlice";
import { getLanguage } from "../../redux/slices/language";

export default function UserCard({ method, user }) {
  const [activeBtn, setActiveBtn] = useState(false);
  const userId = user?._id;
  // console.log("🚀 ~ UserCard ~ user:", user);
  const status = useSelector((state) => state.communityUser.status);
  const error = useSelector((state) => state.communityUser.error);
  console.log("🚀 ~ UserCard ~ error:", error);
  const availableUser = useSelector(getuser);
  const decodedToken = useSelector(getDecodedToken);
  const language = useSelector(getLanguage);
  const follow = useSelector((state) => state.communityUser.follow);
  console.log("🚀 ~ UserCard ~ follow:", follow);
  const pr = useSelector((state) => state.communityUser.profile);
  // console.log("🚀 ~ UserCard ~ follow:", follow);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const fetchSuggested = async () => {
  //   try {
  //     await dispatch(fetchSuggestedUsers(availableUser.token));
  //   } catch (error) {
  //     console.error("Failed to fetch suggested users:", error);
  //   }
  // };

  const fetchProfile = async () => {
    try {
      dispatch(
        getProfileById({
          userId: decodedToken.id,
          token: availableUser.token,
        })
      );
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [activeBtn]);

  const handleClick = async () => {
    if (method === "follow") {
      try {
        await dispatch(
          followUser({ userId, token: availableUser.token, lang: language })
        );
        if (error == null) {
          setActiveBtn(!activeBtn);
        } else {
          setActiveBtn(activeBtn);
        }
      } catch {
        setActiveBtn(activeBtn);
      }
    } else {
      navigate("/community/chat");
    }
  };

  return (
    <div className={style.cardContainer}>
      <div className={style.image}>
        <img src={user ? user.profileImage.url : profile} alt="profile photo" />
      </div>
      <div className={style.text}>
        <div className={style.name}>{user?.userName}</div>
        <div className={style.email}>{user?.email}</div>
      </div>
      <div
        className={
          activeBtn
            ? `btn ${style.btn} `
            : `btn ${style.btn} ${style.activeBtn} `
        }
        onClick={handleClick}
        disabled={status === "loading"} // Disable the button when loading
      >
        {activeBtn ? "following" : method}
      </div>
      {/* {error && <p className={style.error}>Error: {error}</p>} */}
    </div>
  );
}
