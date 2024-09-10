import React, { useEffect,useState } from 'react';
import { getStorage, ref, getDownloadURL } from "firebase/storage";


function Post({ caption, imageAlt, imageUrl, userName, userId, font1Url, font2Url, color1, color2, color3 }) {
    const [image, setImage] = useState();
    const [font1, setFont1] = useState();
    const [font2, setFont2] = useState();
    
    useEffect(() => {
        const storage = getStorage();
        getDownloadURL(ref(storage, 'images/' + imageUrl))
        .then((url) => {
            setImage(url);
        });
        
    },[imageUrl]);

    useEffect(() => {
        const storage = getStorage();
        getDownloadURL(ref(storage, 'font1/' + font1Url))
        .then((url) => {
            setFont1(url);
        });
        
    },[font1Url]);

    useEffect(() => {
        const storage = getStorage();
        getDownloadURL(ref(storage, 'font2/' + font2Url))
        .then((url) => {
            setFont2(url);
        });
        
    },[font2Url]);


    if (image == null || font1 == null || font2 == null){}
    else{
        return (
            <div className="PostComponentWrapper">
                <p className="Caption">{caption}</p>
                <div className="colorsSamplesWrapper">
                    <div className="colorsSamples" style={{backgroundColor: `${color1}`}}><p>{color1}</p></div> 
                    <div className="colorsSamples" style={{backgroundColor: `${color2}`}}><p>{color2}</p></div>
                    <div className="colorsSamples" style={{backgroundColor: `${color3}`}}><p>{color3}</p></div>
                </div>
                <img 
                className="PostComponent--image"
                src={image} 
                alt={imageAlt}
                />
                <div className="fontsWrapper">
                    <img 
                    className="font1-image"
                    src={font1}
                    alt="first font"
                    />
                    <img 
                    className="font2-image"
                    src={font2} 
                    alt="second font"
                    />
                </div>
                {console.log(userId)}
            </div>
    )
    }
}

export default Post;