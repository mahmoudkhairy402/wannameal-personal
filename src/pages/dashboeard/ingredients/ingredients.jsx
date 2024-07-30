import React, { useEffect, useState } from "react";
import style from "./ingredients.module.css";
import Pagination from "../../../components/pagination/pagination";
import axios from "axios";
const INGR_PER_PAGE = 9;
export default function Ingredients() {

  const [ingredients, setingredients] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const getIngredients = () => {
    axios.get(('https://fast-plat1.vercel.app/Ingredients/getAll')).then((res) => {
      console.log(res.data.data);
      setingredients(res.data.data)
    }).catch((err) => {
      console.log(err);
    })
  }
  useEffect(() => {
    getIngredients()
  }, [])
  const startIndex = (currentPage - 1) * INGR_PER_PAGE;
  const selectedIngre = ingredients.slice(
    startIndex,
    startIndex + INGR_PER_PAGE
  );
  const totalPages = Math.ceil(ingredients.length / INGR_PER_PAGE);

  return (
    <div className="px-5 my-4" >
      <div className={`${style.confirm_recipe}`}>
        <button className={style.confirm_btn}>Add Ingredient</button>
      </div>
      <div className=" rounded-4 p-3" style={{ background: "var(--body)" }}>
        <div
          className="row m-3 pb-3 flex-wrap align-items-start justify-content-center "
          style={{ gap: "40px", borderBottom: "1px solid var(--text_black)" }}
        >
          {selectedIngre?.map((ing, index) => (
            <div
              key={index}
              className={`col-6 col-lg-3 d-flex flex-column justify-content-center align-items-center gap-3 ${style.ing_div}`}
            >
              <img src={ing.image.url} alt="img" width={100} height={100} style={{ borderRadius: "18px" }} />
              <h5>{ing.name || 'Meat'}</h5>
              <p>category: {ing.category.name}</p>
            </div>
          ))}
        </div>
        <Pagination
          who={'ingredients'}
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
          totalUsers={ingredients.length}
        />
      </div>
    </div>
  );
}
