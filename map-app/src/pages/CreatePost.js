import { React, useEffect, useCallback, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import Header from '../components/Header';
import CreatePostForm from '../components/CreatePostForm';

function CreatePostPage({ app, isLoading, isLoggedIn, userInformation, setIsLoggedIn, setUserInformation }) {
    const navigate = useNavigate();
    const [postSuccessful, setPostSuccessful] = useState(false);

    const createPost = useCallback(
        async (e) => {
            e.preventDefault();
            const db = getFirestore(app);
            const storage = getStorage();

            const imageToUpload = e.currentTarget.imageToUpload.files[0];
            const imageRef = ref(storage, 'images/' + imageToUpload.name);
            const font1ToUpload = e.currentTarget.font1ToUpload.files[0];
            const font1Ref = ref(storage, 'font1/' + font1ToUpload.name);
            const font2ToUpload = e.currentTarget.font2ToUpload.files[0];
            const font2Ref = ref(storage, 'font2/' + font2ToUpload.name);
            

            const caption = e.currentTarget.caption.value;
            const imageAlt = e.currentTarget.imageAlt.value;
            const color1 = e.currentTarget.color1.value;
            const color2 = e.currentTarget.color2.value;
            const color3 = e.currentTarget.color3.value;

            const userName = userInformation.displayName;
            const userId = userInformation.uid;
            
            
            try {
                await uploadBytes(imageRef, imageToUpload).then(
                    (snapshot) => {
                        console.log("Uploaded a blob or file!", snapshot);
                        return snapshot;
                    }
                );
                await uploadBytes(font1Ref, font1ToUpload).then(
                    (snapshot) => {
                        console.log("Uploaded a blob or file!", snapshot);
                        return snapshot;
                    }
                );
                await uploadBytes(font2Ref, font2ToUpload).then(
                    (snapshot) => {
                        console.log("Uploaded a blob or file!", snapshot);
                        return snapshot;
                    }
                );

                const docRef = await addDoc(collection(db, "posts"), {
                    caption, 
                    imageAlt, 
                    imageUrl: imageToUpload.name,
                    userId: userId,
                    userName,
                    font1Url: font1ToUpload.name,
                    font2Url: font2ToUpload.name,
                    color1,
                    color2,
                    color3,
                });
                console.log("Document written with ID: ", docRef.id);
                setPostSuccessful(true);
            } catch (e) {
                console.error("Error adding document, ", e);
            }
    }, [app, userInformation])

    useEffect(() => {
        if(!isLoggedIn && !isLoading) return navigate('/login'); //if NOT logged in, nav to login
    }, [isLoading, isLoggedIn, navigate])
    useEffect(() => {
        if(postSuccessful) return navigate('/'); //goes back home when done posting
    }, [postSuccessful, navigate])

    return (
        <>
            <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} setUserInformation={setUserInformation} />
            <div className="PageWrapper Form">
                <h1>Create Post</h1>
                <CreatePostForm 
                createPost={createPost}/>
                <p>{postSuccessful && "Success!"}</p>
            </div>
        </>
    );
}

export default CreatePostPage;