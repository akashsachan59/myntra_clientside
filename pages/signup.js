import { useState } from "react";
import { useRouter } from "next/router";

export default function Signup() {

    const router = useRouter();

    // States for Registration
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [phone, setPhone] = useState('')
    const [addresses, setAddresses] = useState('')

    // States for error
    const [error, setError] = useState('')

    // Showing error message
    const errorMessage = () => {
        return (
            <div className="error-message"
                style={{ display: error ? '' : 'none' }}>
                <p>Please enter valid credentials</p>
            </div>
        )
    }

    // Handling the form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (email === '' || password === '' || name === '' || phone === '' || addresses === '' || gender === '') {
            setError(true)
        } else {
            setError(false)
            const data = {
                name,
                email,
                password,
                phone,
                gender,
                addresses
            }
            console.log(data)

            const response = await fetch('http://localhost:3000/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
            const resJson = await response.json()
            // console.log(resJson)
            if(resJson.user){
                alert(resJson.msg)
            }
            setAddresses('')
            setEmail('')
            setGender('')
            setName('')
            setPassword('')
            setPhone('')
            router.push('/login')
            
        }
    }

    return(
        <div className="login-form">
        <div>
            <h1>User Registration</h1>
        </div>

        {/* Calling Error Methods */}
        <div className='messages'>
            {errorMessage()}
        </div>

        <form>
            <div>
                <label>Name: </label>
                <input onChange={(e) => {setName(e.target.value)}} className='input' type="text" value={name}></input>
            </div>

            <div>
                <label>Email: </label>
                <input onChange={(e) => {setEmail(e.target.value)}} className='input' type="text" value={email}></input>
            </div>

            <div>
                <label>Password: </label>
                <input onChange={(e) => {setPassword(e.target.value)}} className='input' type="password" value={password}></input>
            </div>

            <div>
                <label>Gender: </label>
                <input onChange={(e) => {setGender(e.target.value)}} className='input' type="text" value={gender}></input>
            </div>

            <div>
                <label>Phone: </label>
                <input onChange={(e) => {setPhone(e.target.value)}} className='input' type="text" value={phone}></input>
            </div>

            <div>
                <label>Address: </label>
                <input onChange={(e) => {setAddresses(e.target.value)}} className='input' type="text" value={addresses}></input>
            </div>

            <div>
                <button onClick={handleSubmit} className='btn' type='submit'>Submit</button>
            </div>
        </form>
    </div>
    )

}