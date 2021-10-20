import React, { useContext, useEffect, useState, useRef } from "react";
import transContext from "../context/trans/transContext";
import { useHistory } from "react-router";

const TransHist = () => {
  const context = useContext(transContext);
  let history = useHistory();
  const { trans, getTrans, deleteTrans, editTrans} = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getTrans();
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [tran, setTran] = useState({
    id: "",
    etitle: "",
    eamount: "",
    etype: "",
  });

  const updateTrans = (currentTran) => {
    ref.current.click();
    setTran({
      id: currentTran._id,
      etitle: currentTran.title,
      eamount: currentTran.amount,
      etype: currentTran.type,
    });
  };

  const handleClick = (e) => {
    editTrans(tran.id, tran.etitle, tran.eamount, tran.etype);
    refClose.current.click();
  };
  const onChange = (e) => {
    setTran({ ...tran, [e.target.name]: e.target.value });
  };


  return (
    <>
      {/* Update modal rtsf */}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content" style={{ borderRadius: "20px" }}>
            <div className="modal-header">
              <input
                style={{
                  fontWeight: "normal",
                  fontSize: "25px",
                  color: "black",
                  textAlign: "center",
                  outline: "none",
                }}
                id="etitle"
                type="text"
                className="form-control border-0"
                name="etitle"
                aria-describedby="emailHelp"
                value={tran.etitle}
                onChange={onChange}
              />
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form>
                <div style={{display:'flex'}} className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Enter Amount:
                  </label>
                  <input
                    type="number"
                    className="form-control border-0"
                    id="eamount"
                    name="eamount"
                    value={tran.eamount}
                    onChange={onChange}
                  />
                  
                </div>
                <div style={{display:'flex'}} className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                    Enter Type:
                  </label>
                  <input
                    type="text"
                    className="form-control border-0"
                    id="etype"
                    name="etype"
                    value={tran.etype}
                    onChange={onChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                style={{ color: "white" }}
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Transaction
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction history table rtsf */}

      <h2 style={{ textAlign: "center" }}>Transaction History</h2>
      <div style={{ display: "flex" }}>
        <h4 style={{ position: "absolute", left: "10%" }}>Title</h4>
        <h4 style={{ position: "absolute", left: "30%" }}>Amount</h4>
        <h4 style={{ position: "absolute", left: "50%" }}>Type</h4>
        <h4 style={{ position: "absolute", left: "65%" }}>Date and Time</h4>
      </div>
      <div style={{ display: "flex", flexDirection: "column-reverse" }}>
        {trans.map((tran) => {
          return (
            <div key={tran._id} style={{ display: "flex", marginTop: "40px" }}>
              <h5 style={{ position: "absolute", left: "10%" }}>
                {tran.title}
              </h5>
              <h5 style={{ position: "absolute", left: "30%" }}>
                {tran.amount}
              </h5>
              <h5 style={{ position: "absolute", left: "50%" }}>{tran.type}</h5>
              <h5 style={{ position: "absolute", left: "65%" }}>{tran.date}</h5>
              {/* <i onClick={()=>{deleteTrans(tran._id)}} className="far fa-trash-alt"></i> */}
              <button
                onClick={() => {
                  deleteTrans(tran._id);
                }}
                style={{
                  position: "absolute",
                  left: "85%",
                  height: "20px",
                  lineHeight: "6px",
                  textAlign: "center",
                }}
                className="btn btn-danger"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  updateTrans(tran);
                }}
                style={{
                  position: "absolute",
                  left: "92%",
                  height: "20px",
                  lineHeight: "6px",
                  textAlign: "center",
                }}
                className="btn btn-success"
              >
                Edit
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TransHist;
