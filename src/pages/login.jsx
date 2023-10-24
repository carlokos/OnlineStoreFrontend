import React, { useState } from "react"
import { Link } from "react-router-dom"
import './login.css'
import UserService from "../services/userService";

function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async => {
        try{
            const response = UserService.login(email, password);
            console.log("email: " + email);
            console.log("password: " + password);
            console.log(response.data);
        }catch(error){
            console.error('Cannot log in correctly', error.message);
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await handleLogin();
    }

    return(
        <div className="login template d-flex justify-content-center align-items-center vw-100 vh-100 bg-primary">
            <div className="form_container p-5 rounded b bg-white">
                <form>
                    <h3 className="text-center">Sign In</h3>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter email" className="form-control" value={email} 
                         onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter password" className="form-control" value={password}
                        onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    <div className="mb-2">
                        <input type="checkbox" className="custom-control custom-checkbox" id="check"/>
                        <label htmlFor="check" className="custom-input-label ms-2">
                            Remember me
                        </label>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary" onClick={handleSubmit}>Sign in</button>
                    </div>
                    <p className="text-end mt-2">
                        Forgot <Link className="update-pw link-dark" to={"/"} >Password</Link> <Link className="ms-2 link-dark" to={"/signup"}>Sign-up</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login;
