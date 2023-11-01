import React, { useState } from "react"
import { Link } from "react-router-dom"
import UserService from "../../services/userService";
import AlertMessageComponent from "../../components/AlertMessageComponent/AlertMessageComponent";

function SignUp(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [subname, setSubname] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('Default message');
    const [severity, setSeverity] = useState('info');

    const buildMessage = (severity, msg) => {
        setSeverity(severity);
        setMessage(msg);
        setShowAlert(true);
    }
    const handleSignup= async () => {
        try{
            if(email !== '' && password !== '' && name !== '' && subname !== ''){
                const response = await UserService.signup(name, subname, email, password);
                if(response.status === 200){
                    buildMessage("success", "User register succesfully");
                }
            } else{
                buildMessage("error", "please, fill out all fields");
            }
        }catch(error){
            buildMessage("error", "Email already taken");
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        await handleSignup();
    }

    return(
        <div className="signup template d-flex justify-content-center align-items-center vw-100 vh-100 bg-primary">
            <div>
                <AlertMessageComponent message={message} severity={severity} open={showAlert} onClose={() => setShowAlert(false)}/>
            </div>

            <div className="form_container p-5 rounded b bg-white">
                <form>
                    <h3 className="text-center">Sign Up</h3>
                    <div className="mb-2">
                        <label htmlFor="fname">Fist Name</label>
                        <input type="text" placeholder="Enter first name" className="form-control" value={name}
                        onChange={(e) => setName(e.target.value)}></input>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" placeholder="Enter last name" className="form-control" value={subname}
                        onChange={(e) => setSubname(e.target.value)}></input>
                    </div>
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
                    <div className="d-grid">
                        <button className="btn btn-primary" onClick={handleSubmit}>Sign up</button>
                    </div>
                    <p className="text-end mt-2">
                        Already register <Link className="ms-2 link-dark" to={"/login"}>Sign-in</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default SignUp;