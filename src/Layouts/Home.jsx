import { Routes ,Route, Router } from "react-router-dom";

import Header from './Header';
import HowToWork from "./HowToWork";
import Categoy from "./Category";
import Sliders from "./Slider";


import FAQSection from './FAQSection';

export default function Home(){

    return (
        <>
       
        <Header/>
        <HowToWork/>
        <Categoy/>
        <Sliders/>
        <FAQSection/>
     
   
        </>
    )
}