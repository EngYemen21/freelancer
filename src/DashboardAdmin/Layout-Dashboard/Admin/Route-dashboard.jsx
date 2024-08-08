import Sidebar_Dashboard from "../../Component/Sidbar-Dashboard";
import Navbar from "../../Component/Navbar-Dashboard";
import { Routes } from 'react-router-dom';
import { Route } from 'react-router-dom';
import Tableuser from "./View/Tableuser";
import UserBlock from "./View/UserBlock";
import UserPermission from "./View/UserPermissions";
import SkillsUSer from "./View/SkillUser";
import VerifyUser from "./View/VerifyUsers";
import RegRequest from "./View/registrationRequest";
import UserProfile from "./View/UsersProfile";
import { useState } from "react";
import WithdrawalsHistory from './View/Withdrawals/Withdrawal';

export default function Admin() {
    // const [content, setContent] = useState(null);

    return (
      <>
   
 <Sidebar_Dashboard/>
         
         
      </>
    );
  }
  