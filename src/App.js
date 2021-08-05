import React, { useEffect, useState } from "react";
import Controller from "./common/Controller";
import Header from "./common/Header";
import Loader from "./common/Loader";
import Holdings from "./task/Holdings";
import Transactions from "./task/Transactions";

function App() {
  const [transactionsData, setTransactions] = useState([]);
  const [holdings, setHoldings] = useState([]);
  const [active, setActive] = useState("holdings");

  const fetchTransactions = async () => {
    let data = await fetch(
      "https://canopy-frontend-task.now.sh/api/transactions"
    );
    let { transactions } = await data.json();
    setTransactions(transactions);
  };

  const fetchHoldings = async () => {
    let data = await fetch("https://canopy-frontend-task.now.sh/api/holdings");
    let { payload } = await data.json();
    let holdingsData = payload.filter((holding) => holding.market_price);
    setHoldings(holdingsData);
  };
  <Holdings transactions={holdings} />;

  useEffect(() => {
    fetchHoldings();
    fetchTransactions();
  }, []);

  if (!transactionsData.length && !holdings.length) {
    return <Loader />;
  }

  return (
    <div className="App">
      <Header />
      <Controller setActive={setActive} />
      {active === "holdings" ? (
        <Holdings holdings={holdings} />
      ) : (
        <Transactions transactions={transactionsData} />
      )}
    </div>
  );
}

export default App;
