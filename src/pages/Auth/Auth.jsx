import React , {useState} from "react";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import icon from '../../assets/icon.png';
import AboutAuth from './AboutAuth';
import { signup, login  } from "../../actions/auth";
import Chat from "../../Chat";

const Auth = () => {
    const [isSignup,setIsSignup] = useState(false)
    const [isLogin,setIsLogin] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [otpForm,setOtpForm] = useState(false)
    const [enterOtp, setEnterOtp] = useState('')
    const [generatedOtp,setGeneratedOtp] = useState('')
    const [openChatbot,setOpenChatbot]=useState(false)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSwitch = () => {
        
        setIsSignup(!isSignup)
    }

    const handleSubmit = (e) => {
       
        e.preventDefault()
        if(!email && !password){
            alert("Enter email and password")
        }
        if(isSignup){
            if(!name){
                alert("Enter a name to continue")
            }
            dispatch(signup({ name, email, password },navigate))
            
        } else{
             setOtpForm(true)
             const otp = parseInt(Math.random()*8999)+1000
            alert("Your otp for login is : " + otp)
            setGeneratedOtp(otp)
        }  
    }
    
    const verifyOtp=()=>{
        alert("Input OTP : "+ enterOtp +" and Original OTP : "+ generatedOtp)
        if(enterOtp == generatedOtp)
        {
            alert("OTP matched")
            dispatch(login({ email, password }, navigate))
            setIsLogin(true)
            setOpenChatbot(true)
        }
        else
        {
            alert("Incorrect OTP as OTP not matched")
            navigate('/')
            alert("You are not login")
        }
    }
    
    return(
    <section class='auth-section'>
        {
            isSignup && <AboutAuth />
            
        }
        <div class='auth-container-2'>
            { !isSignup && <img src={icon} style={{width:50}} alt='stack overflow' className="login-logo"/>}
            <form onSubmit={handleSubmit}>
                {
                    isSignup && (
                        <label htmlFor='name'>
                            <h4>Display Name</h4>
                            <input type="text" id='name' name='name' onChange={(e)=>{setName(e.target.value)}}/>
                        </label>
                    )
                }
                <label htmlFor="email">
                    <h4>Email</h4>
                    <input type="email" name="email" id='email' onChange={(e)=>{setEmail(e.target.value)}}/>
                </label>
                <label htmlFor="password">
                    <div style={{display:'flex',justifyContent:'space-between'}}>
                        <h4>Password</h4>
                        { !isSignup && <p style={{ color: '#007ac6',fontSize:'13px'}}>Forgot Password ?</p> }
                    </div>
                    <input type="password" name='password' id='password' onChange={(e)=>{setPassword(e.target.value)}}/>
                    { isSignup && 
                        <p style={{ color: '#666767', fontSize:'13px'}}>
                            Passwords must contain atleast eight <br/> characters including atleast 1 letter and 1 <br/> number.
                        </p>
                        }
                </label>
                {
                    isSignup && (
                        <label htmlFor='check'>
                        <input type="checkbox" id='check'/>
                        <p style={{ fontSize:'13px'}}>
                            Opt-in to receive occasional,<br/> product updates, user research invitations ,<br/> company announcements and digests
                        </p>
                    </label>
                    )  
                }
                <button type='submit' className="auth-btn">{ isSignup ? 'Sign up' : 'Log in' }</button>
                {
                    isSignup && (
                        <p style={{ color: '#666767', fontSize:'13px'}}>
                            By clicking "Sign up", you agree to our 
                            <span style={{ color: '#007ac6'}}>terms of <br/> services</span> , 
                            <span style={{ color: '#007ac6'}}>privacy policy</span> and 
                            <span style={{ color: '#007ac6'}}>cookie policy</span>
                        </p>
                    )
                }
                  {
                    otpForm && (
                        <label htmlFor='name'>
                            <h4>Enter OTP</h4>
                            <input type="number" id='enterotp' name='enterotp' style={{width:"30%",marginTop:12}}onChange={(e)=>{setEnterOtp(e.target.value)}}/>
                        </label>
                         
                    )
                   
                }
                {
                    otpForm && (
                        <button type='button' className="handle-switch-btn" onClick={verifyOtp}> VERIFY</button>
                    )
                    
                }
            </form>
            <p>
                {isSignup ? 'Already have an account?' : "Don't have an account ?"}
                <button type='button' className="handle-switch-btn" onClick={handleSwitch}> {isSignup ? "Log in " : "Sign up " }</button>
            </p>
          
       </div>
       {openChatbot && <Chat/> }  
       

    </section>
   
    )
}

export default Auth