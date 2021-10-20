import React, { useContext, useState } from "react";
import transContext from "../context/trans/transContext";

const AddTrans = (props) => {
  const context = useContext(transContext);
  const { addTrans , getBalance} = context;
  const [trans, setTrans] = useState({ title: "", amount: "", type: ""});

  // Sending date rtsf
  let currentdate = new Date();
  let datetime =
  currentdate.getDate() +
  "/" +
  (currentdate.getMonth() + 1) +
  "/" +
  currentdate.getFullYear() +
  " @ " +
  currentdate.getHours() +
  ":" +
  currentdate.getMinutes() +
  ":" +
  currentdate.getSeconds();
  const [date, setDate] = useState(datetime)



  const onChange = (e) => {
    setTrans({ ...trans, [e.target.name]: e.target.value });
  };


  const [checkDeposit, setCheckDeposit] = useState(false)
  const checkForDeposit = () =>{
    setCheckDeposit(true);
    setCheckWithdraw(false);
  }
  const [checkWithdraw, setCheckWithdraw] = useState(false)
  const checkForWithdraw = () =>{
    setCheckWithdraw(true);
    setCheckDeposit(false);
  }

  const handleClick = (e) => {
    e.preventDefault();
    setDate(datetime);
    addTrans(trans.title, trans.amount, trans.type, date);
    getBalance();
    setTrans({ title: "", amount: "", type: "" });
    setCheckDeposit(false);
    setCheckWithdraw(false);
  };

  return (
    <div  >
      <h2 className="my-6">Add Transaction</h2>
      <form className="my-5">
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Enter Title:
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            name="title"
            aria-describedby="emailHelp"
            value={trans.title}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Enter Amount:
          </label>
          <input
            type="number"
            className="form-control"
            id="amount"
            name="amount"
            value={trans.amount}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Enter Type:
          </label>
          <div style={{ display: "flex" }}>
            <div>
              <input checked={checkDeposit} type="radio" id="deposit" name="type" value={"deposit"} onChange={onChange} onClick={checkForDeposit}  />
              <label className="mx-1" htmlFor="html">
                Deposit
              </label>
            </div>
            <div className="mx-3">
              <input checked={checkWithdraw}  type="radio" id="withdraw" name="type" value={"withdraw"} onChange={onChange} onClick={checkForWithdraw} />
              <label className="mx-1" htmlFor="css">
                Withdraw
              </label>
            </div>
            <br />
          </div>
        </div>
        <button disabled={trans.title==="" && trans.amount===0 && trans.type===""} type="submit" className="btn btn-primary" onClick={handleClick}>
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default AddTrans;
