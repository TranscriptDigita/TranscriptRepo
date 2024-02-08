import React, { useState } from 'react';
import { Button } from '@mui/material';

// Pagination Component: Handles navigation between pages
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

// RecentTranscriptTable Component: Displays a table with sorting and pagination
function RecentTranscriptTable({ headers, items }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');
  const itemsPerPage = 10;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSortBy(null);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1);
    setSortBy(null);
  };

  const filteredItems = items.filter((item) =>
    item['Request Number'].toLowerCase().includes(searchText.toLowerCase())
  );

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy) {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (sortOrder === 'asc') {
        return aValue.localeCompare(bValue);
      } else {
        return bValue.localeCompare(aValue);
      }
    }
    return 0;
  });

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = sortedItems.slice(startIndex, endIndex);

  const handleHeaderClick = (header) => {
    if (sortBy === header) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(header);
      setSortOrder('asc');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by Request No."
        value={searchText}
        onChange={handleSearch}
        className="mb-4 p-2"
      />

      <div className='grid grid-cols-1'>
        <table className='w-full text-sm text-left rtl:text-right text-black bg-white'>
          
          <thead className='text-xs text-gray-700 uppercase   dark:text-gray-400'>
            <tr>
              {headers && headers.map((header, index) => (
                <th key={index} className="px-6 py-3" onClick={() => handleHeaderClick(header.title)} style={{ cursor: 'pointer' }}>
                  {header.title}
                  {sortBy === header.title && (
                    <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedItems &&
              displayedItems.map((item, rowIndex) => (
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
      </div>

      <Pagination
        totalItems={filteredItems.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default RecentTranscriptTable;
