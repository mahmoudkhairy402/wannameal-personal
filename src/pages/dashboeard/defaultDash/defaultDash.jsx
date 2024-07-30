import style from "./dashboard.module.css";
import React, { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FiEye } from "react-icons/fi";
import { GoPlus } from "react-icons/go";
import { FaCrown, FaUsers } from "react-icons/fa";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Card from "../../../assets/Card 2.png";

export default function DefaultDash() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const data = [
    { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
    { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
    { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
    { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
    { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
    { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
    { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
  ];

  return (
    <div className="px-5 my-4">
      <div className="row d-flex align-items-center gap-5 w-100">
        <div className={`col ${style.state_div} p-2 px-3`}>
          <div className="d-flex w-100 justify-content-between align-items-center">
            <h1>1550</h1>
            <FiEye size={40} color="#E98A2FF2" />
          </div>
          <div className="opacity-75">Daily views</div>
          <div className="d-flex gap-2" style={{ color: "#049601" }}>
            <FaArrowTrendUp size={25} />
            <p>2.0 %</p>
          </div>
        </div>
        <div className={`col ${style.state_div} p-2 px-3`}>
          <div className="d-flex w-100 justify-content-between align-items-center">
            <h1>1550</h1>
            <FiEye size={40} color="#E98A2FF2" />
          </div>
          <div className="opacity-75">Daily views</div>
          <div className="d-flex gap-2" style={{ color: "#049601" }}>
            <FaArrowTrendUp size={25} />
            <p>2.0 %</p>
          </div>
        </div>
        <div className={`col ${style.state_div} p-2 px-3`}>
          <div className="d-flex w-100 justify-content-between align-items-center">
            <h1>1550</h1>
            <FiEye size={40} color="#E98A2FF2" />
          </div>
          <div className="opacity-75">Daily views</div>
          <div className="d-flex gap-2" style={{ color: "#049601" }}>
            <FaArrowTrendUp size={25} />
            <p>2.0 %</p>
          </div>
        </div>
        <div className={`col ${style.state_div} p-2 px-3`}>
          <div className="d-flex w-100 justify-content-between align-items-center">
            <h1>1550</h1>
            <FiEye size={40} color="#E98A2FF2" />
          </div>
          <div className="opacity-75">Daily views</div>
          <div className="d-flex gap-2" style={{ color: "#049601" }}>
            <FaArrowTrendUp size={25} />
            <p>2.0 %</p>
          </div>
        </div>
      </div>
      <div className="row  my-4 row-gap-2">
        <div className="col-12 col-lg-9">
          {isClient && (
            <div className={`p-3 py-4 ${style.state_div}`}>
              <h4 className="mb-4">Market Overview</h4>
              <ResponsiveContainer width="100%" height={250}>
                <AreaChart
                  width={730}
                  height={250}
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  {/* <XAxis dataKey="name" />
                            <YAxis /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="pv"
                    stroke="#82ca9d"
                    fillOpacity={1}
                    fill="url(#colorPv)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
        <div className="col-12 col-lg-3 d-flex flex-column gap-5">
          <div
            className={`p-3 py-5 d-flex flex-column gap-5 ${style.state_div}`}
          >
            <div className="d-flex w-100 justify-content-between flex-wrap">
              <h3>Balances</h3>
              <GoPlus className={style.plus_icon} />
            </div>
            <div>
              <div className="d">
                <span style={{ color: "var(--green)", fontSize: "24px" }}>
                  ${" "}
                </span>
                <span>Dollar</span>
              </div>
              <h3 style={{ color: "var(--green)", fontWeight: "bold" }}>
                100.23
              </h3>
            </div>
            <div className="d">
              <img src={Card} alt="" className={style.card_image} />
            </div>
          </div>
          <div
            className={`p-3 py-5 d-flex flex-column gap-3 ${style.state_div}`}
          >
            <h3>Team</h3>
            <div
              className="d-flex align-items-center gap-3 px-3 py-2 rounded-3"
              style={{ backgroundColor: "var(--light_burble)" }}
            >
              <FaCrown className={style.Team_Icon} />
              <div className="d-flex flex-column align-items-start">
                <h5>Total Admin</h5>
                <span>6</span>
              </div>
            </div>
            <div
              className="d-flex align-items-center gap-3 px-3 py-2 rounded-3"
              style={{ backgroundColor: "#CCF8ED" }}
            >
              <FaUsers
                className={style.Team_Icon}
                style={{ backgroundColor: "var(--light-green)" }}
              />
              <div className="d-flex flex-column align-items-start">
                <h5>Total Member</h5>
                <span>12</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
