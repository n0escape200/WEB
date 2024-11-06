import "./Navbar.css"
import {useNavigate} from "react-router";
import {useState} from "react";
import Cookies from "js-cookie"
import {useJwt} from "react-jwt"
import {faChevronRight} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UserSubmenu from "../UserSubmenu/UserSubmenu";


const Navbar = ()=>{
    const navigate = useNavigate()

    // eslint-disable-next-line no-unused-vars
    const [user,userSet] = useState(null)

    //@ts-ignore
    // eslint-disable-next-line no-unused-vars
    const { decodedToken, isExpired } = useJwt(Cookies.get("User")) //To get the data 'decodedToken.findUser' and the access what data u want to. Check schema or DB

    const [userSelect,userSelectSet] = useState(false)

    // @ts-ignore
    return <div style={{zIndex:1}} className="navbar">
        <div className="left">
            <span style={{
                fontSize:32,
            }}>Automotive</span>
            <span>New</span>
            <span>Used</span>
            <span>Rent</span>
        </div>
        <div className="right">
            {decodedToken ? <div style={{display:"flex", gap:5, position:"relative", border:"1px solid black", padding:5, borderRadius:"10px 10px 0 0"}}>
                <div className={`${userSelect ? "arrowSelect":"arrowDeselect"}`}><FontAwesomeIcon icon={faChevronRight} /></div>
                <span onClick={()=>userSelectSet(!userSelect)} className={`${userSelect ? "userSelected":"user"}`}>{
                    //@ts-ignore
                    decodedToken.findUser.username}</span>
                <div className={userSelect ? "optionMenu":"optionMenuClose"} style={{position: "absolute", top:35, left:-1}}><UserSubmenu/></div>
            </div> : <>
                <div style={{
                    display: "inline-flex"
                }}>
                    <a className={"auth"} onClick={() => {
                        navigate("/auth:login")
                    }}>Login</a>
                    <span>/</span>
                    <a className={"auth"} onClick={() => {
                        navigate("/auth:register")
                    }}>Register</a>
                </div>
            </>}
        </div>
    </div>
}

export default Navbar