import React from 'react';

function CreateUserForm( {signUpUser} ) {
    return (
        <form className="FormElement" onSubmit={(e) => signUpUser(e)}>
            <label htmlFor="displayName">Username</label>
            <textarea type="text" name="displayName"/>

            <label htmlFor="email">Email</label>
            <textarea type="text" name="email"/>

            <label htmlFor="password">Password</label>
            <input type="password" name="password"/>
            
            <button type="submit">Submit</button>
        </form>
    );
}

export default CreateUserForm;