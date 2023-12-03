import React from 'react';

function LoginForm({loginUser}) {
    return (
        <form className="FormElement" onSubmit={(e) => loginUser(e)}>
            <label htmlFor="email">Email</label>
            <textarea type="text" name="email"/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password"/>

            <button type="submit">Submit</button>
        </form>
    );
}

export default LoginForm;