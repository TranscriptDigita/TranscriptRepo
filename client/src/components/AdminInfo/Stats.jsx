import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Stats = () => {


  const [barChartData, setBarChartData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://dacs.onrender.com/api/v1/admin/all/logs", {
          headers: {
            'Authorization': `Bearer ${bearerToken}`, // Replace <token> with your actual token
          },
        });

        const signupLogs = response.data.filter((log) => log.logType === "signup");
        
        // Group the data by month
        const groupedData = {};
        signupLogs.forEach((log) => {
          const month = new Date(log.logTime).getMonth();
          if (!groupedData[month]) {
            groupedData[month] = 1;
          } else {
            groupedData[month]++;
          }
        });

        // Create an array with counts for each month
        const countsByMonth = Array.from({ length: 12 }, (_, month) => groupedData[month] || 0);

        setBarChartData(countsByMonth);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);



  const getAdminToken = () => {
    const storedUserData = localStorage.getItem('AdminUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.token;
    }
    return null;
  };

  const getAdminId = () => {
    const storedUserData = localStorage.getItem('AdminUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.admin?._id;
    }
    return null;
  };

  const adminId = getAdminId();
  console.log('Admin IDLMT:', adminId);

  const bearerToken = getAdminToken();
  console.log('table tokenT: ', bearerToken);




  // Sample data for the bar chart
  // const barChartData = [100, 80, 120, 150, 90, 110, 130, 160, 140, 100, 120, 180];
  // const numbers = [1, 2, 3, 4, 5];
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
