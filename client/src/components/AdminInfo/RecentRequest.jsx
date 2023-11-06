import React from "react";

const requests = [
  {
    id: 1,
    name: "Adams Adimpe Anthony",
    course: "Microbiology",
    year_graduated: "2013/2012",
  },
  {
    id: 2,
    name: "Adams Adimpe Anthony",
    course: "Medicine",
    year_graduated: "2022",
  },
  {
    id: 3,
    name: "Adams Adimpe Anthony",
    course: "Law",
    year_graduated: "2013/2012",
  },
];

const RecentRequests = () => {
  return (
    <div className="py-4">
      <h4 className="text-2xl font-semibold mb-4">Recent Requests</h4>
      <table className="w-full border-none table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left text-sm">Name</th>
            <th className="px-4 py-2 text-left text-sm">Course</th>
            <th className="px-4 py-2 text-left text-sm">Year Graduated</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="text-sm px-4 py-1">{request.name}</td>
              <td className="text-sm px-4 py-1">{request.course}</td>
              <td className="text-sm px-4 py-1">{request.year_graduated}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentRequests;
