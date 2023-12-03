import React from 'react';

function LoginForm({loginUser}) {
    return (
        <form className="FormElement" onSubmit={(e) => loginUser(e)}>
            <label htmlFor="email">Sign In</label>
            <textarea type="text" name="email" placeholder="Username"/>

            <label htmlFor="password"></label>
            <input type="password" name="password" placeholder="Password"/>

            <button type="submit">Sign In</button>
        </form>
    );
}

export default LoginForm;