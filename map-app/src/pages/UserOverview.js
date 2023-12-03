import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { getDocs, getFirestore, collection } from "firebase/firestore";
import Header from '../components/Header';
import Post from '../components/Post'


const queryData = async (app, userId) => {
    if (!app) return [];
    const db = getFirestore(app);
    const data = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        if(doc.data().userId === userId){
            data.push(doc.data());
        }
    });
    return data;
};

function UserOverview({ app, isLoading, isLoggedIn, userInformation, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();
    const [postData, setPostData] = useState([]);
    const userId = userInformation.uid;

    useEffect(() => {
        if(!isLoggedIn && !isLoading) return navigate('/login'); //if NOT logged in, nav to login
    }, [isLoading, isLoggedIn, navigate])

    useEffect(() => {
        if(!app) return;
        queryData(app, userId).then(setPostData);
    }, [app, userId])

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
            <div className="PageWrapper Overview">
                <h1>User Profile</h1>
                <div className="Overview--text">
                    <h2>Username: </h2>
                    <p>{userInformation.displayName}</p>
                    <h2>Email: </h2>
                    <p>{userInformation.email}</p>
                </div>
                <h3>Your Posts: </h3>
                {postData.map((post, index) => (
                        <div 
                            className="PostComponent"
                            key = {index}>
                        <Post
                            caption={post.caption}
                            imageAlt={post.imageAlt}
                            imageUrl={post.imageUrl}
                            userId={post.userId}
                            userName={post.userName}
                            font1Url={post.font1Url}
                            font2Url={post.font2Url}
                            color1={post.color1}
                            color2={post.color2}
                            color3={post.color3}
                        />
                        </div>
                    ))}
            </div>
        </>
    );
}

export default UserOverview;