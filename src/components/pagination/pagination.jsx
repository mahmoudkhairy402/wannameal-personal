import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import style from "./pagination.module.css";

export default function Pagination({ who, currentPage, totalPages, setCurrentPage, totalUsers }) {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  return (
    <div className={`d-flex flex-column justify-content-between align-items-center flex-xl-row  ${style.pagination_div}`}>
      <p className="fw-bold m-0">Total {who} :<span className="ps-2">{totalUsers}</span></p>
      <div className="d">
        <nav aria-label="Page navigation example">
          <ul className="pagination d-flex gap-2 ">
            <li className={style.number_btn}>
              <button onClick={() => handlePageChange(currentPage - 1)} aria-label="Previous">
                <FaArrowLeft />
              </button>
            </li>
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={style.number_btn}>
                <button onClick={() => handlePageChange(index + 1)} className={currentPage === index + 1 ? style.active : ""}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={style.number_btn}>
              <button onClick={() => handlePageChange(currentPage + 1)} aria-label="Next">
                <FaArrowRight />
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
