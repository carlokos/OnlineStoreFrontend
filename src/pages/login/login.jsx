import React, { useState } from "react"
import { Link } from "react-router-dom"
import UserService from "../../services/userService";
import AlertMessageComponent from "../../components/AlertMessageComponent/AlertMessageComponent";
import { useNavigate } from 'react-router-dom';
import { asignCartToCurrentUser } from "../../components/cart/CartLogic";

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('Default message');
    const [severity, setSeverity] = useState('info');

    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await UserService.login(email, password);

            if (response.status === 200) {
                console.log("dentro");
                const token = response.data.accessToken;
                localStorage.setItem("token", token);

                const userRoles = await UserService.loadUserRoles(response.data.accessToken);
                console.log(userRoles);
                localStorage.setItem('roles', JSON.stringify(userRoles));
                await asignCartToCurrentUser();

                setMessage("Login successfully");
                setSeverity("success");
                setShowAlert(true);

                navigate('/');
                window.location.reload();
            }
        } catch (error) {
            console.error('Error during login:', error);

            setMessage("Email or password incorrect");
            setSeverity("error");
            setShowAlert(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin();
    }

    return (
        <div className="login template d-flex justify-content-center align-items-center vw-100 vh-100 bg-primary">
            <div>
                <AlertMessageComponent message={message} severity={severity} open={showAlert} onClose={() => setShowAlert(false)} />
            </div>

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
                        <input type="checkbox" className="custom-control custom-checkbox" id="check" />
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
