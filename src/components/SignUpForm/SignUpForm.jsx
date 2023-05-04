import { useState } from 'react';
import { signUp } from '../../utilities/services/users'

const defaultState = {
    username: '',
    email: '',
    password: '',
    confirm: '',
    error: ''
}

export default function SignUpForm({ setUser }){
    const [formData, setFormData] = useState(defaultState)

    const { username, email, password, confirm, error } = formData;

    const handleSubmit = async (e) =>{
        // when we submit we basically just grab whatever we have in
        // the state.
        e.preventDefault();

        try{
            const { username, password, email } = formData;
            const data = {username, password, email}

            const user = await signUp(data)
            // as soon as we get the decoded data from the creat account api call
            // (derived fromt he jwt in local storage), we can update app.js to store
            // user in state
            setUser(user)
        }catch (err) {
            setFormData({
                ...formData,
                error: 'Sign up Failed - Try again!'
            })
        }
    }

    function handleChange(evt) {
        const newFormData = {
            ...formData, // use the existing formData
            [evt.target.name]: evt.target.value, // override whatever key with the current fieldd's value
            error: '' 
        };
        setFormData(newFormData);
    }

    const disabled = (password !== confirm) || !username || !email || !password || !confirm

    return <div className='SignUpForm'>
            <div className="form-container">
                <h1>Sign Up</h1>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <input type="text" name="username" id="username" placeholder='Username' value={username} onChange={handleChange} required/>

                    <input type="text" name="email" id="email" placeholder='Email' value={email} onChange={handleChange} required />

                    <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={handleChange} required />

                    <input type="password" name="confirm" id="confirm" placeholder='Confirm Password' value={confirm} onChange={handleChange} required />

                    <button type="submit" disabled={disabled}>Sign up</button>
                </form>
            </div>
            {error && <p className="error-message">&nbsp;{error}</p>}
        </div>
}