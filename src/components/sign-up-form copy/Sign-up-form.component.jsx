import { useState } from 'react'
import FormInput from '../form-input/Form-input.component'
import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from '../../utils/firebase/firebase.utils'
import '../../styles/sign-up-form.styles.scss'
import Button from '../button/Button.component'

const defaultFormFields = {
    accoutName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {
    const [ formFields, setFormFields ] = useState(defaultFormFields)
    const { accoutName, email, password, confirmPassword } = formFields

    const resetFormFields = () => {
        setFormFields(defaultFormFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        if(password !== confirmPassword) {
            alert("password do not match")
            console.log("password do not match.")
            return 
        }

        try {
          const { user } = await createAuthUserWithEmailAndPassword(email, password)
         // console.log(res)
          await createUserDocumentFromAuth(user, {accoutName})
          resetFormFields()
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use.')
            }
            console.log(err, "user creation error.")
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target
        setFormFields({ ...formFields, [name]: value})
    }

    return (
        <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span> sign up with your email and password </span>
        <form onSubmit={handleSubmit}>
          
            <FormInput
                label='Account Name'
                type='text'
                onChange={handleChange}
                name='accoutName'
                value={accoutName}
                required />
           
            <FormInput
                label='Email Address'
                type='email' 
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
        
            <FormInput
                label='Confrim Password'
                type='password' 
                onChange={handleChange}
                name='confirmPassword'
                value={confirmPassword}
                required />

            <Button buttonType='inverted' type='submit'>Submit</Button>
        </form>

        </div>
    )
}

export default SignUpForm