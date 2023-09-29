import React from 'react';
import RecentTranscriptTable from '../../../components/table/RecentTranscriptTable';

function RecentRequests() {
  const headers = [
    {
      title: 'Name'
    },
    {
      title: 'Course'
    },
    {
      title: 'Year Graduated'
    },
    {
      title: 'Action'
    },
    {
      title: "Request Number"
    }
  ];

  const items = [
    {
      name: 'John Doe',
      course: 'Computer Science',
      yearGraduated: '2020',
      action: 'Process',
      requestNo: '002',
    },
    {
      name: 'Jane Smith',
      course: 'Mathematics',
      yearGraduated: '2019',
      action: 'Process',
      requestNo: '003',
    },
    {
      name: 'Jane Smith',
      course: 'Mathematics',
      yearGraduated: '2019',
      action: 'Process',
      requestNo: '004',
    },
    {
      name: 'John Doe',
      course: 'Computer Science',
      yearGraduated: '2020',
      action: 'Process',
      requestNo: '005',
    },
    {
      name: 'Jane Smith',
      course: 'Mathematics',
      yearGraduated: '2019',
      action: 'Process',
      requestNo: '006',
    },
    {
      name: 'Jane Smith',
      course: 'Mathematics',
      yearGraduated: '2019',
      action: 'Process',
      requestNo: '007',
    },
    {
      name: 'Alice Johnson',
      course: 'Physics',
      yearGraduated: '2021',
      action: 'Pending',
      requestNo: '008',
    },
    {
      name: 'Bob Johnson',
      course: 'Chemistry',
      yearGraduated: '2018',
      action: 'Approved',
      requestNo: '009',
    },
    {
      name: 'Michael Brown',
      course: 'Biology',
      yearGraduated: '2022',
      action: 'Process',
      requestNo: '010',
    },
    {
      name: 'Sarah Adams',
      course: 'History',
      yearGraduated: '2017',
      action: 'Rejected',
      requestNo: '011',
    },
    {
      name: 'Emily Davis',
      course: 'English',
      yearGraduated: '2016',
      action: 'Process',
      requestNo: '012',
    },
    {
      name: 'David Wilson',
      course: 'Economics',
      yearGraduated: '2020',
      action: 'Approved',
      requestNo: '013',
    },
    {
      name: 'Olivia White',
      course: 'Psychology',
      yearGraduated: '2019',
      action: 'Process',
      requestNo: '014',
    },
  
   
  ];

  // Map the items to match the headers
  const formattedItems = items.map((item) => ({
    'Name': item.name,
    'Course': item.course,
    'Year Graduated': item.yearGraduated,
    'Action': item.action,
    'Request Number': item.requestNo
  }));

  console.log(formattedItems)

  return (
    <div >
      <RecentTranscriptTable headers={headers} items={formattedItems} />
    </div>
  );
}

export default RecentRequests;
