//import React from 'react'
import styles from './reset.module.css'
import { useNavigate, useParams } from 'react-router-dom'
import { useState } from 'react'
import { toast } from 'react-toastify'; 
import { confirmPasswordReset, getAuth } from 'firebase/auth';
import {FaEye, FaEyeSlash} from 'react-icons/fa'


const Reset = () => {

  //token from email link
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //set for toggling password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
        toast.error("Passwords do not match.");
        return;
    }
    try {
        //firebase method for resetting password
        const auth = getAuth();
        await confirmPasswordReset(auth, token, password);
        toast.success("Password has been reset successfully.",{
			position: "bottom-center",
		});
        //redirect to login page
        navigate("/signin")
    } catch (error) {
        toast.error(error.message || "Something went wrong")
    }
  }



  return (
    <div className={styles.resetpassword}>
        <div>
            <p id={styles.arrow} onClick={() => navigate(-1)}>&lt;</p>
            <h3>Reset password</h3>
            <form onSubmit={handleResetPassword}>
                <div className={styles.new}>
                    <label>New Password:</label>
                    <input 
                        //toggle b/w  "text" nd "password"
                        type={showPassword ? "text" : "password" }
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span
                        id={styles.pweye}
                        //toggle password visibility
                        onClick={() => setShowPassword(!showPassword)}
                    >{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
                <div className={styles.confirm}>
                    <label>Confirm password:</label>
                    <input
                         //toggle b/w  "text" nd "password"
                        type={showConfirmPassword ? "text" : "password" } 
                        value={password}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                     <span
                        id={styles.cpeye}
                        //toggle password visibility
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >{showConfirmPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
                <button id={styles.resetbtn} type='submit'>Reset password</button>
            </form>
        </div>
    </div>
  )
}

export default Reset
