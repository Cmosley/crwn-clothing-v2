import { useState } from 'react'
import { createAuthUserWithEmailandPassword, createUserDocumentFromAuth } from '../../../utils/firebase/firebase.utils'

const defaultformFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
}


const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultformFields)
  const { displayName, email, password, confirmPassword } = formFields


  const resetFormFields = () => {
    setFormFields(defaultformFields);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value })
  }

  const handleSubmit = async(event) => {
    event.preventDefault();
    // confirm password match
    if(password !== confirmPassword){
      alert("Passwords do not match")
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailandPassword(
        email, 
        password
      )
      await createUserDocumentFromAuth(user, {displayName});
      resetFormFields();
    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
        alert('Cannot create user, email already in use')
      }
      console.log("user creation encountered an error", error)
    }
  };
    
  

  return (
    <div className="sign-up-form">
      <h1>Sign Up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display Name</label>
        <input
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <label>Email</label>
        <input
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={handleChange}
          name="password"
          value={password}
          required
        />
        <label>Confirm Password</label>
        <input
          type="password"
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUpForm;