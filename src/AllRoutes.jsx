import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Questions from "./pages/Questions/Questions";
import AskQuestion from "./pages/AskQuestion/AskQuestion";
import DisplayQuestion from "./pages/Questions/DisplayQuestion";
import Tags from './pages/Tags/Tags';
import Users from "./pages/Users/Users";
import UserProfile from "./pages/UserProfile/UserProfile";
import PricingPlans from "./pages/PricingPlans/PricingPlans";
import Community from "./pages/Community/Community";
import FindFriends from "./pages/FindFriends/FindFriends";
import FriendsHome from './pages/Friends/Friends'


const AllRoutes=()=>{
    return(
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/Auth' element={<Auth/>}/>
            <Route path='/Questions' element={<Questions/>}/>
            <Route path='/AskQuestion' element={<AskQuestion/>}/>
            <Route path='/Questions/:id' element={<DisplayQuestion/>}/>
            <Route path='/Tags' element={<Tags/>}/>
            <Route path='/Users' element={<Users/>}/>
            <Route path='/Users/:id' element={<UserProfile/>}/>
            <Route path='/PricingPlans' element={<PricingPlans/>}/>
            <Route path='/Community' element={<Community/>}/>
            <Route path="/Friends" element={<FriendsHome/>} />
            <Route path='/FindFriends' element={<FindFriends/>} />
    

        </Routes>
    )
}
export default AllRoutes;
