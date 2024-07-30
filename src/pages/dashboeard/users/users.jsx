import React, { useEffect, useState } from "react";
import style from "./users.module.css";
import { TbEdit } from "react-icons/tb";
import { CiTrash } from "react-icons/ci";
import Pagination from "../../../components/pagination/pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../../redux/slices/dashusers";

const USERS_PER_PAGE = 6;

export default function Users() {
  const [choosen, setchoosen] = useState("Admin");
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const status = useSelector((state) => state.users.status);
  const error = useSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (!users || !users.data) {
    return <div>Loading...</div>;
  }

  const startIndex = (currentPage - 1) * USERS_PER_PAGE;
  const selectedUsers = users.data.slice(
    startIndex,
    startIndex + USERS_PER_PAGE
  );
  const totalPages = Math.ceil(users.data.length / USERS_PER_PAGE);

  return (
    <div className="px-5 my-4">
      <div
        className="d-flex justify-content-center align-items-center gap-5 rounded-3"
        style={{ background: "var(--text_white)" }}
      >
        <div
          onClick={() => setchoosen("Admin")}
          className={`${style.filter_btn} ${choosen === "Admin" ? style.green : ""
            }`}
        >
          Admin users
        </div>
        <div
          onClick={() => setchoosen("premium")}
          className={`${style.filter_btn} ${choosen === "premium" ? style.green : ""
            }`}
        >
          <span style={{ color: "gold" }}>premium</span> users
        </div>
        <div
          onClick={() => setchoosen("Normal")}
          className={`${style.filter_btn} ${choosen === "Normal" ? style.green : ""
            }`}
        >
          Normal users
        </div>
      </div>
      <div
        className="my-4 rounded-3 p-3"
        style={{ background: "var(--text_white)" }}
      >
        {status === "loading" && <p>Loading...</p>}
        {status === "failed" && <p>Error: {error}</p>}
        {status === "succeeded" && (
          <>
            <table className={style.table}>
              <thead>
                <tr className={style.Table_head}>
                  <th className={style.head_table}>user</th>
                  <th className={style.head_table}>email</th>
                  <th className={style.head_table}>Status</th>
                  <th className={style.head_table}></th>
                </tr>
              </thead>
              <tbody>
                {selectedUsers.map((user) => (
                  <tr key={user.id}>
                    <td className={style.body_table}>
                      <svg
                        style={{ marginRight: "10px" }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="41"
                        height="41"
                        viewBox="0 0 41 41"
                        fill="none"
                      >
                        <rect
                          x="0.5"
                          y="0.5"
                          width="40"
                          height="40"
                          rx="20"
                          fill="#5CB85F"
                          fillOpacity="0.64"
                        />
                        <path
                          d="M20.5 8.5C22.0913 8.5 23.6174 9.13214 24.7426 10.2574C25.8679 11.3826 26.5 12.9087 26.5 14.5C26.5 16.0913 25.8679 17.6174 24.7426 18.7426C23.6174 19.8679 22.0913 20.5 20.5 20.5C18.9087 20.5 17.3826 19.8679 16.2574 18.7426C15.1321 17.6174 14.5 16.0913 14.5 14.5C14.5 12.9087 15.1321 11.3826 16.2574 10.2574C17.3826 9.13214 18.9087 8.5 20.5 8.5ZM20.5 23.5C27.13 23.5 32.5 26.185 32.5 29.5C32.5 31.1569 31.1569 32.5 29.5 32.5H11.5C9.84315 32.5 8.5 31.1569 8.5 29.5C8.5 26.185 13.87 23.5 20.5 23.5Z"
                          fill="white"
                        />
                      </svg>
                      <span>{user.userName}</span>
                    </td>
                    <td className={style.body_table}>{user.email}</td>
                    <td className={style.body_table}>{user.status}</td>
                    <td className={style.body_table}>
                      <TbEdit />
                      <CiTrash />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Pagination
              who={'users'}
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              totalUsers={users.data.length}
            />
          </>
        )}
      </div>
    </div>
  );
}
