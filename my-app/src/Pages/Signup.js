import "../Css/Login.css";
import { useState, useContext } from 'react';
import { signupAction } from "../Tools/actions";
import {toast} from 'react-toastify';
import { useNavigate } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
const Signup = () => {
    const [username, setUsername] = useState(0);
    const [password, setPassword] = useState(0);
    //toast.configure();
    const navigate = useNavigate();
    async function signupForm(username, password) {
        var jsonData = {
            "data": [{
                "username": username,
                "password": password
            }]
        }

        const a = await signupAction(jsonData);
        console.log(a);
        // if(a==='User added Successfully'){
        //     toast.success('User added Successfully',
        // {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        // navigate("../Login");
        // }else if(a==="Please Enter Your Username"){
        //     toast.warning('Please Enter Your Username',
        //     {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        //  }else if(a==="Specify a password"){
        //     toast.warning('Specify a password',
        //     {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        // }else if(a==="Your password's length should be at least 8 characters."){
        //     toast.warning('Your password\'s length should be at least 8 characters.',
        //     {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        // }else{
        //     toast.warning('This username is already in use!',
        //     {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        // }
    }
    return (
        // <h1>Disease Information Page</h1>

        <div className="LoginLayout">
            <div className="LoginDiv1" style={{ "grid-row-start": "1" }}>
                <h1 style={{ "font-size": 20 * 2 }}>Signup</h1>
            </div>
            <div className="LoginDiv2" style={{ "grid-row-start": "2", "font-size": 20, "line-height": "2" }}>
                <form >
                    <div className="innerForm" style={{ "align-self": "flex-start", "font-size": 20 }}>
                        <div className="form-group" style={{ "font-size": 20 }}>
                            <label htmlFor="username" style={{ "font-size": 20 }}>Username: </label>
                            <input class="form-control" type="text" name="username" id="username" style={{ "font-size": 20 }} onChange={(e) => setUsername(e.target.value)} />
                        </div>



                        <div className="form-group" style={{ "font-size": 20 }} >
                            <label htmlFor="password" style={{ "font-size": 20 }}>Password: </label>
                            <input class="form-control" type="password" name="password" id="password" style={{ "font-size": 20 }} onChange={(e) => setPassword(e.target.value)} />
                        </div>


                    </div >
                </form>
                <button class="btn btn-primary btn-lg btn-block" style={{ "font-size": 20 }} onClick={() => {
                    signupForm(document.getElementById("username").value, document.getElementById("password").value);
                }}
                >Signup
                </button>
            </div>
        </div>
    );
};

export default Signup;