import React from "react";


import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const infos = [
  { id:1, name: "Adams Adimpe Anthony", },
  { id:2, name: "Adams Adimpe Anthony", },
  { id:3, name: "Adams Adimpe Anthony ", },
  { id:4, name: "Adams Adimpe Anthony ", },
 
];

const CompletedRequest = () => {
  return (
    <div className="flex flex-col">
      <h4 className="">Completed Requests</h4>
      {infos.map((info) => (
        <div key={info.id} className="flex flex-col mt-4 ">
          <div className="flex flex-row items-center justify-between">
            <p className="text-start text-sm mr-3">{info.name}</p>
            <CheckCircleIcon style={{ color: 'green', fontSize: 24 }} />
           
          </div>
        </div>
      ))}
    </div>
  );
};

export default CompletedRequest;
