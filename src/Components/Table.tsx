import { useContext } from 'react';
import { TransactionContext } from '../context/TransactionContext';

function Table() {
  // context API: consumer
  const { transactions } = useContext(TransactionContext);
  // recieve the transactions from <Form/> and display it in the table

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
          {transactions.map((row, index) => (
            <tr key={index} className="bg-secondary">
              <th scope="row" className="px-6 py-4 font-medium text-blue-50 whitespace-nowrap">
                {row.date}
              </th>
              <td className="px-6 py-4">{row.category}</td>
              <td className={`px-6 py-4 ${row.category=="expense" ? "text-expense" : "text-income"}`}>
                {row.category=="expense"  ? "-" : "+"}
                <span>${row.amount}</span>
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