import { AiFillHome } from 'react-icons/ai';
// import { MdNotificationAdd } from 'react-icons/md';
// import { TiArrowForward } from 'react-icons/ti';
import {ImProfile} from 'react-icons/im'
import { MdPending } from 'react-icons/md';
import {ImStatsBars} from "react-icons/im"

/* 
***************************************
    ** User **
    contains all the links(buttons) of the small sidebar(left side bar)
***************************************
*/

const links=[
    // {id:5,
    //     icon:<Images/>},
    {id:1,
    text:'Stats',
    path:'/dashboard',
    icon:<ImStatsBars/>},


     {id:2,
    text:'pending',
    path:'pending',
    icon:<MdPending />},

    {id:3,
    text:'Profile',
    path:'Profile',
        icon: <ImProfile />
    },
    {id:4,
    text:'Submission form',
    path:'home',
    icon:<AiFillHome/>},
    


];





export default links;