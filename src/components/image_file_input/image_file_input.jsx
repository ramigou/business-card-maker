import React, { useRef } from "react";
import styles from "./image_file_input.module.css";

const ImageFileInput = ({ imageUploader, name, onFileChange }) => {
  const inputRef = useRef();
  // file input 디자인을 위해 버튼을 눌렀을 떄 file input 실행되도록 구현
  const onButtonClick = (event) => {
    event.preventDefault();
    inputRef.current.click();
  };

  const onChange = async (event) => {
    // console.log(event.target.files[0]);
    const uploaded = await imageUploader.upload(event.target.files[0]);
    // console.log(uploaded);
    onFileChange({
      name: uploaded.original_filename,
      url: uploaded.url
    });
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="file"
        accept="image/*"
        name="file"
        onChange={onChange}
      />
      <button className={styles.button} onClick={onButtonClick}>
        {name || "No file"}
      </button>
    </div>
  );
};

export default ImageFileInput;
