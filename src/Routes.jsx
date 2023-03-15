import React from "react";
import {Routes, Route} from 'react-router-dom';
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Authenticate from "./pages/Auth/Authenticate";

const AllRoutes=()=>{
    return(
        <div>
        <Routes>
          <Route path='/' component={Home}/>
          <Route path='/Auth' component={Auth}/>
        </Routes>
        </div>
    )
}

export default AllRoutes 