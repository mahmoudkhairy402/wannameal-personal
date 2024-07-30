import React from "react";
import loading from "../../assets/loading.gif";

export default function Loading({ width = "200px", height = "200px" }) {
  return (
    <div
      className="imageContainer d-flex justify-content-center align-items-center"
      style={{ width, height }}
    >
      <img src={loading} alt="loading" className="w-100 h-100" />
    </div>
  );
}
