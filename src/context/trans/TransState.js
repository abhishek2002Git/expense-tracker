import TransContext from "./transContext";
import { useState } from "react";

const TransState = (props) => {
  const host = "https://backendexpen.herokuapp.com"

    const transInitial = []

      const [trans, setTrans] = useState(transInitial)
      const [balance, setBalance] = useState(0)

      // Get all trans 
      const getTrans = async (title, amount, type) =>{
        const response = await fetch(`${host}/api/trans/fetchalltrans`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          } 
        });
        const json = await response.json()
        setTrans(json);
        getBalance();


      }


      // Get available balance 
      const getBalance = async (title, amount, type) =>{
        const response = await fetch(`${host}/api/trans/balance`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          } 
        });
        const json = await response.json()
        setBalance(json);


      }

      
      const [userData, setUserData] = useState([])
       // Get user data 
       const getData = async () =>{
        const response = await fetch(`${host}/api/auth/getuser`, {
          method: 'POST',
          headers: {
            'auth-token': localStorage.getItem('token')
          } 
        });
        const json = await response.json()
        setUserData(json)
      }

      // Add a note
      const addTrans = async (title, amount, type, date) =>{
        const response = await fetch(`${host}/api/trans/addtrans`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, amount, type, date}) 
          
        });
        const tran = await response.json()
        setTrans(trans.concat(tran))
        getBalance();
       
      }

      // Delete a note
      const deleteTrans = async (id) =>{
        const response = await fetch(`${host}/api/trans/deletetrans/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          }
        });
        const json = response.json();
        console.log(json)

        const newTrans = trans.filter((tran)=>{return tran._id!==id})
        setTrans(newTrans);
        getBalance()
      }

      // Edit a note
      const editTrans = async (id, title, amount, type) =>{

        const response = await fetch(`${host}/api/trans/updatetrans/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': localStorage.getItem('token')
          },
          body: JSON.stringify({title, amount, type}) 
        });
        const json = await response.json();
        console.log(json)
          
        let newTrans = JSON.parse(JSON.stringify(trans))
        for (let index = 0; index < newTrans.length; index++) {
          const element = newTrans[index];
          if (element._id === id) {
            newTrans[index].title = title;
            newTrans[index].amount = amount;
            newTrans[index].type = type;
            break;
          }
        }
        setTrans(newTrans);
        getBalance();
      }
    
    return (
        <TransContext.Provider value={{host, trans, addTrans, deleteTrans, editTrans, getTrans, getData, userData, balance, getBalance}}>
            {props.children}
        </TransContext.Provider>

    )
}

// So, you can use the functions, variables and states of NoteState.js in any component by importing 'noteContext.js'

export default TransState;