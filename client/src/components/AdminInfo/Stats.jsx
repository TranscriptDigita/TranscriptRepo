import React from "react";
import "tailwindcss/tailwind.css"; // Import Tailwind CSS styles

const Stats = () => {
  // Sample data for the bar chart
  const barChartData = [100, 80, 120, 150, 90, 110, 130, 160, 140, 100, 120, 180];
  const numbers = [1, 2, 3, 4, 5];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  // Find the maximum value in the data for normalization
  const maxValue = Math.max(...barChartData);

  return (
    <div className="shadow-sm bg-white flex min-h-[341px] flex-col rounded-md" >
      
      <div className="flex flex-col items-stretch px-5 mt-5">
      
      <div className="text-zinc-400 text-lg leading-5 w-full">Statistics</div>
      <div className="text-slate-800 text-base font-semibold leading-7 w-full mt-2.5">
       New Sign Ups
      </div>
    </div>
   
    
    <div className="flex items-center mt-5 relative">
   
      
      {/* L-shaped lines */}
      {barChartData.map((value, index) => (
       
        
        <div
          key={index}
          className="bar-container relative"
          style={{
            width: `${60 / barChartData.length}%`,
            margin: "1.5%"
            
          }}
        >
          
           
          <div
            className="bar bg-white-300"
            style={{
              height: `${200 - (value / maxValue) * 100}px`, // Set the height dynamically
              borderTopLeftRadius:"10px",
              borderTopRightRadius:"10px",
              borderBottomLeftRadius:"10px",
              borderBottomRightRadius:"10px",
            }}
          ></div>
          
          <div className="text-center mt-1">
            {/* {value} */}
          </div>
          <div
            className="bar bg-purple-500"
            style={{
              height: `${(value / maxValue) * 100}px`,
              borderTopLeftRadius:"10px",
            borderTopRightRadius:"10px"
            }}
          ></div>
          <div>
          </div>
          <div className="text-center mt-2 text-sm text-gray-600 rotate-90">
            {months[index]}
          </div>

      <div class="text-center mt-2 text-sm text-purple-500 transform rotate-90 mt-20">
      {value}
    </div>
          
         
        </div>
     
   
      ))}
       
    </div>
    
   
    </div>
  );
};

export default Stats;
