import { 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase/config';
import { useNavigate } from 'react-router-dom';

export const authService = {
  // Login user
  login: async (email, passcode) => {
    // Query the users collection
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email), where("password", "==", passcode));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      throw new Error("Invalid email or passcode.");
    }

    const userDoc = querySnapshot.docs[0];
    return { uid: userDoc.id, ...userDoc.data() };
  },


  // Get user data from Firestore (including role)
  getUserData: async (userId) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return {
          id: userDoc.id,
          ...userDoc.data()
        };
      }
      throw new Error('User data not found in Firestore');
    } catch (error) {
      throw new Error('Error fetching user data: ' + error.message);
    }
  },

  // Get user by email (useful for checking existing users)
  getUserByEmail: async (email) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', email));
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        return {
          id: doc.id,
          ...doc.data()
        };
      }
      return null;
    } catch (error) {
      throw new Error('Error finding user: ' + error.message);
    }
  },

  // Auth state listener
  onAuthStateChange: (callback) => {
    return onAuthStateChanged(auth, callback);
  },

  // Get current user with Firestore data
  getCurrentUser: async () => {
    const user = auth.currentUser;
    if (user) {
      const userData = await authService.getUserData(user.uid);
      return {
        user: user,
        userData: userData
      };
    }
    return null;
  },

  // Logout user
  logout: async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('auth');
      localStorage.removeItem('user');
          localStorage.removeItem("name");
        localStorage.removeItem("role");
        localStorage.removeItem("email");
        localStorage.removeItem("id");
    } catch (error) {
      throw new Error(error.message);
    }
  }
};