import * as React from "react";

function Logs( ) {
  return (
    <div className=" bg-opacity-10 flex flex-col pl-4 pr-20 py-11 rounded-md items-start max-md:pr-5">
         <div className="items-center flex gap-3">
      <div className="text-black text-base font-semibold grow whitespace-nowrap my-auto">
        Date: <span className="">21-11-2023</span>
      </div>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/abb833e065a1b7ad279826ea42e186188b4df3e47323cde6a5916d57358c070f?"
        className="aspect-square object-contain object-center w-6 overflow-hidden self-stretch shrink-0 max-w-full"
      />
    </div>
      <div className="items-stretch flex gap-1 mt-1.5">
        <div className="text-black text-sm font-semibold grow whitespace-nowrap">
          Login:{" "}
        </div>
        <div className="text-black text-sm grow whitespace-nowrap">12:00pm</div>
      </div>
      <div className="items-stretch flex gap-1 mt-2">
        <div className="text-black text-sm font-semibold grow whitespace-nowrap">
          Logout:
        </div>
        <div className="text-black text-sm grow whitespace-nowrap">1:00pm</div>
      </div>
    
    </div>
  );
}


export default Logs