import { React, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { getDocs, getFirestore, collection } from "firebase/firestore";
import Header from '../components/Header';
import Post from '../components/Post'


const queryData = async (app) => {
    if (!app) return [];
    const db = getFirestore(app);
    const data = [];
    const querySnapshot = await getDocs(collection(db, "posts"));
    querySnapshot.forEach((doc) => {
        data.push(doc.data());
    });
    return data;
};

function HomePage({ app, isLoading, isLoggedIn, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        if(!isLoggedIn && !isLoading) return navigate('/'); //if NOT logged in, nav to login
    }, [isLoading, isLoggedIn, navigate]) 

    useEffect(() => {
        if(!app) return;
        queryData(app).then(setPostData);
    }, [app])

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
            <div className="PageWrapper HomePage">
                <div className= "cover">
                    <div className="cover-top">
                        <div className="cover--left">
                            <h1>brandspiration</h1>
                            <h3>Simple branding templates to start off your designs!</h3>
                        </div>
                        <div className="cover--right">
                            <h2 style={{color: "#D8AC90"}}>1 IMAGE!</h2>
                            <h2 style={{color: "#D83D66"}}>2 FONTS!</h2>
                            <h2 style={{color: "#15183B"}}>3 COLORS!</h2>
                        </div>
                    </div>
                    <div className="cover-buttons">
                        {isLoggedIn && (
                            <li className="create-post--home">
                                <a href="/create-post" className="create-post--home"><p>Create your own!</p></a>
                            </li>
                        )}
                        {!isLoggedIn && (
                            <li className="create-post--home">
                                <a href="/login" className="create-post--home"><p>Create your own!</p></a>
                            </li>
                        )}
                        <a className="explore--home" href="#scroll-to">Explore</a>
                    </div>
                </div>
                
                <section id="scroll-to" className="PostsWrapper">
                    {postData.map((post,index) => (
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
                </section>
            </div>
        </>
    );
}

export default HomePage;