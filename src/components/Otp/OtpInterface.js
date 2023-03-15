/*import React,{useEffect,useState} from "react";
import {Grid,TextField,Button} from "@mui/material";
import { fontFamily } from "@mui/system"
import UserDetailsDrawer from './UserDetailsDrawer';
import { postData } from "../../Services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";


export default function OtpInterface(props){
    var [txtOne,setTxtOne]=useState('')
    var [txtTwo,setTxtTwo]=useState('')
    var [txtThree,setTxtThree]=useState('')
    var [txtFour,setTxtFour]=useState('')
    var [seconds,setSeconds]=useState(true)
    var [time,setTime]=useState(10)
    var [refresh,setRefresh]=useState(false)
    const [inputOtp,setInputOtp]=useState('')
    var interval
    var [status,setStatus]=useState(false)
    var [userDetails,setUserDetails]=useState({})
    var navigate=useNavigate()
    var dispatch=useDispatch()
    
    useEffect(function(){
     myTimer()
     fetchUserDetails()
    },[])


    const fetchUserDetails=async()=>{
        var result=await postData('user/email-send',{mobileno:props.mobile})
        setUserDetails(result)


    }

    const handleTextOneChange=(event)=>{
       
        if(event.target.value.length>=1)
        {
         //alert(event.target.value)
         setTxtOne(event.target.value)
         document.getElementById('t2').focus()
        }
    }

    const handleTextTwoChange=(event)=>{
        if(event.target.value.length>=1)
        {
         setTxtTwo(event.target.value)
         document.getElementById('t3').focus()
        }
    }

    const handleTextThreeChange=(event)=>{
        if(event.target.value.length>=1)
        {
         setTxtThree(event.target.value)
         document.getElementById('t4').focus()
        }
    }

    const handleTextFourChange=(event)=>{
        if(event.target.value.length>=1)
        {
         setTxtFour(event.target.value)
         setInputOtp(txtOne+txtTwo+txtThree+event.target.value)
         props.onChange(txtOne+txtTwo+txtThree+event.target.value)
        }
    }
    
    const verifyOtp=()=>{
        alert(props.getOtp+"  "+props.generatedOtp)
        if(props.getOtp == props.generatedOtp)
        {
            alert(userDetails.status)
            if(userDetails.status)
            {
                props.handleClose()
                dispatch({type:'ADD_USER',payload:[props.mobile,userDetails.data]})
                //alert("move to next page")
                navigate('/vehicledetailcomponent')
            }
            else
            {
                setStatus(true)
                //props.handleClose()
            }
            
            
        }
        else
        {
            alert("Incorrect")
        }
    }
    const myTimer=()=>{
        if(seconds)
        {
            var t=time
            interval=setInterval(()=>{
              
              
              if(t>=1)
              {
                
                t=t-1
                setTime(t)
                //console.log(time)
              }
              else{
                clearInterval(interval)
                setSeconds(false)
              }
            },1000)
            setRefresh(!refresh)
        }
           
    }
    
    const handleClick=()=>{ 
        setStatus(true)
     }
     const handleStatus=()=>{ 
      setStatus(false)
   }

    return(
        <div>
            <Grid container spacing={3} style={{width:300,padding:20,fontFamily:'Poppins',fontSize:4, fontWeight:'bold'}}>
                <Grid item xs={3}>
                    <TextField id="t1" 
                     InputProps={{
                            style: {fontFamily:'Poppins',fontWeight:900}
                    }} 
                    onChange={handleTextOneChange}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="t2" 
                        InputProps={{
                        style: {fontFamily:'Poppins',fontWeight:900}
                             }} 
                        onChange={handleTextTwoChange}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="t3" 
                     InputProps={{
                        style: {fontFamily:'Poppins',fontWeight:900}  
                      }} 
                    onChange={handleTextThreeChange}/>
                </Grid>
                <Grid item xs={3}>
                    <TextField id="t4"
                      InputProps={{
                       style: {fontFamily:'Poppins',fontWeight:900}
                    }}  
                    onChange={handleTextFourChange}/>
                </Grid>
                <Grid item xs={12}>
                    <div style={{fontSize:10}}>
                        {seconds ? <div> Waiting for OTP .......{time} </div> :
                         <div style={{cursor:'pointer'}} onClick={props.GenerateOtp}> Resend OTP </div>}

                    </div>

                </Grid>
                <Grid item xs={12}>
                <Button onClick={verifyOtp} style={{background: "linear-gradient(270deg,#1caba2,20%,#1c7fab)"}} fullWidth variant="contained">Verify</Button>

                </Grid>
            </Grid>
            <UserDetailsDrawer mobile={props.mobile} status={status} handleStatus={handleStatus}/>
        </div>

    )

}*/