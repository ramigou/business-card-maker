import React from "react";
import ReactDOM from "react-dom";
import "./index.module.css";
import App from "./app";
import { firebaseApp } from "./service/firebase";
import AuthService from "./service/auth_service";
import ImageUploader from "./service/image_upload";
import ImageFileInput from "./components/image_file_input/image_file_input";

const authService = new AuthService(firebaseApp);
const imageUploader = new ImageUploader();
// Dependency Injection (*** 공부 필요..!)
// 확장성을 고려해 props 전체를 전달, 필수로 필요한 imageUploader prop은 인젝트가 되어 있음
const FileInput = (props) => (
  <ImageFileInput {...props} imageUploader={imageUploader} />
);

ReactDOM.render(
  <React.StrictMode>
    {/* 컴포넌트가 prop인 경우는 대문자로 네이밍 */}
    <App authService={authService} FileInput={FileInput} />
  </React.StrictMode>,
  document.getElementById("root")
);
