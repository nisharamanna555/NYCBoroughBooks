import { React, useEffect} from 'react';
import { useNavigate } from 'react-router';
import Header from '../components/Header';

function FindFriendsPage({ isLoading, isLoggedIn, userInformation, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedIn && !isLoading) return navigate('/login'); //if NOT logged in, nav to login
    }, [isLoading, isLoggedIn, navigate])

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
            <div className="PageWrapper">
                <h1>Find Friends Page</h1>
            </div>
        </>
    );
}

export default FindFriendsPage;