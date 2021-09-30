import React, { useState } from "react";

function NewExpenseForm() {
  const [name, setname] = useState("");
  const [budget, setbudget] = useState(0);
  const [spent, setspent] = useState(0);
  const url = "http://msibu.herokuapp.com";

  function handleSubmit2() {
    const msibuAuth = localStorage.getItem("msibu-auth");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "msibu-auth": msibuAuth },
      body: JSON.stringify({ name, budget, spent }),
    };
    fetch(`${url}/budget/createExpense`, requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.reload(false));
  }

  return (
    <div>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(event) => {
          setname(event.target.value);
        }}
      ></input>
      <label htmlFor="budget">Budget</label>
      <input
        type="number"
        id="budget"
        name="budget"
        value={budget}
        onChange={(event) => {
          setbudget(event.target.value);
        }}
      ></input>
      <label htmlFor="spent">Spent</label>
      <input
        type="number"
        id="spent"
        name="spent"
        value={spent}
        onChange={(event) => {
          setspent(event.target.value);
        }}
      ></input>
      <input
        type="button"
        className="btn"
        value="New Expense"
        onClick={() => {
          handleSubmit2();
        }}
      />
    </div>
  );
}

export default NewExpenseForm;
