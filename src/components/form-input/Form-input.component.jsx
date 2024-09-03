import { FormInputLabel, Input, Group } from './Form-input.styles.jsx'

const FormInput = ({ label, ...otherProps }) => {
    return (
        <Group>
        <Input {...otherProps} />
        {label && (
            <FormInputLabel 
            shrink={otherProps.value.length} 
            // className={`${otherProps.value.length? 'shrink' : ''} form-input-label`}
            >
                {label}
            </FormInputLabel>
            )}
        </Group>
    )
}

export default FormInput