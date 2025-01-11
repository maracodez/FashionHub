//import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './home.module.css'
import hub from '../../assets/hub.png'


const Home = () => {
	const navigate = useNavigate()

  const handleNavigation  = () => {
     navigate("/signup")
  }

  return (
    <div className={styles.home}>
      <img src={hub} alt="hub" id={styles.hub}/>
      <p>All sewing and accessories...</p>
      <button onClick={handleNavigation}>Get Started</button>
    </div>
  )
}

export default Home
