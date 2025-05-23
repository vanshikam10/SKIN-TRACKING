// Reference to form sections
const loginForm = document.getElementById('login-section');
const signupForm = document.getElementById('signup-section');
const resetForm = document.getElementById('reset-section');

// Show/hide forms
window.showForm = (type) => {
  loginForm.style.display = type === 'login' ? 'block' : 'none';
  signupForm.style.display = type === 'signup' ? 'block' : 'none';
  resetForm.style.display = type === 'reset' ? 'block' : 'none';
};

// LOGIN
document.querySelector('#login-section button').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    alert('Logged in successfully!');
    window.location.href = 'dashboard.html';
  } catch (error) {
    alert('Login Failed: ' + error.message);
  }
});

// SIGNUP
document.querySelector('#signup-section button').addEventListener('click', async () => {
  const name = document.getElementById('signup-name').value;
  const email = document.getElementById('signup-email').value;
  const password = document.getElementById('signup-password').value;
  const skinType = document.getElementById('signup-skin-type').value;

  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = userCredential.user;

    await firebase.firestore().collection('users').doc(user.uid).set({
      name,
      email,
      skinType,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    alert('Signup successful!');
    window.location.href = 'dashboard.html';
  } catch (error) {
    alert('Signup Failed: ' + error.message);
  }
});

// RESET PASSWORD
document.querySelector('#reset-section button').addEventListener('click', async () => {
  const email = document.getElementById('reset-email').value;

  try {
    await firebase.auth().sendPasswordResetEmail(email);
    alert('Reset link sent to your email!');
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
