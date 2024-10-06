import { createContext, useState } from 'react';

interface Transaction {
  date: string;
  category: string;
  amount: number;
  description: string;
}

interface TransactionContextValue {
  transactions: Transaction[];
  addTransaction: (transaction: Transaction) => void;
}

interface TransactionProviderProps {
  children: React.ReactNode;
}

const TransactionContext = createContext<TransactionContextValue>({
  transactions: [],
  addTransaction: () => {},
});

const TransactionProvider: React.FC<TransactionProviderProps> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (transaction: Transaction) => {
    setTransactions((prevTransactions) => [...prevTransactions, transaction]);
  };

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export { TransactionProvider, TransactionContext };