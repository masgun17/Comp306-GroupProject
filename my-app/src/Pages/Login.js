import { Link } from "react-router-dom";
import "../Css/Login.css";

const Login = () => {
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
                            <input class="form-control" type="text" name="username" id="username" style={{ "font-size": 20 }} />
                        </div>
                        <div className="form-group" style={{ "font-size": 20 }}>
                            <label htmlFor="password" style={{ "font-size": 20 }}>Password: </label>
                            <input class="form-control" type="password" name="password" id="password" style={{ "font-size": 20 }} />
                        </div>
                        <label htmlFor="text">If you don't have an account:</label><Link to="/Signup" style={{ "color": "red" }}>   Click Here</Link>
                    </div>
                </form>
                <button type="submit" class="btn btn-primary btn-lg btn-block" id="loginButton" style={{ "font-size": 20 }}
                >Login
                </button>
            </div>
        </div>
    );
}
export default Login;