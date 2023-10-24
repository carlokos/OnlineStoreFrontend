import React from "react"
import { Link } from "react-router-dom"

function SignUp(){
    return(
        <div className="signup template d-flex justify-content-center align-items-center vw-100 vh-100 bg-primary">
            <div className="form_container p-5 rounded b bg-white">
                <form>
                    <h3 className="text-center">Sign Up</h3>
                    <div className="mb-2">
                        <label htmlFor="fname">Fist Name</label>
                        <input type="text" placeholder="Enter first name" className="form-control"></input>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" placeholder="Enter last name" className="form-control"></input>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder="Enter email" className="form-control"></input>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="password">Password</label>
                        <input type="password" placeholder="Enter password" className="form-control"></input>
                    </div>
                    <div className="d-grid">
                        <button className="btn btn-primary">Sign up</button>
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