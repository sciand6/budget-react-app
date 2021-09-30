import React, { useState, useEffect } from "react";

function BillTable() {
  const url = "http://msibu.herokuapp.com";
  const [bills, setbills] = useState([]);
  const [shownameinput, setshownameinput] = useState(false);
  const [showlastpaidinput, setshowlastpaidinput] = useState(false);

  useEffect(() => {
    const msibuAuth = localStorage.getItem("msibu-auth");
    const requestOptions = {
      method: "GET",
      headers: { "msibu-auth": msibuAuth },
    };
    fetch(`${url}/bills/getBills`, requestOptions)
      .then((response) => response.json())
      .then(
        (result) => {
          setbills(result);
        },
        (error) => {
          console.log(error);
        }
      );
  }, []);

  function handleBillDelete(billId) {
    const msibuAuth = localStorage.getItem("msibu-auth");
    const requestOptions = {
      method: "DELETE",
      headers: { "msibu-auth": msibuAuth },
    };
    fetch(`${url}/bills/deleteBill/${billId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.reload(false));
  }

  function handleBillNameSubmit(billId, newName) {
    if (!newName) return;
    const msibuAuth = localStorage.getItem("msibu-auth");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", "msibu-auth": msibuAuth },
      body: JSON.stringify({ name: newName }),
    };
    fetch(`${url}/bills/editBill/${billId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.reload(false));
  }

  function handleBillLastPaidSubmit(billId, newLastPaid) {
    if (!newLastPaid) return;
    const msibuAuth = localStorage.getItem("msibu-auth");
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json", "msibu-auth": msibuAuth },
      body: JSON.stringify({ lastPaid: newLastPaid }),
    };
    fetch(`${url}/bills/editBill/${billId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => window.location.reload(false));
  }

  return (
    <div className="Bills">
      {bills.map((bill) => {
        return (
          <div className="Bill" key={bill._id}>
            {shownameinput ? (
              <input
                type="text"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleBillNameSubmit(bill._id, e.target.value);
                    setshownameinput(false);
                  }
                }}
              ></input>
            ) : (
              <span onClick={() => setshownameinput(true)}>
                <span
                  className="red"
                  onClick={() => handleBillDelete(bill._id)}
                >
                  x
                </span>
                &nbsp;
                {bill.name}
              </span>
            )}
            {showlastpaidinput ? (
              <input
                type="text"
                onKeyUp={(e) => {
                  if (e.key === "Enter") {
                    handleBillLastPaidSubmit(bill._id, e.target.value);
                    setshowlastpaidinput(false);
                  }
                }}
              ></input>
            ) : (
              <span onClick={() => setshowlastpaidinput(true)}>
                {bill.lastPaid}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default BillTable;
