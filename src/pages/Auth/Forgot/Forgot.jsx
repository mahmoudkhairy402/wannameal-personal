import axios from "axios";
import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import style from "./page.module.css";
import { useTranslation } from "react-i18next";

export default function Forgot() {
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const handleEmail = (e) => {
    setemail(e.target.value);
    console.log(email);
  };
  const confirmEmali = (e) => {
    e.preventDefault();
    axios
      .patch("https://fast-plat1.vercel.app/auth/forgetCode?lang=en", { email })
      .then((respo) => {
        console.log(respo.data);
        if (respo.data.success) {
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "please check your email - forward to code page",
          }).then(() => {
            navigate("/auth/verification");
          });
        }
        localStorage.setItem("userToken", respo.data.token);
        console.log(respo.data.token);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };
  const { t } = useTranslation();
  const {
    Forgot,
    Forgotp,
    Send,
  } = t('auth');
  return (
    <div className={style.contain}>
      <div className="d-flex align-items-center gap-2 flex-column justify-content-center w-75 text-center">
        <h1>{Forgot}</h1>
        <p className="text-50">
         {Forgotp}
        </p>
      </div>
      <form onSubmit={confirmEmali} className={style.form}>
        <div className={style.inputForm}>
          <MdOutlineMailOutline size={25} />
          <input
            name="email"
            onChange={handleEmail}
            value={email.email}
            type="text"
            className={style.input}
            placeholder="Enter your Email"
          />
        </div>
        <button className={style.button_submit}>{Send}</button>
      </form>
    </div>
  );
}
