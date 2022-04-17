import React from "react";

import { FiUsers} from "react-icons/fi";
import {BiSearch} from "react-icons/bi"
import {GiHamburgerMenu} from "react-icons/gi"

const Header = ({setIsOpen, isOpen}:any) =>{
    return (
        <header >
            <div className="bg-black-surface-mike text-gray-100 flex flex-1 justify-between border-b border-gray-700">
                <button onClick={()=>console.log("router here")} className="block p-4 text-black-button-mike font-bold no-underline">Crypto Coders</button>
                
                <button className="md:hidden p-4 focus:outline-none hover:bg-gray-700" onClick={() => setIsOpen(!isOpen)}>
                    <GiHamburgerMenu size="24" className="text-black-button-mike"/>
                </button>
                <div className="hidden md:flex md:items-center p-4 focus:outline-none hover:bg-gray-700">
                    <a href="#" >
                    <FiUsers size="24" className="text-black-button-mike" />
                    </a> 
                </div>
            </div>
        </header>

    );
}

export default Header;

const Search = () => <BiSearch size="16" className="text-black-button-mike"/>