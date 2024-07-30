import DefaultDash from "./defaultDash/defaultDash";
import Ingredients from "./ingredients/ingredients";
import Users from "./users/users";
import Recipes from "./recipes/recipes";
import DashNav from "../../components/dashNav/dashNav";
import Sidebar from "../../components/sidebar/sidebar";
import { Route, Routes } from "react-router-dom";
import React from "react";
import { Helmet } from "react-helmet";

export default function Dashboard() {
  return (
    <div className="d-flex">
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="" />
      </Helmet>
      <Sidebar />
      <div
        className="d-flex flex-column w-100 overflow-hidden"
        style={{ background: "var(--body)" }}
      >
        {/* <DashNav /> */}
        <Routes>
          <Route path="/ingredients" element={<Ingredients />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/users" element={<Users />} />
          <Route path="/" element={<DefaultDash />} />
        </Routes>
      </div>
    </div>
  );
}
