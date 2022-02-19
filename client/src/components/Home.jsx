/* eslint-disable jsx-a11y/anchor-is-valid */
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import './Home.css'
import Budget from './Budget.jsx';

import Spinner from "react-activity/dist/Spinner";
import "react-activity/dist/Spinner.css";


function Home() {
  // APIS //
  const GETALL_API = 'http://localhost:5000/budget/getAll';
  const ADD_API = 'http://localhost:5000/budget/add';
  const DELETE_API = 'http://localhost:5000/budget/delete';
  
  // STATES //
  const [expenseItems, setExpenseItems] = useState([])
  const [incomeItems, setIncomeItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [income, setIncome] = useState(0)
  const [budget, setBudget] = useState(0)

  // LOGOUT //
  const logout = () => {
    localStorage.removeItem('budget-app-user');
    window.location.href='/login'
  }

  const getData = () => {
    const accesstoken = localStorage.getItem('budget-app-accesstoken') ;
    fetch(GETALL_API, {
      method: 'GET',
      headers: {
        accesstoken: accesstoken
      }
    })
    .then((res) => res.json())
    .then((json) => {
      let updatedExpenses = []
      let updatedIncomes = []
      json['items'].forEach((element) => {
        if(element['category'][0] === 'e') {
          updatedExpenses.push(element);
        }
        else {
          updatedIncomes.push(element);
        }
      });
      setIncomeItems(updatedIncomes)
      setExpenseItems(updatedExpenses)
      setLoading(false)
    })
  }

  // add-item
  const addItem = (event) => {
    event.preventDefault()
    const accesstoken = localStorage.getItem('budget-app-accesstoken');
    console.log(accesstoken)
    axios.post(ADD_API, {
      "category" : event.target[0].value,
      "desc" : event.target[1].value,
      "amount" : event.target[2].value
    }, {
      method: 'POST',
      headers: {
        accesstoken: accesstoken,
      },

    })
    .then((response) => {
        if(response.status === 200) {
          console.log(response)
          getData()
        }
    })
    .catch((err) => {
        console.log(err);
    })
  }

  // delete-item
  const deleteItem = (_id) => {
    console.log(_id);
    const accesstoken = localStorage.getItem('budget-app-accesstoken') ;
    console.log(accesstoken);
    axios.post(DELETE_API, null, {
      method: 'POST',
      headers: {
        accesstoken: accesstoken,
        _id: _id
      }
    })
    .then(res => {
      if(res.status === 200) {
        getData();
      }
    })
    .catch(err => console.log("catch block", err))
  }

  // USEEFFECT //
  useEffect(() => {
    if(!localStorage.getItem('budget-app-accesstoken')) {
      window.location.href='/login';
    }
    getData();
  }, [])

  useEffect(() => {
    let newIn = 0, newEx = 0;
      for(let i = 0; i < incomeItems.length; i++) {
        newIn += incomeItems[i].amount
      }
      for(let i = 0; i < expenseItems.length; i++) {
        newEx += expenseItems[i].amount
      }
      setIncome(newIn)
      setBudget(newIn - newEx);
  }, [incomeItems, expenseItems])

  return (
  <div>
      
      {/* navbar */}
      <nav className='navbar navbar-expand-lg'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/ '>
            Budget Tracker
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse ' id='navbarSupportedContent'>
            <ul className='navbar-nav ms-auto mb-2 mb-lg-0'>
              <li className='nav-item'>
                <a className='nav-link' onClick={() => {logout()}}>
                  LOGOUT
                </a> 
              </li> 
            </ul>
          </div>
        </div>
      </nav>

      {/* body */}
      <div id='body'>

              {/* head */}
              <div id='head'>
                <h1><span className='h2'> INCOME </span>: <u>{income}</u></h1>
                <h5>Available budget..</h5>
                <h2>{budget}.00</h2>
              </div>

              {/* lists */}
              <div id='form'>
                <form onSubmit={(event) => {addItem(event)}} className='d-flex justify-content-evenly'>
                  <select id="category" name="category" className='my-auto'>
                    <option value="expense">expense</option>
                    <option value="income">income</option>
                  </select> 
                  <input type="text" class="form-control my-auto" placeholder="Add description" name='desc' />
                  <input type="number" class="my-auto" placeholder="Value" name='amount' />
                  <input type="submit" value="ADD" className='btn btn-info my-auto'/>
                </form>
              </div>
              {loading? 
                <div id='lists' className='d-flex'>
                  <div id='income' className='col-6'>
                      <div className='list-head'>INCOME</div>
                      <div className="">
                        <Spinner
                        size={28}
                        color='blue' />
                      </div>
                  </div>
                  <div id='expenses' className='col-6'>
                      <div className='list-head'>EXPENSES</div>
                      <div className="">
                      <Spinner
                      size={28}
                      color='blue' />
                    </div>
                  </div>
                </div>
              :
                <Budget 
                  loading={loading}
                  expenseItems={expenseItems}
                  incomeItems={incomeItems}
                  deleteItem={deleteItem}
                />
              }
      </div>
    </div>
  );
}

export default Home