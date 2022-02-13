import axios from 'axios';
import React from 'react';
import './Home.css'
export default function Budget(props) {



  return (
    <>
    <div id='lists' className='d-flex'>
        <div id='income' className='col-6'>
            <div className='list-head'>INCOME</div>
            {props.incomeItems.map((item) => (
                <div className='list-item d-flex align-items-center'>
                    <p>{item.desc}</p>
                    <div className='d-flex align-items-center'>
                        <p>+ {item.amount}.00</p>
                        <i onClick={() => {props.deleteItem(item._id)}} class="far fa-times-circle"></i>
                    </div>
                </div>
            ))}
        </div>
        <div id='expenses' className='col-6'>
            <div className='list-head'>EXPENSES</div>
            {props.expenseItems.map((item) => (
                <div className='list-item d-flex align-items-center'>
                    <p>{item.desc}</p>
                    <div className='d-flex align-items-center'>
                        <p>- {item.amount}.00</p>
                        <i onClick={() => {props.deleteItem(item._id)}} class="far fa-times-circle"></i>
                    </div>
                </div>
            ))}
        </div>
    </div>
    </>
  );
}
