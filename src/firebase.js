import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: "AIzaSyBGI7LdPPrVcB6QAHt2dP2zu1TeRNYqPag",
    authDomain: "stackoverflow-app-473d1.firebaseapp.com",
    projectId: "stackoverflow-app-473d1",
    storageBucket: "stackoverflow-app-473d1.appspot.com",
    messagingSenderId: "523100547940",
    appId: "1:523100547940:web:0522d10a9455e76e226871",
    measurementId: "G-FX94GQB8LX"
  };
  

const app = initializeApp(firebaseConfig);
//const storage = getStorage(app,process.env.REACT_APP_BUCKET_URL);

export default app
