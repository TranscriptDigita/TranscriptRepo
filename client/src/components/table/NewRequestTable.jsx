import React, { useState } from 'react';
import { Button } from '@mui/material'




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





// RecentTranscriptTable Component: Displays a table with sorting and pagination
function NewRequestTable({ headers, items }) {
  // State variables for managing current page, search text, sorting column, and sorting order
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');
  const [sortBy, setSortBy] = useState(null); // State for sorting column
  const [sortOrder, setSortOrder] = useState('asc'); // State for sorting order
  const itemsPerPage = 10; // Number of items to display per page





  // Function to handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    setSortBy(null); // Reset sorting when changing pages
  };


  // Function to handle search input change
  const handleSearch = (e) => {
    setSearchText(e.target.value);
    setCurrentPage(1); // Reset to the first page when performing a new search
    setSortBy(null); // Reset sorting when performing a new search
  };


  // Filter items based on the search text
  const filteredItems = items.filter((item) =>
    item['Request Number'].toLowerCase().includes(searchText.toLowerCase())
  );

  // Sort the displayed items based on the selected column and order
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
    return 0; // No sorting applied
  });

  // Calculate the range of items to display on the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = sortedItems.slice(startIndex, endIndex);

  // Function to handle column header click for sorting
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
      {/* Search bar */}
      <input
        type="text"
        placeholder="Search by Request No."
        value={searchText}
        onChange={handleSearch}
        className="mb-4 p-2"
      />

      {/* Table rendering code */}
      <div className='grid grid-cols-1'>
        <table className='table-auto grid grid-cols-1 gap-y-[8px] border rounded-md p-1'>
          {/* Table headers */}
          <thead className='grid grid-cols-1 p-4 md:p-2'>
            {headers && (
              <tr className={`grid grid-cols-6 md:text-[14px] `}>
                {headers.map((header, index) => (
                  <th
                    key={index}
                    onClick={() => handleHeaderClick(header.title)}
                    style={{ cursor: 'pointer' }}
                  >
                    {header.title}
                    {sortBy === header.title && (
                      <span>{sortOrder === 'asc' ? ' ▲' : ' ▼'}</span>
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          {/* Table body */}
          <tbody>
            {displayedItems &&
              displayedItems.map((item, rowIndex) => (
               
    <div className='flex w-full items-center rounded-lg justify-between md:p-4 p-2 bg-[#6B3FA0] cursor-pointer bg-opacity-5 hover:border hover:border-[#6B3FA0]'>
        
        <Button className={``}>
                <tr key={rowIndex} className='grid grid-cols-6 p-4 md:p-2'>
                  {headers.map((header, colIndex) => (
                    <td key={colIndex} className='grid md:text-[14px] ml-10' style={{color:'black'}}>
                      {item[header.title]}
                    </td>
                  ))}
                </tr>
                </Button>
                </div>
              
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination component */}
      <Pagination
        totalItems={filteredItems.length} // Pass the filtered item count to the pagination component
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default NewRequestTable;
