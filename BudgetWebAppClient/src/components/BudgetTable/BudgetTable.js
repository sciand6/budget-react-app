import React, { useState, useEffect } from "react";
import "./BudgetTable.css";

function BudgetTable() {
  const [shownumberinput, setshownumberinput] = useState(false);
  const [shownameinput, setshownameinput] = useState(false);
  const [expenses, setexpenses] = useState([]);
  const [income, setincome] = useState(1300);
  const [incomeafter, setincomeafter] = useState(0);
  const url = "http://msibu.herokuapp.com";

  useEffect(() => {
    const msibuAuth = localStorage.getItem("msibu-auth");
    const requestOptions = {
      method: "GET",
      headers: { "msibu-auth": msibuAuth },
    };
    fetch(`${url}/budget/getExpenses`, requestOptions)
      .then((res) => res.json())
      .then(
        (result) => {
          setexpenses(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  function handleSubmit(expenseId, newSpent) {
    if (!newSpent) return;
    newSpent = eval(newSpent);
    const msibuAuth = localStorage.getItem("msibu-auth");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", "msibu-auth": msibuAuth },
      body: JSON.stringify({ spent: newSpent }),
    };
    fetch(`${url}/budget/editExpenseSpent/${expenseId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.reload(false));
  }

  function handleNameSubmit(expenseId, newName) {
    if (!newName) return;
    const msibuAuth = localStorage.getItem("msibu-auth");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", "msibu-auth": msibuAuth },
      body: JSON.stringify({ name: newName }),
    };
    fetch(`${url}/budget/editExpenseName/${expenseId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.reload(false));
  }

  function handleDelete(expenseId) {
    const msibuAuth = localStorage.getItem("msibu-auth");
    const requestOptions = {
      method: "DELETE",
      headers: { "msibu-auth": msibuAuth },
    };
    fetch(`${url}/budget/deleteExpense/${expenseId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.reload(false));
  }

  useEffect(() => {
    setincomeafter(expenses.reduce((a, b) => a + (b["spent"] || 0), 0));
  }, [expenses]);

  function handleReset() {
    fetch(`${url}/budget/resetExpenses`);
    window.location.reload();
  }

  return (
    <div className="parent">
      <div className="income">
        <div className={income < incomeafter ? "red" : "green"}>
          ${incomeafter}/${income}
        </div>
        <h2>Money Left</h2>
        <div className={income < incomeafter ? "red" : "green"}>
          ${income - incomeafter}
        </div>
      </div>
      <div>
        <input
          type="button"
          className="btn"
          value="Reset"
          onClick={() => {
            handleReset();
          }}
        />
      </div>
      <div className="container">
        {expenses.map((expense) => {
          if (expense.spent <= expense.budget) {
            return (
              <div key={expense._id} className="green-item">
                <span>
                  <span
                    name="delete"
                    className="red"
                    id="delete"
                    value="Delete"
                    onClick={() => handleDelete(expense._id)}
                  >
                    x
                  </span>{" "}
                  {shownameinput ? (
                    <input
                      type="text"
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          handleNameSubmit(expense._id, e.target.value);
                          setshownameinput(false);
                        }
                      }}
                    ></input>
                  ) : (
                    <span onClick={() => setshownameinput(true)}>
                      {expense.name}
                    </span>
                  )}
                </span>
                {shownumberinput ? (
                  <div>
                    <input
                      type="text"
                      className="numInput"
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          handleSubmit(expense._id, e.target.value);
                          setshownumberinput(false);
                        }
                      }}
                    ></input>
                    /{expense.budget}
                  </div>
                ) : (
                  <div onClick={() => setshownumberinput(true)}>
                    {expense.spent}/{expense.budget}
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <div key={expense._id} className="red-item">
                <span>
                  <span
                    name="delete"
                    className="red"
                    id="delete"
                    value="Delete"
                    onClick={() => handleDelete(expense._id)}
                  >
                    X
                  </span>{" "}
                  {shownameinput ? (
                    <input
                      type="text"
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          handleNameSubmit(expense._id, e.target.value);
                          setshownameinput(false);
                        }
                      }}
                    ></input>
                  ) : (
                    <span onClick={() => setshownameinput(true)}>
                      {expense.name}
                    </span>
                  )}
                </span>
                {shownumberinput ? (
                  <div>
                    <input
                      type="text"
                      className="numInput"
                      onKeyUp={(e) => {
                        if (e.key === "Enter") {
                          handleSubmit(expense._id, e.target.value);
                          setshownumberinput(false);
                        }
                      }}
                    ></input>
                    /{expense.budget}
                  </div>
                ) : (
                  <div onClick={() => setshownumberinput(true)}>
                    {expense.spent}/{expense.budget}
                  </div>
                )}
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}

export default BudgetTable;
