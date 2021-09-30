import React, { useState } from "react";
import "./App.css";
import BudgetTable from "./components/BudgetTable/BudgetTable";
import NewExpenseForm from "./components/NewExpenseForm/NewExpenseForm";
import NewBillForm from "./components/NewBillForm/NewBillForm";
import BillTable from "./components/BillTable/BillTable";

function App() {
  const [password, setpassword] = useState("");
  const url = "http://msibu.herokuapp.com";

  function submitPassword() {
    if (!password) return;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    };
    fetch(`${url}/validate`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("msibu-auth", password);
        }

        window.location.reload(false);
      });
  }

  return (
    <div className="App">
      <h1>Simple Budget</h1>
      {localStorage.getItem("msibu-auth") ? (
        <div className="Content">
          <BudgetTable />
          <h1>Bills</h1>
          <BillTable />
          <h1>New Bill</h1>
          <NewBillForm />
          <h1>New Expense</h1>
          <NewExpenseForm />
        </div>
      ) : (
        <div>
          <input
            type="text"
            onChange={(event) => setpassword(event.target.value)}
            value={password}
          />
          <button onClick={() => submitPassword()}>SUBMIT VALUE</button>
        </div>
      )}
    </div>
  );
}

export default App;
