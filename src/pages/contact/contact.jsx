import React, { useState } from "react";
import styles from "./contactUS.module.css";
import { MdOutlineLocationOn } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { TiSocialFacebook } from "react-icons/ti";
import { FaXTwitter } from "react-icons/fa6";
import { TiSocialLinkedin } from "react-icons/ti";
import "animate.css";
import { useTranslation } from "react-i18next";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

function ContactUs() {
  const { t } = useTranslation();
  const { head, fname, Email, msg, send, location, phone, mail } = t("contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  console.log("🚀 ~ ContactUs ~ formData:", formData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🚀 ~ ContactUs ~ formData:", formData);

    try {
      const response = await axios.post(
        "https://fast-plat1.vercel.app/contactus",
        formData
      );
      console.log("🚀 ~ handleSubmit ~ response:", response);
      Swal.fire({
        icon: "success",
        title: response?.data?.message,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
      });

      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.error("Failed to send contact: ", error);
      Swal.fire({
        icon: "error",
        text: error?.message || "Something went wrong.",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    }
  };

  return (
    <div className={` ${styles.contactContainer} `}>
      <Helmet>
        <title>Contact Us</title>
        <meta name="description" content="Get in touch with us" />
      </Helmet>
      <div
        className={`${styles.contact} animate__animated animate__backInRight container-lg`}
      >
        <div className={styles.title}>{head}</div>
        <div
          className={`${styles.box} row justify-content-between align-items-center px-5`}
        >
          <div className={`${styles.form} col-7`}>
            <form onSubmit={handleSubmit}>
              <div className={`py-5 px-4 ${styles.inputs}`}>
                <div>
                  <input
                    type="text"
                    name="name"
                    className={`form-control ${styles.input}`}
                    id="exampleFormControlInput1"
                    placeholder={fname}
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    className={`form-control  ${styles.input}`}
                    id="exampleFormControlInput1"
                    placeholder={Email}
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div>
                  <textarea
                    name="message"
                    className={`form-control text-white ${styles.input}`}
                    placeholder={msg}
                    id="exampleFormControlTextarea1"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button type="submit" className={`${styles.submit} w-100 py-3`}>
                  {send}
                </button>
              </div>
            </form>
          </div>
          <div className={`${styles.information} col-5`}>
            <div className={`${styles.location}`}>
              <MdOutlineLocationOn color="#3AC568" size={22} className="me-2" />
              {location}
            </div>
            <div className={`${styles.phone}`}>
              <FiPhone color="#3AC568" size={22} className="me-2" />
              {phone}
            </div>
            <div className={`${styles.email}`}>
              <MdOutlineEmail color="#3AC568" size={22} className="me-2" />
              {mail}
            </div>
            <div className={`${styles.socialIcons}`}>
              <TiSocialFacebook size={22} /> <FaXTwitter size={22} />{" "}
              <TiSocialLinkedin size={22} />
            </div>
            <div className={`${styles.map}`}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13733.628296224533!2d32.25787244438766!3d30.622483212361008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f8597f201556e7%3A0x9bd6053867337ff3!2z2KzYp9mF2LnYqSDZgtmG2KfYqSDYp9mE2LPZiNmK2LM!5e0!3m2!1sar!2seg!4v1707680694332!5m2!1sar!2seg"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="iframe"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
