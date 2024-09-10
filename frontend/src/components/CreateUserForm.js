import React from 'react';

function CreateUserForm( {signUpUser} ) {
    return (
        <form className="FormElement" onSubmit={(e) => signUpUser(e)}>
            <label htmlFor="displayName">Join BoroughBook!</label>
            <textarea type="text" name="displayName" placeholder="Username"/>

            <label htmlFor="email"></label>
            <textarea type="text" name="email" placeholder="Email"/>

            <label htmlFor="password"></label>
            <input type="password" name="password" placeholder="Password"/>
            
            <button type="submit">Sign Up</button>
        </form>
    );
}

export default CreateUserForm;