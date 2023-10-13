import React from 'react';
import { Button } from '@mui/material';

// Pagination Component: Handles navigation between pages
function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  // Calculate the total number of pages needed
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  // Handle the click event when navigating to the previous page
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      onPageChange(newPage); // Call the parent component's onPageChange function
    }
  };

  return (
    <div className="pagination">
      {/* Button for navigating to the previous page */}
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span className='m-3'>
        {/* Display current page and total page count */}
        {currentPage} of {pageCount}
      </span>
      {/* Button for navigating to the next page */}
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount}>
        Next
      </button>
    </div>
  );
}

// StaffListTable Component: Displays a table with sorting and pagination
function StaffListTable({ headers, items }) {
  return (
    <div>
      {/* Table rendering code */}
      <div className='grid grid-cols-1'>
        <table className='table-auto grid grid-cols-1 gap-y-[8px] border rounded-md p-1'>
          {/* Table headers */}
          <thead className='grid grid-cols-1 p-4 md:p-2'>
            {headers && (
              <tr className={`grid grid-cols-${headers.length} md:text-[14px] `}>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    style={{ cursor: 'pointer' }}
                  >
                    {header.title}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          {/* Table body */}
          <tbody>
            {items &&
              items.map((item, rowIndex) => (
                <tr key={rowIndex} className="grid grid-cols-4 p-4 md:p-2">
                  {headers.map((header, colIndex) => (
                    <td key={colIndex} className="grid md:text-[14px] ml-10" style={{ color: 'black' }}>
                      {header.title === 'Deactivate' ? (
                        <Button >{item[header.title]}</Button>
                      ) : (
                        item[header.title]
                      )}
                    </td>
                  ))}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination component */}
      <Pagination
        totalItems={items.length} // Pass the item count to the pagination component
        itemsPerPage={items.length} // Set itemsPerPage to the total item count for no pagination
        currentPage={1} // Set currentPage to 1 since there's no pagination
        onPageChange={() => {}} // Set an empty function for onPageChange since there's no pagination
      />
    </div>
  );
}

export default StaffListTable;
