'use client'
import React from "react";

const Table = () => {
  // New data format
  const data = [
    [
      "SAR'000",
      "FY20A",
      "FY21A",
      "FY22A",
      "FY23A",
      "FY24F",
      "FY25F",
      "FY26F",
      "FY27F",
    ],
    ["GMV (Gross Merchandise Value)", 375, 4430, 9482, 39977, 85090, 167334, 262835, null],
    ["Commercial Costs", -340, -4165, -8348, -35522, -74880, -147254, -231295, null],
    ["Revenue - Take rate", 35, 265, 1133, 4455, 10211, 20080, 31540, null],
    ["Direct Costs", -170, -914, -1485, -2507, -5270, -9040, -13068, null],
    ["InDirect Costs", -270, -914, -1485, -2507, -5270, -9040, -13068, null],
  ];

  // Extract column headers and rows
  const columns = data[0];
  const rows = data.slice(1);

  return (
    <div className="w-full p-4">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow">
        {/* Header */}
        <div className="bg-blue-500 text-white font-bold text-lg p-4 rounded-t-lg">
          INCOME STATEMENT
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left -collapse">
            {/* Table Head */}
            <thead className="bg-blue-100 text-sm uppercase">
              <tr>
                {columns.map((col: any, index: number) => (
                  <th key={index} className="py-2 px-4">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {rows.map((row: any, rowIndex: number) => (
                <tr key={rowIndex} className="border-b">
                  {row.map((cell: any, cellIndex: number) => (
                    <td key={cellIndex} className="py-2 px-4">
                      {cell !== null ? cell : "-"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
