'use client';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';

const Table = () => {
  const uploadedData = useSelector(
    (state: RootState) => state?.uploadedData?.data
  );

  console.log('uploadedData', uploadedData);

  // Function to clean invalid JSON data
  function cleanJSON(jsonString: any) {
    return jsonString?.replace(/NaN/g, 'null').replace(/Infinity/g, 'null');
  }

  // Declare a variable for mappedData
  let mappedData: any;

  if (typeof uploadedData === 'string') {
    try {
      const cleanedData = cleanJSON(uploadedData);
      const parsedData = JSON.parse(cleanedData);
      mappedData = parsedData?.mapped_data;
    } catch (error) {
      console.error('Error parsing data from uploadedData:', error);
      mappedData = null;
    }
  } else if (typeof uploadedData === 'object' && uploadedData !== null) {
    mappedData = uploadedData?.mapped_data;
  } else {
    console.error(
      'Data from uploadedData is neither a valid string nor an object.'
    );
    mappedData = null;
  }

  if (!mappedData) {
    return <div>Data is missing or invalid.</div>;
  }

  // Extract column headers from object keys
  const columns = Object.keys(mappedData);

  // Transpose values into rows
  const rows: any = Array.from(
    { length: mappedData[columns[0]]?.length },
    (_, rowIndex) => columns.map((col) => mappedData[col][rowIndex])
  );

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 5;
  const totalPages = Math.ceil(rows.length / recordsPerPage);

  // Calculate current rows
  const startIndex = (currentPage - 1) * recordsPerPage;
  const currentRows = rows.slice(startIndex, startIndex + recordsPerPage);

  // Handle page change
  const goToPage = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Export to CSV function
  const exportToCSV = () => {
    const csvHeaders = columns.join(',');
    const csvRows = rows.map((row: any) =>
      row.map((cell: any) => (cell !== null ? `"${cell}"` : '')).join(',')
    );
    const csvContent = [csvHeaders, ...csvRows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'table_data.csv';
    link.click();

    URL.revokeObjectURL(url); // Clean up URL
  };

  return (
    <div className="w-full p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow">
        {/* Header */}
        <div className="bg-blue-500 text-white font-bold text-lg p-4 rounded-t-lg flex justify-between items-center">
          <span>Data Table</span>
          <button
            onClick={exportToCSV}
            className="bg-white text-blue-500 py-2 px-4 rounded hover:bg-blue-100"
          >
            Export CSV
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            {/* Table Head */}
            <thead className="bg-blue-100 text-sm uppercase">
              <tr>
                {columns.map((col, index) => (
                  <th
                    key={index}
                    className={`py-2 px-4 whitespace-nowrap text-center ${col === 'Account' ? 'w-64' : ''}`}
                    style={col === 'Account' ? { minWidth: '200px' } : {}}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {currentRows.map((row: any, rowIndex: any) => (
                <tr key={rowIndex} className="border-b">
                  {row.map((cell: any, cellIndex: any) => (
                    <td key={cellIndex} className="py-2 px-4">
                      {typeof cell === 'number'
                        ? cell.toFixed(2)
                        : cell !== null
                        ? cell
                        : '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center p-4 bg-gray-100">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={currentPage === 1}
            onClick={() => goToPage(currentPage - 1)}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
            disabled={currentPage === totalPages}
            onClick={() => goToPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
