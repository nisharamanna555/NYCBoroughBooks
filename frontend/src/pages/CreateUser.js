// import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import { useEffect, React, useState, useCallback } from 'react';
import CreateUserForm from '../components/CreateUserForm';
import Header from '../components/Header';
import {auth} from "../components/firebase";

function CreateUserPage({ isLoading, isLoggedIn, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(isLoggedIn && !isLoading) return navigate('/'); //Home
    }, [isLoggedIn, isLoading, navigate])

    const [errors, setErrors] = useState();

    const signUpUser = useCallback(
        (e) => {
            e.preventDefault();

            const email = e.currentTarget.email.value;
            const password = e.currentTarget.password.value;
            const displayName = e.currentTarget.displayName.value;


            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    setIsLoggedIn(true);
                    setErrors();

                updateProfile(user, { displayName: displayName })
                    .then(() => {
                        setUserInformation({
                            email: user.email,
                            displayName,
                            uid: user.id,
                            accessToken: user.accessToken,
                        });
                    })
                    .catch((err) => {
                        const errorCode = err.code;
                        const errorMessage = err.message;
                        console.warn({err, errorCode, errorMessage});
                        setErrors(errorMessage);
                    });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.warn({error, errorCode, errorMessage});
                    setErrors(errorMessage);
                });
        },
        [setErrors, setIsLoggedIn, setUserInformation]
    );
    

    return (
        <>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation}/>
            <div className="PageWrapper Form">
                <CreateUserForm signUpUser={signUpUser}/>
                <p>{errors}</p>
                <div className="authorization">
                    <p>Already have an account?</p>
                    <li><Link to="/login"><p>Log in</p></Link></li>
                </div>
            </div>
        </>
    );
}

export default CreateUserPage;