import Cookies from "js-cookie"
import { useState } from "react";
import { useRouter } from "next/router";


export default function Login() {
    
    const router = useRouter();

    // States for login
    const [email, setEmail] = useState('akash.sachan59@gmail.com')
    const [password, setPassword] = useState('akash123')
    //const [cookies, setCookie] = useCookies();
    //const [login, setLogin] = useCookies();


    // States for checking the errors
    //const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState(false);

    // Handling user-name change
    const handleEmail = (e) => {
        setEmail(e.target.value)
        //setSubmitted(false)
    }

    // Handling password change
    const handlePassword = (e) => {
        setPassword(e.target.value)
        //setSubmitted(false)
    }

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === '' || password === '') {
            setError(true)
        } else {
            //setSubmitted(true)
            setError(false)
            const data = {
                email,
                password
            }
            console.log(data)

            // const response = await fetch('http://localhost:3000/login', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //         // 'Content-Type': 'application/x-www-form-urlencoded',
            //       },
            //     // data: data,
            // })
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
            const resJson = await response.json()
            let login = resJson.isloggedin
            console.log(resJson)
            
            if(login){
                Cookies.set('user', resJson.token, { expires: 1 })
                Cookies.set('isloggedin', login, { expires:1 })
                router.push('/')
            }else{
                alert ('enter valid credentials')
            }
            Cookies.get()
        }
    }

    // Showing error message
    const errorMessage = () => {
        return (
            <div className="error-message"
                style={{ display: error ? '' : 'none' }}>
                <p>Please enter valid credentials</p>
            </div>
        )
    }

    return (
        <div className="login-form">
            <div>
                <h1>User Login</h1>
            </div>

            {/* Calling Error Methods */}
            <div className='messages'>
                {errorMessage()}
            </div>

            <form>
                <div>
                    <label>User Email: </label>
                    <input onChange={handleEmail} className='input' type="text" value={email}></input>
                </div>

                <div>
                    <label>Password: </label>
                    <input onChange={handlePassword} className='input' type="password" value={password}></input>
                </div>

                <div>
                    <button onClick={handleSubmit} className='btn' type='submit'>Submit</button>
                </div>
            </form>
        </div>
    )
}


