// Import the functions you need from the SDKs you need
  import { initializeApp } from "firebase/app";
  import { getAuth} from "firebase/auth";
  import { getFirestore } from "firebase/firestore"
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyByXzapLP1_6O6nIDRCE9ArXGNDcmykmfk",
    authDomain: "fashion-hub-b6628.firebaseapp.com",
    projectId: "fashion-hub-b6628",
    storageBucket: "fashion-hub-b6628.firebasestorage.app",
    messagingSenderId: "828087752622",
    appId: "1:828087752622:web:4506d0782c2dae3a871a3f"
  };

  // Initialize Firebase
   const app = initializeApp(firebaseConfig);
  export const auth = getAuth()
  export const db = getFirestore(app)
  export default app