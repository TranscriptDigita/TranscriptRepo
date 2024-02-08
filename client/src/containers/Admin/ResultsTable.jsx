import React, { useState, useEffect } from 'react';
import StaffListTableI from '../../components/table/StaffListTableI';

function ResultsTable() {
  const getAdminToken = () => {
    const storedUserData = localStorage.getItem('AdminUser');
    if (storedUserData) {
      const userDataObject = JSON.parse(storedUserData);
      return userDataObject?.token || null;
    }
    return null;
  };

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const headers = [
    { title: 'Name' },
    { title: 'Registration Number' },
    { title: 'Year of Admission' },
    { title: 'Year of Graduation' },
    { title: 'CGP' },
    { title: 'Grade' },
    { title: 'Institution ID' },
  ];

  const apiEndpoint = 'https://dacs.onrender.com/api/v1/students-data/results';
  const bearerToken = getAdminToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiEndpoint, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${bearerToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch alumni data');
        }

        const responseData = await response.json();
        const dataFromApi = responseData.data || [];

        const dataWithDetails = await Promise.all(
          dataFromApi.map(async (item) => {
            const institutionId = extractInstitutionId(item.institutionId);
            const institutionDetails = await fetchInstitutionDetails(institutionId);

            return {
              Name: item.studentName,
              'Registration Number': item.registrationNumber,
              'Year of Admission': extractYear(item.yearOfAdmission),
              'Year of Graduation': extractYear(item.yearOfGraduation),
              'CGP': item.cgp,
              'Grade': item.grade,
              'Institution ID': extractInstitutionName(institutionDetails),
            };
          })
        );

        setData(dataWithDetails);
        setIsLoading(false);
        console.log('Success: Data fetched from the API', responseData.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchInstitutionDetails = async (institutionId) => {
    const institutionDetailsEndpoint = `https://dacs.onrender.com/api/v1/admin/institution/${institutionId}`;
    try {
      const response = await fetch(institutionDetailsEndpoint, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${bearerToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch institution details');
      }

      const responseData = await response.json();
      return responseData.data || {};
    } catch (error) {
      console.error('Error fetching institution details:', error);
      return {};
    }
  };

  const extractInstitutionName = (institutionDetails) => {
    return institutionDetails.name || '';
  };

  const extractInstitutionId = (institutionId) => {
    const match = /ObjectId\("([^"]+)"\)/.exec(institutionId);
    return match ? match[1] : institutionId;
  };

  const extractYear = (dateString) => {
    return dateString ? dateString.substring(0, 4) : dateString;
  };

  console.log('Data:', data);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <StaffListTableI headers={headers} items={data} />
      )}
    </div>
  );
}

export default ResultsTable;
