import React, { useState } from "react";
import './PricingPlans.css';
import { useDispatch,useSelector } from "react-redux"
import { useNavigate } from "react-router-dom";
import { userPayment } from "../../actions/payment";


const PricingPlans = () =>  {
    const [goldamount,setGoldAmount]=useState('1000')
    const [silveramount,setSilverAmount]=useState('100')
    const [planName, setPlanName] = useState('Free')
    const [planAmount, setPlanAmount] = useState('0')
    const [planStatus, setPlanStatus] = useState('Not active')
    const [payId,setPayId]=useState('')

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const User = useSelector((state) => (state.currentUserReducer))
     
    var noOfQuestions = ' '
    const handleFreePlan=(e)=>{
        e.preventDefault();
        const noOfQuestions= 1 //--users can ask only in 1 day
        var plan="Free"
        var planamount=0
        var planstatus="Active"
        dispatch(userPayment({userId: User?.result._id, payId,planName:plan, planAmount:planamount, planStatus:planstatus, noOfQuestions:noOfQuestions}, navigate('/AskQuestion')))
        window.location.reload()
        //navigate("/AskQuestion")
        
      }

    const handleGoldPlan=(e)=>{
        e.preventDefault();
        const noOfQuestions= -1
        var plan="Gold"
        var planamount=1000
        var planstatus="Active"
        Payment(goldamount,plan,planamount,planstatus,noOfQuestions)
        //window.location.reload()
        //dispatch(userPayment({userId: User?.result._id, payId, planName:plan, planAmount:planamount, planStatus:planstatus,noOfQuestions:noOfQuestions}, navigate('/AskQuestion')))
      }

    const handleSilverPlan= async(e)=>{
        e.preventDefault();
        const noOfQuestions= 5
        var plan="Silver"
        var planamount=100
        var planstatus="Active"
       
        //alert(plan)
        //setPlanName(plan)
        //setPlanAmount(silveramount)
        //setPlanStatus("active")
         Payment(silveramount,plan,planamount,planstatus,noOfQuestions)
      
         
         //dispatch(userPayment({userId: User?.result._id, payId,planName:plan, planAmount:planamount, planStatus:planstatus,noOfQuestions:noOfQuestions}, navigate('/AskQuestion')))
      }
   
      

    const Payment = (amount,plan,planamount,planstatus, noOfQuestions) => {
        var success = false
         var options= {
                key:"rzp_test_GQ6XaPC6gMPNwH",
                key_secret:" ",
                amount:amount*100,
                currency:"INR",
                name:"STACK OVERFLOW SUBSCRIPTIONS",
                description:"For testing purpose",
                handler: function(response){
                    alert(response.razorpay_payment_id);
                    success = true
                    alert("Your payment is successful")
                    console.log("Result:",success)
                    dispatch(userPayment({userId: User?.result._id, payId, planName:plan, planAmount:planamount, planStatus:planstatus,noOfQuestions:noOfQuestions}, navigate('/AskQuestion')))
                    window.location.reload()
                    //navigate('/AskQuestion')
                },
            prefill : {
                name:"Stack Overflow",
                email:"stackoverflow_project@gmail.com",
                contact:"9000000000"
            },
        notes: {
            address:"Razorpay Corporate Office"
        },
         theme : {
            color : "#3399cc"
         }            
        };
        var pay= new window.Razorpay(options);
        pay.open();
        }



    return(
        <div class="main-container">
        <div class="main-class">
        <div class="wrapper">
        <div class="table basic">
            <div class="price-section">
                <div class="price-area">
                    <div class="inner-area">
                        <span class="text">
                          &#8377;
                        </span>
                        <span class="price">0</span>
                        <span class="month">
                           /month
                        </span>
                    </div>
                </div>
            </div>
            <div class="package-name">
     
            </div>
            <div class="features">
                <li>
                    <span class="list-name">Post one question in a day</span>
                    <span class="icon check"><i class="fas fa-check-circle"></i></span>
                </li>
                <li>
                    <span class="list-name">Get answers </span>
                    <span class="icon check"><i class="fas fa-check-circle"></i></span>
                </li>
                <li>
                    <span class="list-name">Dedicated chat support</span>
                    <span class="icon cross"><i class="far fa-times-circle"></i></span>
                </li>
                <li>
                    <span class="list-name">Access our services free of cost</span>
                    <span class="icon cross"><i class="far fa-times-circle"></i></span>
                </li>
                <div class="btn"><button onClick={handleFreePlan}>Try Now </button></div>
            </div>
        </div>
        <div class="table Premium">
            <div class="price-section">
                <div class="price-area">
                    <div class="inner-area">
                        <span class="text">
                          &#8377;
                        </span>
                        <span class="price">100</span>
                        <span class="month">
                           /month
                        </span>
                    </div>
                </div>
            </div>
            <div class="package-name">
             
            </div>
            <div class="features">
                <li>
                    <span class="list-name">Post 5 questions in a day</span>
                    <span class="icon check"><i class="fas fa-check-circle"></i></span>
                </li>
                <li>
                    <span class="list-name">Get answers</span>
                    <span class="icon check"><i class="fas fa-check-circle"></i></span>
                </li>
                <li>
                    <span class="list-name">Dedicated chat support</span>
                    <span class="icon check"><i class="fas fa-check-circle"></i></span>
                </li>
                <li>
                    <span class="list-name">Monthly payment system</span>
                    <span class="icon cross"><i class="far fa-times-circle"></i></span>
                </li>
                <div class="btn"><button onClick={handleSilverPlan}>Try now</button></div>
            </div>
        </div>
        <div class="table Ultimate">
            <div class="price-section">
                <div class="price-area">
                    <div class="inner-area">
                        <span class="text">
                           &#8377;
                        </span>
                        <span class="price">1000</span>
                        <span class="month">
                           /month
                        </span>
                    </div>
                </div>
            </div>
            <div class="package-name">
                
            </div>
            <div class="features">
                <li>
                    <span class="list-name">Post unlimited questions in a day</span>
                    <span class="icon check"><i class="fas fa-check-circle"></i></span>
                </li>
                <li>
                    <span class="list-name">Get your answers </span>
                    <span class="icon check"><i class="fas fa-check-circle"></i></span>
                </li>
                <li>
                    <span class="list-name">Dedicated chat support</span>
                    <span class="icon check"><i class="fas fa-check-circle"></i></span>
                </li>
                <li>
                    <span class="list-name">Monthly payment system</span>
                    <span class="icon check"><i class="fas fa-check-circle"></i></span>
                </li>
                <div class="btn"><button onClick={handleGoldPlan}>Try Now</button></div>
            </div>
        </div>
    </div>
</div>
</div>
    )
}

export default PricingPlans

// onClick={()=>navigate('/AskQuestion')










/*<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pricing</title>
    <link rel="stylesheet" href="./pricing.css">
    <script src="https://kit.fontawesome.com/66aa7c98b3.js" crossorigin="anonymous"></script>
</head>
<body>
   
</body>
</html>*/

