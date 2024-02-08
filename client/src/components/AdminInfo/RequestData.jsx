import React, { useState, useEffect } from 'react';
import { Button } from "@mui/material";

const RequestData = () => {




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


  const [totalInstitutions, setTotalInstitutions] = useState(0);
  const [totalAlumni, setTotalAlumni] = useState(0);
  const [totalStaffs, setTotalStaffs] = useState(0);
  const [totalTranscripts, setTotalTranscripts] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseInstitutions = await fetch('https://dacs.onrender.com/api/v1/admin/all/institions', {
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        });
        const institutionsData = await responseInstitutions.json();
        console.log('Institutions Data:', institutionsData);
        setTotalInstitutions(institutionsData.length);
  
        const responseAlumni = await fetch('https://dacs.onrender.com/api/v1/admin/all/alumnus', {
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        });
        const alumniData = await responseAlumni.json();
        console.log('Alumni Data:', alumniData);
        setTotalAlumni(alumniData.length);
  
        const responseStaffs = await fetch('https://dacs.onrender.com/api/v1/admin/staff/list', {
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        });
        const staffsData = await responseStaffs.json();
        console.log('Staffs Data:', staffsData);
        setTotalStaffs(staffsData.length);
  
        const responseTranscripts = await fetch('https://dacs.onrender.com/api/v1/admin/all/transcripts', {
          headers: {
            Authorization: `Bearer ${getAdminToken()}`,
          },
        });
        const transcriptsData = await responseTranscripts.json();
        console.log('Transcripts Data:', transcriptsData);
        setTotalTranscripts(transcriptsData.length);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);



  return (
    <div className="flex flex-col md:flex-row justify-between gap-4">
      {/* first section */}
      <div className="bg-white flex flex-col md:flex-row gap-2.5 p-5 rounded-md items-start flex-1">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/158c7d727e2cc1e1ebbe91a078e692d25aeccca386244dfd91adeda259793ddb?"
          className="aspect-square object-contain object-center w-[45px] overflow-hidden shrink-0 max-w-full"
        />
        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
          <div className="text-neutral-800 text-xs font-light">
            Total institutions
          </div>
          <div className="text-neutral-800 text-2xl font-semibold">{totalInstitutions}</div>
        </div>
      </div>

      {/* second section */}
      <div className="bg-white flex flex-col md:flex-row gap-2.5 p-5 rounded-md items-start flex-1">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/158c7d727e2cc1e1ebbe91a078e692d25aeccca386244dfd91adeda259793ddb?"
          className="aspect-square object-contain object-center w-[45px] overflow-hidden shrink-0 max-w-full"
        />
        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
          <div className="text-neutral-800 text-xs font-light">
            Total Alumni's
          </div>
          <div className="text-neutral-800 text-2xl font-semibold">{totalAlumni}</div>
        </div>
      </div>

      {/* third section */}
      <div className="bg-white flex flex-col md:flex-row gap-2.5 p-5 rounded-md items-start flex-1">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/158c7d727e2cc1e1ebbe91a078e692d25aeccca386244dfd91adeda259793ddb?"
          className="aspect-square object-contain object-center w-[45px] overflow-hidden shrink-0 max-w-full"
        />
        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col">
          <div className="text-neutral-800 text-xs font-light">
            Total Staffs
          </div>
          <div className="text-neutral-800 text-2xl font-semibold">{totalStaffs}</div>
        </div>
      </div>

      {/* fourth section */}
      <div className="bg-white flex flex-col md:flex-row gap-2.5 p-5 rounded-md items-start flex-1">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/91bd581170fca768d356a9a3b913efe046b94c214009e65019d5a9eb286ebd83?"
          className="aspect-square object-contain object-center w-[45px] overflow-hidden shrink-0 max-w-full"
        />
        <div className="items-stretch self-stretch flex grow basis-[0%] flex-col pr-4">
          <div className="text-neutral-800 text-xs font-light whitespace-nowrap">
            Total Transcript requested
          </div>
          <div className="text-neutral-800 text-2xl font-semibold">{totalTranscripts}</div>
        </div>
      </div>
    </div>
  );
};

export default RequestData;
