import React from "react";
import styles from "./dashcard.module.css";
import { IoTime } from "react-icons/io5";
import { BsFire } from "react-icons/bs";
import { GiCookingPot } from "react-icons/gi";
import { CiBookmark } from "react-icons/ci";
import { Link } from "react-router-dom";
function DashCard({ meal }) {
    return (
        <>
            <Link to={`/recipeDetails/${meal?.id}`}>
                <div className={`${styles.mealCard}`}>
                    <div className={`${styles.imageContainer}`}>
                        <img
                            src={meal?.image.url}
                            id={meal?.image.id}
                            objectFit="cover"
                            alt={`meal ${meal?.name}`}
                            loading="lazy"
                        />
                    </div>
                    <div className={`${styles.bookmark}`}>
                        <CiBookmark size={35} color="#fff" />
                    </div>
                    <div className={`${styles.mealInfo}`}>
                        <div className={`${styles.mealRates}`}>
                            <div className={`${styles.time}`}>
                                <IoTime size={25} color="#4CAF50" />
                                <span>60</span>Minutes
                            </div>
                            <div className={`${styles.interacts}`}>
                                <BsFire size={25} color="#4CAF50" />
                                <span>600</span>
                            </div>
                            <div className={`${styles.components}`}>
                                <GiCookingPot size={25} color="#4CAF50" /> <span>9</span>{" "}
                                Components
                            </div>
                        </div>
                        <h4 className={`${styles.description}`}>{meal?.name}</h4>
                    </div>
                </div>
            </Link>
        </>
    );
}

export default DashCard;
