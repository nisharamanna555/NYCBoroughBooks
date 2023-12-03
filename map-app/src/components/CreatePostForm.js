import React from 'react';

function CreatePostForm({ createPost }) {
    return (
        <form className="FormElement PostFormElement" onSubmit={(e) => createPost(e)}>
            <h2 style={{color: "#D8AC90"}}>1 IMAGE!</h2>
            <label htmlFor="imageToUpload">Moodboard</label>
            <input
                type="file"
                name="imageToUpload"
                accept="image/png, image/jpeg, image/jpg, image/gif"
            />
            <label htmlFor="caption">Title</label>
            <textarea type="text" name="caption" className="longTextInput"/>
            <label htmlFor="imageAlt">Image Alt</label>
            <textarea type="text" name="imageAlt" className="longTextInput"/>

            <h2 style={{color: "#D83D66"}}>2 FONTS!</h2>
            <label htmlFor="font1ToUpload">Font image sample</label>
            <input
                type="file"
                name="font1ToUpload"
                accept="image/png, image/jpeg, image/jpg, image/gif"
            />
            <label htmlFor="font2ToUpload">Font image sample</label>
            <input
                type="file"
                name="font2ToUpload"
                accept="image/png, image/jpeg, image/jpg, image/gif"
            />

            <h2 style={{color: "#15183B"}}>3 COLORS!</h2>
            <label htmlFor="color1">HEX code</label>
            <textarea type="text" name="color1" placeholder="Include # sign"/>
            <label htmlFor="color2">HEX code</label>
            <textarea type="text" name="color2" placeholder="Include # sign"/>
            <label htmlFor="color3">HEX code</label>
            <textarea type="text" name="color3" placeholder="Include # sign"/>
            
            <button type="submit">Submit</button>
        </form>
    );
}

export default CreatePostForm;