import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      TRANSCRIPT DIGITA
      <Link to="/login">Login</Link>
      <Link to="/signup">Register</Link>
    </div>
  )
}

export default Home
