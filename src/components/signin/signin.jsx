//import React from 'react'
import styles from './signin.module.css'
import showicon from '../../assets/Group 20.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { auth } from '../js file/auth'
import { signInWithEmailAndPassword} from 'firebase/auth'
import { toast } from 'react-toastify'; 


const Signin = () => {
  const navigate = useNavigate()

  const handlereset  = () => {
     navigate("/change")
  }


 //login function
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSignin = async(e) => {
		e.preventDefault();
		try {
			await signInWithEmailAndPassword(auth, email, password);
			console.log ("user logged in successfully");
			window.location.href = "/dashboard"
			toast.success("user logged in  successfully",{
				position: "top-center",
			})
		} catch (error) {
			console.log(error.message);
			toast.success(error.message,{
				position: "bottom-center",
			})
		}
	}


  return (
    <div className={styles.signin}>
        <div className={styles.signin_pg}>
            <h3>Sign into your account</h3>
            <form onSubmit={handleSignin} className={styles.signin_form}>
                <label id={styles.label}>Email:</label>
                <input 
					type="email" 
					id={styles.input}
					placeholder=' Enter your Email'
				 	required 
					onChange={(e) => setEmail(e.target.value)}
				/>
				<div className={styles.password}>
					<label id={styles.label}>Password:</label>
					<input
						type="password" 
						id={styles.input}  
						required
						onChange={(e) => setPassword(e.target.value)}
					/>
					 <img 
						src={showicon} 
						alt="" 
						id={styles.signineye}
					/>
				</div>
               
				<button id={styles.signinbtn}  type="submit">Sign in</button>
            </form>
			<p 
				onClick={handlereset} 
				id={styles.fgtpw}	
			>Forgot password</p>
        </div>
    </div>
  )
}

export default Signin
