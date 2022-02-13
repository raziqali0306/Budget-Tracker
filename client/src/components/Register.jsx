import React from 'react';
import './styles.css';
import axios from 'axios';

function Register() {
    const REGISTER_API = 'http://localhost:5000/auth/register';
    const handleSubmit = async (event) => {
        event.preventDefault()
        const username = event.target[0].value;
        const password = event.target[1].value;
        const email = event.target[2].value;
        axios.post(REGISTER_API , {
            "username" : username,
            "password" : password,
            "email" : email,
        })
        .then((response) => {
            if(response.status === 200) {
                window.location.href='/login';
            }
            else {
                console.log("else block")
                window.alert("Username already exists.!")
            }
        })
        .catch((err) => {
            window.alert("username already choosen!")
            
        })
    }

    return (
        <div id='page'>  
            <div className='title'>Budget Tracker</div>
            <div className='center-box'>
                <div className='topBar d-flex'>
                    <a href="login">LOGIN</a>
                    <div className='vl'></div>
                    <a href="register" className='active disabled'>REGISTER</a>
                </div>
                <form className='form' onSubmit={(event) => handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor="exampleInputText1">Username</label>
                        <input type="text" className="form-control" placeholder="eg.John Doe" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input type="password" className="form-control" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input type="email" className="form-control" placeholder="(Optional)eg.johndoe@yahoo.com" />
                    </div>
                    <div className="submit-btn">
                        <input type="submit" className="btn btn-info" value="SUBMIT"/>
                    </div>
                </form>
            </div>
        </div>
  );
}

export default Register;