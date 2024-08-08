import { useEffect, useState } from "react"
import axios from "../../axios/axios";
import { useLocation } from "react-router-dom";

export default function LoginGoogle (){
    const [data,setData]=useState();
    const location =useLocation();
    // const i= location.state ? location.state.id : null;

   
    useEffect(()=>{
        const fun=async()=>{
  const response=await axios.get(`/auth/google/callback${location.search}`);
        const data1=response.data;
        console.log(response);
        console.log(response.data)
        setData(data1);
        }
        fun();
    })
    return (
        <>
        <p>Hello </p>
        </>
    )
}