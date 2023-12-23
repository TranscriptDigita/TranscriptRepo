// react imports
import React from "react";
import { HiOutlinePlusSmall, HiChevronRight } from "react-icons/hi2";

// component imports
import RequestData from "../../../components/AdminInfo/RequestData";
import RecentRequests from "../../../components/AdminInfo/Activities";
import CompletedRequest from "../../../components/AdminInfo/Stats";

// mui imports
import { Button } from "@mui/material";

// rrd imports
import { Link } from "react-router-dom";

// redux imports
import { useSelector } from "react-redux";
import { Activities, LineChart, Stats } from "../../../components";

function Dashboard() {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-col">
      
        
        <div className="w-full   p-4 mb-5 mr-5">
        {/* <LineChart /> */} <RequestData />
        </div>


        <div className="w-full   p-4 mb-5 mr-5">
        {/* <LineChart /> */} <Activities/>
        </div>

        <div className="w-full   p-4 mb-5 mr-5">
        {/* <LineChart /> */} <Stats/>
        </div>
       
      
      
    </div>
  );
}

export default Dashboard;
