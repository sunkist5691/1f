type Form = {
  name: string
  email: string
  password: string
  confirmedPassword: string
  role: string
}

export default class ValidationService {
  validation(
    form: Form,
    setErrors: React.Dispatch<React.SetStateAction<Form>>,
  ) {
    const namePattern = /^(?=.{2,50}$)[a-zA-Z]+(?:['_.\s][a-zA-Z]+)*$/
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\^$*.[\]{}()?\-“!@#%&/,><’:;|_~`])\S{8,99}$/

    let errors: Form = {
      name: '',
      email: '',
      password: '',
      confirmedPassword: '',
      role: '',
    }

    if (!form.name) errors.name = 'Name required'
    else if (!namePattern.test(form.name))
      errors.name =
        'Name must be at least 2 characters and alphabetical characters'

    if (!form.email) errors.email = 'Email required'
    else if (!emailPattern.test(form.email))
      errors.email = 'Email address must be in right format'

    if (!form.password) errors.password = 'Password required'
    else if (!passwordPattern.test(form.password))
      errors.password =
        'Please include at least 1 lowercase and 1 uppercase alphabetical character, at least 1 numeric character, at least one special character '

    if (!form.confirmedPassword)
      errors.confirmedPassword = 'Confirmed password required'
    else if (form.password !== form.confirmedPassword)
      errors.confirmedPassword = 'Passwords do not match'

    if (!form.role) errors.role = 'Please select status'

    const { name, email, password, confirmedPassword, role } = errors
    if (name || email || password || confirmedPassword || role) {
      setErrors(errors)
      return false
    }
    return true
  }
}
