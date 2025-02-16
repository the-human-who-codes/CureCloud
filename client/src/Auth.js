import { auth, provider } from '../src/firebaseConfig'; // Import from the TS file

const googleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('Google Sign-In successful:', user);
      
    })
    .catch((error) => {
      console.error('Google Sign-In error:', error.message);
    });
};
if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault();
      auth.signOut()
        .then(() => {
          console.log('User logged out');
         
        })
        .catch((error) => {
          console.error('Logout error:', error.message);
        });
    });
  }
document.addEventListener('DOMContentLoaded', () => {
  const googleSignInBtn = document.getElementById('google-login'); // Select Google Sign-In button

  // Function to toggle containers

  // Google Sign-In button click event
  if (googleSignInBtn) {
    googleSignInBtn.addEventListener('click', (e) => {
      e.preventDefault();
      googleSignIn();
    });
  }
});
