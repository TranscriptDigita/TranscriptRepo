import React from 'react';
import { Button } from '@mui/material';

function Pagination({ totalItems, itemsPerPage, currentPage, onPageChange }) {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pageCount) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="pagination">
      <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
        Previous
      </button>
      <span className='m-3'>
        {currentPage} of {pageCount}
      </span>
      <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount}>
        Next
      </button>
    </div>
  );
}

function StaffListTableA({ headers, items }) {
  return (
    <div className="overflow-x-auto">
      <table className='w-full text-sm text-left rtl:text-right text-black bg-white'>
      <thead className='text-xs text-gray-700 uppercase   dark:text-gray-400'>
          <tr>
            {headers && headers.map((header, index) => (
              <th key={index} className="px-6 py-3">
                {header.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items &&
            items.map((item, rowIndex) => (
              <tr key={rowIndex} className={`bg-white ${rowIndex % 2 === 0 ? 'dark:bg-gray-300' : ''} border-b dark:border-gray-700`}>
                {headers.map((header, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 font-medium whitespace-nowrap">
                    {header.title === 'Deactivate' ? (
                      <Button>{item[header.title]}</Button>
                    ) : (
                      item[header.title]
                    )}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>

      <Pagination
        totalItems={items.length}
        itemsPerPage={items.length}
        currentPage={1}
        onPageChange={() => {}}
      />
    </div>
  );
}

export default StaffListTableA;
