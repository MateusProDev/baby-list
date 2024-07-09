// Importe as funções necessárias do SDK do Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCo6mOwjv25n4bxA8JvNwq-H2xI0AOQ38E",
  authDomain: "my-baby-8fdf2.firebaseapp.com",
  projectId: "my-baby-8fdf2",
  storageBucket: "my-baby-8fdf2.appspot.com",
  messagingSenderId: "224313903361",
  appId: "1:224313903361:web:0aee684bd0c21cc46f7300"
};

// Inicialize o aplicativo Firebase
const app = initializeApp(firebaseConfig);

// Obtenha uma instância do Firestore e do Auth
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Função para login com Google
const signInWithGoogle = () => {
  return signInWithPopup(auth, provider);
};

// Função para logout
const signOutFromGoogle = () => {
  return signOut(auth);
};

export { db, auth, signInWithGoogle, signOutFromGoogle };
