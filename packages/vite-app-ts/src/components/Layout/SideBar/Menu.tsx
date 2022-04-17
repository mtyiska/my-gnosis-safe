import * as React from "react";
import { Link } from 'react-router-dom';

import {GrTransaction} from "react-icons/gr"
import {BsWallet2} from "react-icons/bs"
import {StateContext} from "../../../context/StateContext"


interface IMenuProps {
    setRoute: React.Dispatch<React.SetStateAction<string>>;
    isOpen: boolean;
    children:React.ReactChild
  }


const Menu: React.FC<IMenuProps> = (props) =>{   
    const {setRoute, isOpen, children} = props;
    
    return(
        <nav style={{zIndex:2}} className={`bg-white border-r border-gray-300/50 shadow-lg shadow-gray-300 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${isOpen? "translate-x-0":"-translate-x-full"} md:relative md:translate-x-0 transition duration-200 ease-in-out`}> 
            <div className="flex flex-col pb-4 px-3  text-gray-700 no-underline border-b border-gray-300/80 mb-8 space-y-3">
                {children}   
            </div>
            
            <div >
                <Link to="/wallets">
                    <div 
                    className="flex px-3 py-2 space-x-3 rounded transition duration-200 text-gray-700 hover:bg-blue-700 hover:text-gray-200 active:font-semibold no-underline">
                            <span><BsWallet2 size={32} onClick={(): void => {setRoute('/wallets');}}/></span>
                        <h3 className="uppercase tracking-wide font-semibold text-xs active:text-gray-100"> Wallets</h3>
                    </div>
                </Link>
                <Link to="/transaction">
                <div 
                className="flex px-3 py-2 space-x-3 rounded transition duration-200 text-gray-700 hover:bg-blue-700 hover:text-gray-200 active:font-semibold no-underline">
                        <span><GrTransaction size={32} onClick={(): void => {setRoute('/transaction');}}/></span>                
                    <h3 className="uppercase tracking-wide font-semibold text-xs active:text-gray-100"> Transactions</h3>
                </div>
                </Link>

            </div>
        </nav>
    )
}

export default Menu

