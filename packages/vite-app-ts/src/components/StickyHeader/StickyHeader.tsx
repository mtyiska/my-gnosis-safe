import * as React from 'react';
import {GiHamburgerMenu} from "react-icons/gi"
import WalletConnect from './WalletConnect';
import { ThemeSwitcher } from '../common';
import MenuItems from './MenuItems';

export interface IStickyHeaderProps {
    route: string;
    setRoute: React.Dispatch<React.SetStateAction<string>>;
    scaffoldAppProviders: any;
    price: number;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isOpen: boolean;
    hasWallet: boolean;
}

  
const StickyHeader: React.FC<IStickyHeaderProps> = (props) => {
  const {scaffoldAppProviders, route, setIsOpen, setRoute, isOpen, price, hasWallet} = props
  
  React.useEffect(() =>{
    console.log("is Open", isOpen)
  }, [isOpen])
   const MenuComponent = (
    <div><MenuItems
    route={route} 
    setRoute={setRoute}
    /></div>
  );

  const wallectconnect = (<div >
    <WalletConnect
      createLoginConnector={scaffoldAppProviders.createLoginConnector}
      hasContextConnect={true}
      />
  </div>)

  const Mobile = hasWallet && (
    <>
      <button className="md:hidden p-4 focus:outline-none hover:bg-gray-100/20" onClick={() => setIsOpen(!isOpen)}>
        <GiHamburgerMenu size="24" className="text-black-button-mike"/>
      </button>
    </>
  );

  const switcher = (<div ><ThemeSwitcher/></div>)
  return (
      <>
        <nav className='flex w-full py-4 px-4 justify-between p-6 bg-gradient-to-r from-blue-500 to-cyan-500'>
            <div>{MenuComponent}</div>
            <div className='flex items-center justify-between space-x-4'>
                {wallectconnect}
                {Mobile}
                {switcher}
            </div>
        </nav>
      </>
  )
}

export default StickyHeader