import {useEffect, useState} from "react";
import "./Auth.css"
import axios from "axios";
import {useNavigate} from "react-router";

const Auth = ({type}) => {
    const navigate = useNavigate();

    const [state, stateSet] = useState(true); //For changing between Login and Register view

    const[loginData,setLoginData] = useState( //For sending data to the API calls
        {
            username:"",
            password:""
        }
    )
    const[registerData,setRegisterdata] = useState( //For sending data to the API calls
        {
            username:"",
            firstname:"",
            lastname:"",
            email:"",
            phone:"",
            password:"",
            password2:"" //For checking when the user is re-writing the password
        }
    )


    const [apiState, apiStateSet] = useState(0) // For handling components depending on the API call's status

    useEffect(() => {
        stateSet(type)
    }, []);

    //@ts-ignore
    const login = async ()=>{  // Function used for handling the API call for Login
        //@ts-ignore
       const isEmpty = Object.values(loginData).some(value => value ==="")
        if(isEmpty){ // Checking first if the JSON we want to send it empty
            console.log("Fill all the fields")
        }else{ // If the JSON has the "username" and "password" fields not empty then we do the API call
            await axios.post("http://localhost:3000/api/user/login",loginData,{withCredentials:true})
                .then(response=>{
                    if(response){
                        apiStateSet(response.status)
                        navigate("/")
                    }
                })
                .catch(error=>{
                   // console.log(error.status)
                    apiStateSet(error.status)
                })
        }
    }

    //@ts-ignore
    const register = async ()=>{
        //@ts-ignore
        const isEmpty = Object.values(registerData).some(value => value ==="")
        if(isEmpty){
            console.log("Fill all the fields")
        }else{
            await axios.post("http://localhost:3000/api/user/register",registerData)
                .then(response=>{
                    stateSet(true)
                })
                .catch(error=>{
                    console.log(error)
                })
        }
    }

    return <div style={{
        display:"flex",
        flexDirection:"column",
        gap:20,
        width:"fit-content",
        padding:30,
        margin:"auto",
        marginTop:"30vh",
        border:"1px solid black",
        borderRadius:20,

    }}>
        {state ? <>
            <div style={{display:"flex", gap:20}}>
                <span>Username</span>
                <input onChange={event => {
                    //@ts-ignore
                    setLoginData({...loginData,username: event.target.value})
                }} style={{float:"right"}}/>
            </div>
            <div>
                <span>Password</span>
                <input onChange={event => {
                    //@ts-ignore
                    setLoginData({...loginData,password:event.target.value})
                }} style={{float:"right"}}/>
            </div>
        </> : <>
            <div>
                <span>Username</span>
                <input onChange={event => {
                    setRegisterdata({...registerData,username: event.target.value})
                }} style={{float: "right"}}/>
            </div>
            <div>
                <span>First name</span>
                <input onChange={event => {
                    setRegisterdata({...registerData,firstname: event.target.value})
                }} style={{float: "right"}}/>
            </div>
            <div>
                <span>Last name</span>
                <input onChange={event => {
                    setRegisterdata({...registerData,lastname: event.target.value})
                }} style={{float: "right"}}/>
            </div>
            <div>
                <span>Email</span>
                <input onChange={event => {
                    setRegisterdata({...registerData,email: event.target.value})
                }} style={{float: "right"}}/>
            </div>
            <div>
                <span>Phone</span>
                <input onChange={event =>{
                    setRegisterdata({...registerData,phone: event.target.value})
                }} style={{float: "right"}}/>
            </div>
            <div>
                <span>Password</span>
                <input onChange={event =>{
                    setRegisterdata({...registerData,password: event.target.value})
                }} style={{float: "right"}}/>
            </div>
            <div>
                <span>Re-enter password</span>
                <input onChange={event => {
                    setRegisterdata({...registerData,password2: event.target.value })
                }} style={{float: "right"}}/>
            </div>
        </>}
        <button onClick={()=>{
            if(state) {
                login()
            }else {
                register()
            }
        }} style={{fontSize:26}}>{state ? "Login" : "Register"}</button>
        <span onClick={() => {
            stateSet(!state)
        }} className={"state"}>{state ? "Don't have an account?":"Already have an account?"}</span>
    </div>
}

export default Auth;
