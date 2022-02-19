import React from 'react';
import './styles.css';
import axios from 'axios';

function Login() {
    const LOGIN_API = 'http://localhost:5000/auth/login';
    const handleSubmit = async (event) => {
        event.preventDefault()
        const username = event.target[0].value;
        const password = event.target[1].value;
        axios.post(LOGIN_API , {
            "username" : username,
            "password" : password,
        })
        .then((response) => {
            if(response.status === 200) {
                console.log("initial accesstoken", response.data.accesstoken)
                localStorage.setItem('budget-app-accesstoken', response.data.accesstoken);
                window.location.href='/';
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    return (
        <div id='page'>  
            <div className='title'>Budget Tracker</div>
            <div className='center-box'>
                <div className='topBar d-flex'>
                    <a href="login" className='active disabled'>LOGIN</a>
                    <div className='vl'></div>
                    <a href="register" >REGISTER</a>
                </div>
                <form className='form' onSubmit={(event) => handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="exampleInputText1">Username</label>
                        <input type="text" className="form-control" placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" placeholder="Enter password" />
                    </div>
                    <div className="submit-btn">
                        <input type="submit" className='btn btn-info' value="SUBMIT" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;