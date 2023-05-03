import { useState } from 'react';
import { login } from '../../utilities/services/users'

const defaultState = {
    username: '',
    password: '',
    error: ''
}

export default function LoginForm({ setUser }) {
    const [formData, setFormData] = useState(defaultState)

    const { username, password, error } = formData;

    const handleSubmit = async (e) => {
        // when we submit we basically just grab whatever we have in
        // the state.
        e.preventDefault();

        try {
            const {  password, username } = formData;
            const data = {  password, username }

            const user = await login(data)
            setUser(user)
        } catch (err) {
            setFormData({
                ...formData,
                error: 'Log in Failed - Try again!'
            })
        }
    }

    function handleChange(evt) {
        // Replace with new object and use a computed property
        // to update the correct property
        const newFormData = {
            ...formData, // use the existing formData
            [evt.target.name]: evt.target.value, // override whatever key with the current fieldd's value
            error: '' // clear any old errors as soon as the user interacts with the form
        };
        setFormData(newFormData);
    }

    const disabled = !username || !password

    return <div className='LoginForm'>
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} autoComplete="off">
                <input type="text" name="username" id="username" placeholder='Username' value={username} onChange={handleChange} required />
                <input type="password" name="password" id="password" placeholder='Password' value={password} onChange={handleChange} required />
                <button type="submit" disabled={disabled}>Log In</button>
            </form>
        </div>
        {error && <p className="error-message">&nbsp;{error}</p>}
    </div>
}