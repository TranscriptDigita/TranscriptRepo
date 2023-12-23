import React from "react";
import { Button } from "@mui/material";

const RequestData = () => {
  return (
    <div className="flex justify-between gap-4">
      {/* first section */}
      <div className="bg-white flex gap-2.5 p-5 rounded-md items-start flex-1">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/158c7d727e2cc1e1ebbe91a078e692d25aeccca386244dfd91adeda259793ddb?"
          className="aspect-square object-contain object-center w-[45px] overflow-hidden shrink-0 max-w-full"
        />
        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
          <div className="text-neutral-800 text-xs font-light">
            Total institutions
          </div>
          <div className="text-neutral-800 text-2xl font-semibold">2,456</div>
        </div>
      </div>

      {/* second section */}
      <div className="bg-white flex gap-2.5 p-5 rounded-md items-start flex-1">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/158c7d727e2cc1e1ebbe91a078e692d25aeccca386244dfd91adeda259793ddb?"
          className="aspect-square object-contain object-center w-[45px] overflow-hidden shrink-0 max-w-full"
        />
        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
          <div className="text-neutral-800 text-xs font-light">
            Total institutions
          </div>
          <div className="text-neutral-800 text-2xl font-semibold">2,456</div>
        </div>
      </div>

      {/* third section */}
      <div className="bg-white flex gap-2.5 p-5 rounded-md items-start flex-1">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/158c7d727e2cc1e1ebbe91a078e692d25aeccca386244dfd91adeda259793ddb?"
          className="aspect-square object-contain object-center w-[45px] overflow-hidden shrink-0 max-w-full"
        />
        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
          <div className="text-neutral-800 text-xs font-light">
            Total institutions
          </div>
          <div className="text-neutral-800 text-2xl font-semibold">2,456</div>
        </div>
      </div>

      {/* fourth section */}
      <div className="bg-white flex gap-2.5 p-5 rounded-md items-start flex-1">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/91bd581170fca768d356a9a3b913efe046b94c214009e65019d5a9eb286ebd83?"
          className="aspect-square object-contain object-center w-[45px] overflow-hidden shrink-0 max-w-full"
        />
        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col pr-4">
          <div className="text-neutral-800 text-xs font-light whitespace-nowrap">
            Total Transcript requested
          </div>
          <div className="text-neutral-800 text-2xl font-semibold">1,326</div>
        </div>
      </div>
    </div>
  );
};

export default RequestData;
