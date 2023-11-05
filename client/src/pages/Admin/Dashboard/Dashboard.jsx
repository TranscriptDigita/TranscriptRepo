// react imports
import React from "react";
import { HiOutlinePlusSmall, HiChevronRight } from "react-icons/hi2";

// component imports
import RequestData from "../../../components/AdminInfo/RequestData";
import RecentRequests from "../../../components/AdminInfo/RecentRequest";
import CompletedRequest from "../../../components/AdminInfo/CompletedRequest";

// mui imports
import { Button } from "@mui/material";

// rrd imports
import { Link } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";
import { LineChart } from "../../../components";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="w-full md:w-2/3 bg-white p-4 mb-5 mr-5">
        <LineChart />
        </div>
        <div className="w-full md:w-1/3 bg-white mb-5 p-4">
          <RequestData />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-start justify-between">
        <div className="w-full md:w-2/3 bg-white p-4 mb-5 mr-5">
        <RecentRequests />
        </div>
        <div className="w-full md:w-1/3 bg-white p-4">
        <CompletedRequest />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
