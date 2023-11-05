import React from "react";

import { Button } from "@mui/material";

const infos = [
  { id:1, title: "Total Transcript Request", number: 89 },
  { id:2, title: "Total Transcript Verified", number: 67 },
  { id:3, title: "Total Transcript Uploaded", number: 656 },
  { id:4, title: "Total Transcript Queried", number: 908 },
  { id:5, title: "Total Transcript Rejected", number: 2 },
];

const RequestData = () => {
  return (
    <div className="flex flex-col">
      <h4 className="">Document Request Data</h4>
      {infos.map((info) => (
        <div key={info.id} className="flex flex-col mt-4 ">
          <div className="flex flex-row items-center justify-between">
            <p className="text-start text-sm mr-3">{info.title}</p>
            <Button
              className="justify-center items-center border border-solid border-[#333] rounded-md bg-white text-[#464040] text-sm  "
              style={{ width: "100px" }}
            >
              {info.number}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RequestData;
