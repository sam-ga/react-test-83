import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signup } from '../../services/userService'

import SignupIcon from '../../assets/images/signup.svg'

// Styles
import styles from './SignUp.module.scss'

const SignUp = ({ setUser }) => {

  // ! State
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  })

  // ! Location variables
  const navigate = useNavigate()

  // ! Event Handlers
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { user } = await signup(formData) // sign in
      setUser(user) // set user to state
      navigate('/') // navigate to dashboard
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <main className={styles.container}>
      <section>
        <img src={SignupIcon} alt="An owl sitting on a sign" />
      </section>
      <section>
        <form onSubmit={handleSubmit}>
          <h1>Sign up</h1>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="name"
              value={formData.username}
              name="username"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              name="password"
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="confirm">Confirm Password:</label>
            <input
              type="password"
              id="confirm"
              value={formData.confirmPassword}
              name="confirmPassword"
              onChange={handleChange}
            />
          </div>
          <div>
            <button>Sign Up</button>
            <Link to="/">
              <button>Cancel</button>
            </Link>
          </div>
        </form>
      </section>

    </main>
  )
}

export default SignUp