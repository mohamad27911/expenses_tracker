import { useContext } from 'react';
import Card from './Components/Card';
import Form from './Components/Form';
import Table from './Components/Table';
import { TransactionContext, TransactionProvider } from './context/TransactionContext';
import { useTransactionTotals } from './context/useTransactionTotals '; 
import './index.css';
import Registration from './pages/Registration';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const { transactions } = useContext(TransactionContext); 
  const { totalIncome, totalExpense, balance } = useTransactionTotals(transactions);
  const val =totalIncome-totalExpense
  return (
    <div className='mx-16'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6 m-auto">
        <Card isProg={false} title="Total Income" value={totalIncome} />
        <Card isProg={false} title="Total Expenses" value={totalExpense} />
        <Card isProg={false} title="Remaining Balance" value={balance} />
        <Card isProg={true} title="Saving Goal" value={val}  />
      </div>
      <Table />
      <Form />
    </div>
  );
}

const AppWithProvider = () => {
  return (
    <TransactionProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<App />} /> 
          <Route path="/" element={<Registration />} /> 
        </Routes>
      </Router>
    </TransactionProvider>
  );
}


export default AppWithProvider;
