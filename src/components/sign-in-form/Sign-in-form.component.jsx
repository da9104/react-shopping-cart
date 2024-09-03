import { useState } from 'react'
import FormInput from '../form-input/Form-input.component'
import {
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocumentFromAuth,
    signInAuthUserWithEmailAndPassword,
} from '../../utils/firebase/firebase.utils'
import '../../components/sign-up-form/sign-up-form.styles.scss'
import Button, { BUTTON_TYPE_CLASSES } from '../button/Button.component'

const defaultFormFields = {
    email: '',
    password: '',
}

const SignInForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields)
    const { email, password, } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup()
     
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
       
        try {
          const { user } = await signInAuthUserWithEmailAndPassword(email, password)
          resetFormFields()
        } catch (err) {
            if (err.code === 'auth/invalid-credential') {
                alert('password or email address are incorrect.')
            }
            console.log(err)
         }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value})
    }

    return (
        <div className='sign-up-container'>
        <h2>Already have an account?</h2>
        <span> sign in with your email and password </span>
    
        <form onSubmit={handleSubmit}>
          
            <FormInput
                label='Email Address'
                type='text'
                onChange={handleChange}
                name='email'
                value={email}
                required />
           
            <FormInput
                label='Password'
                type='password'
                onChange={handleChange}
                name='password'
                value={password}
                required />
        <div className='buttons-container'>
        <Button type='submit' buttonType={BUTTON_TYPE_CLASSES.inverted}>Sign In</Button>
        <Button type='button' buttonType={BUTTON_TYPE_CLASSES.google} onClick={signInWithGoogle}>Google sign in</Button>
        </div>
        </form>

        </div>
    )
}

export default SignInForm