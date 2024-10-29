import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// Components
import NavBar from './components/NavBar/NavBar'

// Page Components
import SignUp from './pages/SignUp/SignUp'
import SignIn from './pages/SignIn/SignIn'
import Landing from './pages/Landing/Landing'
import Dashboard from './pages/Dashboard/Dashboard'
import HootList from './pages/HootList/HootList'
import HootDetails from './pages/HootDetails/HootDetails'
import HootCreate from './pages/HootCreate/HootCreate'
import HootUpdate from './pages/HootUpdate/HootUpdate'
import NotFound from './pages/NotFound/NotFound'

import { getUser, removeToken } from './utils/auth'

const App = () => {
  const [user, setUser] = useState(getUser())

  const navigate = useNavigate()

  const handleSignOut = () => {
    removeToken()
    setUser(null)
    navigate('/signin')
  }

  return (
    <>
      <NavBar user={user} handleSignOut={handleSignOut} />
      <Routes>
        { user 
          ? (
            <>
                <Route path="/" element={<Dashboard user={user} />} />
                <Route path="/hoots" element={<HootList />} />
                <Route path="/hoots/:hootId" element={<HootDetails user={user} />} />
                <Route path="/hoots/new" element={<HootCreate />} />
                <Route path="/hoots/:hootId/edit" element={<HootUpdate />} />
              </>
            )
          : (
            <>
              <Route path="/" element={<Landing />} />
              <Route path="/signup" element={<SignUp setUser={setUser} />} />
              <Route path="/signin" element={<SignIn setUser={setUser} />} />
            </>
          )
        }
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App