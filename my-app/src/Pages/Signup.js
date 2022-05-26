import "../Css/Login.css";
import { useState, useContext } from 'react';

const Signup = () => {
    const [username, setUsername] = useState(0);
    const [password, setPassword] = useState(0);
    return (
        // <h1>Disease Information Page</h1>
        <div className="LoginLayout">
            <div className="LoginDiv1" style={{ "grid-row-start": "1" }}>
                <h1 style={{"font-size": 20*2}}>Signup</h1>
            </div>
            <div className="LoginDiv2" style={{ "grid-row-start": "2", "font-size": 20, "line-height": "2" }}>
                <form >
                    <div className="innerForm" style={{ "align-self": "flex-start" , "font-size": 20}}>
                        <div className="form-group" style={{"font-size": 20}}>
                            <label htmlFor="username" style={{"font-size": 20}}>Username: </label>
                            <input class = "form-control" type="text" name="username" id="username" style={{"font-size": 20}}  onChange={(e) => setUsername(e.target.value)} />
                        </div>
                       
                        
                       
                        <div className="form-group"style={{"font-size": 20}} >
                            <label htmlFor="password" style={{"font-size": 20}}>Password: </label>
                            <input class = "form-control" type="password" name="password" id="password" style={{"font-size": 20}} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        

                    </div >
                </form>
                <button class = "btn btn-primary btn-lg btn-block" style={{"font-size": 20}} 
                        >Signup
                             </button>
            </div>
        </div>
    );
};

export default Signup;