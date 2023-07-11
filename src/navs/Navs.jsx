import { Link, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import SignIn from "../pages/SignIn"
import Room from '../pages/Room'
import SingleChat from "../pages/SingleChat"

function Navs(){
    return(
        <div>
            <div className="d-flex justify-content-around bg-black py-2 fs-3">
                <Link to={'/'}>Home</Link>
                <Link to={'/liveRoom'}>Live Room</Link>
                <Link to={'/signIn'}>signIn</Link>
            </div>
            <div className="container py-2">

            <Routes>
                
                <Route path="/" element={<Home/>} />
                <Route path="/signIn" element={<SignIn/>} />
                <Route path="/liveRoom" element={<Room/>} />
                <Route path="/singleChat/:targetUser" element={<SingleChat/>} />
            </Routes>
            </div>
        </div>
    )
}
export default Navs