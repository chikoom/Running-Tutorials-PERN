import React, { useState } from "react";

export default function App(props) {
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleChange = e => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0]
      });
    }
  };

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", image.raw);
    //formData.append("api_key", '813213351239598');
    //formData.append("api_secret", 'Z-XrqgZVyR3pALVwujCKSLME0ys');


    formData.append('upload_preset', 'cloudtutupload');
    const options = {
      method: 'POST',
      body: formData
    };

    // replace cloudname with your Cloudinary cloud_name
    const upload_return =  fetch('https://api.Cloudinary.com/v1_1/chikoom/image/upload', options)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        props.onImgUpdate(res.url)
      })
      .catch(err => console.log(err));

    console.log(upload_return)

  //   await fetch("YOUR_URL", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "multipart/form-data"
  //     },
  //     body: formData
  //   });
  };

  return (
    <div>
      <label htmlFor="upload-button">
        {image.preview ? (
          <img src={image.preview} alt="dummy" width="300" height="300" />
        ) : (
          <>
            <h5 className="text-center">Upload your photo</h5>
          </>
        )}
      </label>
      <input
        type="file"
        id="upload-button"
        style={{ display: "none" }}
        onChange={handleChange}
      />
      <br />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}