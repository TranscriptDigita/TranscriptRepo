//created a new request, tracking and delivery page

import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import TranscriptDetail from "../Transcripts/TranscriptDetail/TranscriptDetail";

export default function RequestTrackAndDelivery() {
  // Initialize state to track the active button (default: 1)
  const [activeButton, setActiveButton] = useState(1);

  // Function to handle button clicks and update activeButton state
  const handleButtonClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  return (
    <div>
      {/* Static text for School Name */}
      <p>School Name</p>
      {/* Container for buttons */}
      <div className="px-5 mt-10 flex">
        {/* Button for Request Transcript */}
        <Button
          variant="contained"
          className={`w-1/3 h-16 ${
            activeButton === 1 ? "bg-purple-700" : "bg-gray-700"
          } mx-2`}
          onClick={() => handleButtonClick(1)}
        >
          Request Transcript
        </Button>
        {/* Button for Track Process */}
        <Button
          variant="contained"
          className={`w-1/3 h-16 ${
            activeButton === 2 ? "bg-purple-700" : "bg-gray-700"
          } mx-2`}
          onClick={() => handleButtonClick(2)}
        >
          Track Process
        </Button>
        {/* Button for Delivery Request */}
        <Button
          variant="contained"
          className={`w-1/3 h-16 ${
            activeButton === 3 ? "bg-purple-700" : "bg-gray-700"
          } mx-2`}
          onClick={() => handleButtonClick(3)}
        >
          Delivery Request
        </Button>
      </div>
      {/* Content conditionally displayed based on activeButton */}
      {activeButton === 3 && <div>Content for Request Transcript</div>}
      {activeButton === 2 && <div><TranscriptDetail/></div>}
      {activeButton === 1 && 
        <div>
          {/* Form header */}
          <div>
            <h4 className='font-bold text-center mt-20'>Fill the Form below</h4>
            <p className="flex flex-col gap-y-4 bg-white p-5 my-auto rounded-lg">
              {/* Form instructions */}
              To ensure prompt and accurate delivery of your transcript, 
              please carefully fill out the delivery address in the form below. 
              Verify all the details, including the recipient's name, 
              street address, city, postal code, and any additional delivery instructions if necessary.
            </p>
          </div>
          {/* Form fields */}
          <div className=" text-center mt-10">
            <div>
              <h5>Recipients Name</h5>
              {/* Text field for recipient's name */}
              <TextField
                label=""
                id="outlined-size-small2"
                size="small"
                className="w-1/3 h-16"
              />
              <h5>Delivery Address</h5>
              {/* Text field for delivery address */}
              <TextField
                label=""
                id="outlined-size-small2"
                size="small"
                className="w-1/3 h-16"
              />
              <h5>Delivery Contact</h5>
              {/* Text field for delivery contact */}
              <TextField
                label=""
                id="outlined-size-small2"
                size="small"
                className="w-1/3 h-16"
              />
            </div>
            {/* Button to send the request */}
            <Button
              variant="contained"
              className={`w-1/3 h-16 mb-10 ${
                activeButton === 1 ? "bg-purple-700" : "bg-gray-700"
              } mx-2`}
            >
              Send Request
            </Button>
          </div>
        </div>
      }
    </div>
  );
}
