'use client'
import React from "react";

const Table = () => {
    const x = 1;

    return (
        <>
           <div className="w-full p-4">
        <div className="max-w-7xl mx-auto bg-white  rounded-lg shadow">
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
                  <th className="py-2 px-4 ">SAR'000</th>
                  <th className="py-2 px-4 ">FY20A</th>
                  <th className="py-2 px-4 ">FY21A</th>
                  <th className="py-2 px-4 ">FY22A</th>
                  <th className="py-2 px-4 ">FY23A</th>
                  <th className="py-2 px-4 ">FY24F</th>
                  <th className="py-2 px-4 ">FY25F</th>
                  <th className="py-2 px-4 ">FY26F</th>
                  <th className="py-2 px-4 ">FY27F</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {/* GMV Section */}
                <tr>
                  <td className="py-2 px-4 font-bold text-left text-[14px] leading-[20px]"
                  style={{ color: 'rgba(23, 90, 228, 1)' }}>

                    GMV (Gross Merchandise Value)
                  </td>

                  <td className="py-2 px-4 ">375</td>
                  <td className="py-2 px-4 ">4430</td>
                  <td className="py-2 px-4 ">9482</td>
                  <td className="py-2 px-4 ">39977</td>
                  <td className="py-2 px-4 ">85090</td>
                  <td className="py-2 px-4 ">167334</td>
                  <td className="py-2 px-4 ">262835</td>
                </tr>
                
                <tr className="border-b"> 
               <td className="py-2 px-4 text-[14px] leading-[20px] font-normal text-black text-left">
                    Commercial Costs
                  </td>
                  <td className="py-2 px-4 ">-340</td>
                  <td className="py-2 px-4 ">-4165</td>
                  <td className="py-2 px-4 ">-8348</td>
                  <td className="py-2 px-4 ">-35522</td>
                  <td className="py-2 px-4 ">-74880</td>
                  <td className="py-2 px-4 ">-147254</td>
                  <td className="py-2 px-4 ">-231295</td>
                </tr>



                {/* Revenue Section */}
                <tr>
                  <td className="py-2 px-4  font-semibold">
                    Revenue - Take rate
                  </td>
                  <td className="py-2 px-4 ">35</td>
                  <td className="py-2 px-4 ">265</td>
                  <td className="py-2 px-4 ">1133</td>
                  <td className="py-2 px-4 ">4455</td>
                  <td className="py-2 px-4 ">10211</td>
                  <td className="py-2 px-4 ">20080</td>
                  <td className="py-2 px-4 ">31540</td>
                </tr>
                <tr>
                  <td className="py-2 px-4  text-gray-500">
                    Direct Costs
                  </td>
                  <td className="py-2 px-4 ">-170</td>
                  <td className="py-2 px-4 ">-914</td>
                  <td className="py-2 px-4 ">-1485</td>
                  <td className="py-2 px-4 ">-2507</td>
                  <td className="py-2 px-4 ">-5270</td>
                  <td className="py-2 px-4 ">-9040</td>
                  <td className="py-2 px-4 ">-13068</td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </div>
        </>
    );
};

export default Table;
