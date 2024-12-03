'use client'
import React from "react";

const Table = () => {
  // Dummy data
  const data = [
    {
      "SAR'000": "GMV (Gross Merchandise Value)",
      FY20A: 375,
      FY21A: 4430,
      FY22A: 9482,
      FY23A: 39977,
      FY24F: 85090,
      FY25F: 167334,
      FY26F: 262835,
      FY27F: null,
    },
    {
      "SAR'000": "Commercial Costs",
      FY20A: -340,
      FY21A: -4165,
      FY22A: -8348,
      FY23A: -35522,
      FY24F: -74880,
      FY25F: -147254,
      FY26F: -231295,
      FY27F: null,
    },
    {
      "SAR'000": "Revenue - Take rate",
      FY20A: 35,
      FY21A: 265,
      FY22A: 1133,
      FY23A: 4455,
      FY24F: 10211,
      FY25F: 20080,
      FY26F: 31540,
      FY27F: null,
    },
    {
      "SAR'000": "Direct Costs",
      FY20A: -170,
      FY21A: -914,
      FY22A: -1485,
      FY23A: -2507,
      FY24F: -5270,
      FY25F: -9040,
      FY26F: -13068,
      FY27F: null,
    },
  ];

  // Extract column headers
  const columns = Object.keys(data[0]);

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
                {columns.map((col: any) => (
                  <th key={col} className="py-2 px-4">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {data.map((row: any, index: number) => (
                <tr key={index} className="border-b">
                  {columns.map((col) => (
                    <td key={col} className="py-2 px-4">
                      {row[col] !== null ? row[col] : "-"}
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
