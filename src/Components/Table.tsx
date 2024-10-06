import { useState } from "react";

interface PropsType {
  expense: boolean;
}

function Table(props: PropsType) {
  const [totalIncome, setTotalIncome] = useState<number>(0);

  const tableData = [
    { date: "day/month/year", category: "income/expense", description: "..." },
    { date: "day/month/year", category: "income/expense", description: "..." },
    { date: "day/month/year", category: "income/expense", description: "..." },
  
  ];

  return (
    <div className="relative overflow-x-auto max-h-[50vh] shadow-md sm:rounded-lg mx-6">
    <table className="w-full text-sm text-left rtl:text-right text-blue-100">
      <thead className="text-white uppercase bg-text-light text-center sticky top-0 z-10">
          <tr>
            <th scope="col" className="px-6 py-3">
              Date
            </th>
            <th scope="col" className="px-6 py-3 bg-opacity-90">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="text-center">
          {tableData.map((row, index) => (
            <tr key={index} className="bg-secondary">
              <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap">
                {row.date}
              </th>
              <td className="px-6 py-4">{row.category}</td>
              <td className={`px-6 py-4 ${props.expense ? "text-expense" : "text-income"}`}>
                {props.expense ? "-" : "+"}
                <span>${totalIncome}</span>
              </td>
              <td className="px-6 py-4">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
