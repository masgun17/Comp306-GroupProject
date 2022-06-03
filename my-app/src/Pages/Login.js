import { Link } from "react-router-dom";
import "../Css/Login.css";
import { useState, useContext} from 'react';
import { useNavigate } from "react-router-dom";
import { loginAction } from "../Tools/actions";
// import {toast} from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState(0);
    const [password, setPassword] = useState(0);
    //toast.configure();

    async function loginForm(username, password) {
        var jsonData = {
          "data": [{
            "username": username,
            "password": password
          }]
        }
        const a = await loginAction(jsonData);
                    sessionStorage.setItem('isLogin', 'true')
            sessionStorage.setItem('username', a["Username"])
            navigate("/");
            window.location.reload(false);
        // if(a["Login"]){
        //     sessionStorage.setItem('isLogin', 'true')
        //     sessionStorage.setItem('username', a["Username"])
        //     navigate("/");
        //     window.location.reload(false);
        // }
        // if(a==="Enter your username!"){
        //     toast.warning('Enter your username!',
        // {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        // }else if(a==="Enter your password"){
        //     toast.warning('Enter your password',
        //     {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        //  }else if(a==="This account is not in the database"){
        //     toast.warning('This account is not in the database',
        //     {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        // }else if(a==="Login unsuccessful"){
        //     toast.warning('Login unsuccessful',
        //     {position: toast.POSITION.TOP_CENTER, autoClose:2000})
        // }
      }


    return (
        <div className="LoginLayout">
            <div className="LoginDiv1" style={{ "grid-row-start": "1", "font-size": 20 }}>
                <h1 style={{ "font-size": 20 * 2 }}>Login</h1>
            </div>
            <div className="LoginDiv2" style={{ "grid-row-start": "2", "font-size": 20, "line-height": "2" }}>
                <form className="form">
                    <div className="innerForm" style={{ "align-self": "flex-start", "font-size": 20 }}>
                        <div className="form-group" style={{ "font-size": 20 }}>
                            <label htmlFor="username" style={{ "font-size": 20 }}>Username: </label>
                            <input class="form-control" type="text" name="username" id="username" style={{ "font-size": 20 }} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="form-group" style={{ "font-size": 20 }}>
                            <label htmlFor="password" style={{ "font-size": 20 }}>Password: </label>
                            <input class="form-control" type="password" name="password" id="password" style={{ "font-size": 20 }} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <label htmlFor="text">If you don't have an account:</label><Link to="/Signup" style={{ "color": "red" }}>   Click Here</Link>
                    </div>
                </form>
                <button type="submit" class="btn btn-primary btn-lg btn-block" id="loginButton" style={{ "font-size": 20 }}  onClick={() => 
                            {loginForm(document.getElementById("username").value,document.getElementById("password").value);
                            }}
                >Login
                </button>
            </div>
        </div>
    );
}
export default Login;