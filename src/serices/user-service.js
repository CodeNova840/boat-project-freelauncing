import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc,
  getDocs,
  query,
  where 
} from 'firebase/firestore';
import { db } from '../firebase/config';

export const userService = {
  // Add a new user
addUser: async (userData) => {
    try {
      // Check if email already exists
      const emailQuery = query(
        collection(db, 'users'), 
        where('email', '==', userData.email.toLowerCase().trim())
      );
      const querySnapshot = await getDocs(emailQuery);
      
      if (!querySnapshot.empty) {
        throw new Error('Email already exists. Please use a different email address.');
      }

      // Create user if email doesn't exist
      const docRef = await addDoc(collection(db, 'users'), {
        name: userData.name,
        email: userData.email.toLowerCase().trim(), // Store email in lowercase
        role: 'dealer', // Always set role as dealer
        createdAt: new Date(),
        ...userData
      });
      return docRef.id;
    } catch (error) {
      if (error.message.includes('Email already exists')) {
        throw error; // Re-throw the custom error
      }
      throw new Error('Error adding user: ' + error.message);
    }
  },

  // Get all users
getUsers: async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'users'));
    
    return querySnapshot.docs
      .map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      .filter(user => user.role !== 'admin')
      .sort((a, b) => {
        // Sort by createdAt if available, otherwise by document ID
        if (a.createdAt && b.createdAt) {
          return b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime();
        }
        return b.id.localeCompare(a.id); // Fallback to document ID
      });
  } catch (error) {
    throw new Error('Error getting users: ' + error.message);
  }
},

  // Update user
  updateUser: async (userId, userData) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        ...userData,
        updatedAt: new Date()
      });
    } catch (error) {
      throw new Error('Error updating user: ' + error.message);
    }
  },

  // Delete user
  deleteUser: async (userId) => {
    try {
      await deleteDoc(doc(db, 'users', userId));
    } catch (error) {
      throw new Error('Error deleting user: ' + error.message);
    }
  }
};