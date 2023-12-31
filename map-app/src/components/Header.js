import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { Link } from "react-router-dom";


function Header( {isLoggedIn, setIsLoggedIn, setUserInformation}) {
    function logout() {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                setUserInformation({});
                setIsLoggedIn(false);
            })
            .catch((error) => {
                console.warn(error);
            });
    }

    return (
        <header>
            <nav>
                <div className="nav--logo">
                    <a href="/"><p>NYC BoroughBook</p>
                    </a>
                </div>
                <div className="nav--links">
                    {!isLoggedIn && (
                        <li>
                            <Link to="/login"><p>Login</p></Link>
                        </li>
                    )}
                    {!isLoggedIn && (
                        <li>
                            <Link to="/create-user"><p>Create User</p></Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <Link to="/user/:id"><p>Profile</p></Link>
                        </li>
                    )}
                    {isLoggedIn && (<Link to="/login" onClick={() => logout()} className="logout-button"><p>Log Out</p></Link>)}
                </div>
            </nav>
        </header>
    );
}

export default Header;