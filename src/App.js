import React, { useEffect, useState } from "react";
import Header from "./common/Header";
import Table from "./task/Table";
import Loader from "./common/Loader";
function App() {
  const [transactionsData, setTransactions] = useState([]);
  const fetchHoldings = async () => {
    let data = await fetch(
      "https://canopy-frontend-task.now.sh/api/transactions"
    );
    let { transactions } = await data.json();
    setTransactions(transactions);
  };

  useEffect(() => {
    fetchHoldings();
  }, []);

  if (!transactionsData.length) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Header />
      <Table transactions={transactionsData} />
    </div>
  );
}

export default App;
