import SignUpForm from '../sign-up-form/Sign-up-form.component'
import SignInForm from '../sign-in-form/Sign-in-form.component'

const Authentication = () => {
  
    return (
        <div className='authentication-container'>
            <SignInForm />
            <SignUpForm />
        </div>
    )
}

export default Authentication