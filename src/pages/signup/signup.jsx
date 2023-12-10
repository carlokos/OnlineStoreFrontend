import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import UserService from "../../services/userService";
import AlertMessageComponent from "../../components/AlertMessageComponent/AlertMessageComponent";
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [subname, setSubname] = useState('');

    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState('Default message');
    const [severity, setSeverity] = useState('info');
    const [emailError, setEmailError] = useState(false);

    const buildMessage = (severity, msg) => {
        setSeverity(severity);
        setMessage(msg);
        setShowAlert(true);
    }

    const validateEmail = (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value);
    };

    const handleEmailChange = (e) => {
        const inputValue = e.target.value;
        setEmail(inputValue);
        setEmailError(!validateEmail(inputValue));
    };

    const handleSignup = async () => {
        try {
            if (email !== '' && password !== '' && name !== '' && subname !== '') {
                const response = await UserService.signup(name, subname, email, password);
                if (response.status === 200) {
                    buildMessage("success", "User register successfully");
                }
            } else {
                buildMessage("error", "Please, fill out all fields");
            }
        } catch (error) {
            buildMessage("error", "Email already taken");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateEmail(email)) {
            await handleSignup();
        } else {
            buildMessage("error", "Invalid email format");
        }
    };

    return (
        <div className="signup template d-flex justify-content-center align-items-center vw-100 vh-100">
            <div>
                <AlertMessageComponent message={message} severity={severity} open={showAlert} onClose={() => setShowAlert(false)} />
            </div>

            <div className="form_container p-5 rounded b bg-white">
                <form>
                    <h3 className="text-center">Sign Up</h3>
                    <div className="mb-2">
                        <TextField
                            type="text"
                            label="First Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <TextField
                            type="text"
                            label="Last Name"
                            variant="outlined"
                            fullWidth
                            value={subname}
                            onChange={(e) => setSubname(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <TextField
                            type="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={handleEmailChange}
                            error={emailError}
                            helperText={emailError ? "Invalid email format" : ""}
                        />
                    </div>
                    <div className="mb-2">
                        <TextField
                            type="password"
                            label="Password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="d-grid">
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Sign up <PersonAddAltIcon/>
                        </Button>
                    </div>
                    <p className="text-end mt-2">
                        Already registered? <Link className="ms-2 link-dark" to={"/login"}>Sign-in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default SignUp;
