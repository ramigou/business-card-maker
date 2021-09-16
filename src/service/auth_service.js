import firebase from "firebase";

class AuthService {
  login(providerName) {
    // firebase의 인증 객체이름이 XXXAuthProvider로 동일하므로 아래와 같이 작성 가능
    const authProvider = new firebase.auth[`${providerName}AuthProvider`]();

    return firebase.auth().signInWithPopup(providerName);
  }
}

export default AuthService;
