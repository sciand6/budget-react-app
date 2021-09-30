import React, { useState } from "react";

function NewBillForm() {
  const [name, setname] = useState("");
  const [lastpaid, setlastpaid] = useState("");
  const url = "http://msibu.herokuapp.com";

  function handleBillSubmit() {
    if (!name) return;
    if (!lastpaid) return;
    const msibuAuth = localStorage.getItem("msibu-auth");
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", "msibu-auth": msibuAuth },
      body: JSON.stringify({ name, lastPaid: lastpaid }),
    };
    fetch(`${url}/bills/createBill`, requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.reload(false));
  }

  return (
    <div>
      <label htmlFor="name">Bill Name</label>
      <input
        type="text"
        id="name"
        name="name"
        value={name}
        onChange={(e) => setname(e.target.value)}
      ></input>
      <label htmlFor="lastPaid">Last Paid</label>
      <input
        type="text"
        id="lastPaid"
        name="lastPaid"
        value={lastpaid}
        onChange={(e) => setlastpaid(e.target.value)}
      ></input>
      <input
        type="button"
        className="btn"
        value="New BIll"
        onClick={() => {
          handleBillSubmit();
        }}
      />
    </div>
  );
}

export default NewBillForm;
