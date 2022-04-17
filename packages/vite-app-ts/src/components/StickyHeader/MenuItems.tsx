import React, {FC} from 'react'
import { Link } from 'react-router-dom';

export interface IMenuProps {
    route: string;
    setRoute: React.Dispatch<React.SetStateAction<string>>;
}

const MenuItems: FC<IMenuProps> = (props:IMenuProps) => {
  return (
    <div className="flex mt-1 text-lg">
        <button onClick={()=>console.log("router here")} className="block text-black-button-mike font-bold no-underline">MultiSig Wallet</button>
        {/* <Link to="/" >
            <span className="mr-4 text-white hover:border-b-2 border-pink-500 py-4" onClick={(): void => {
                props.setRoute('/');
            }}>
            Home
            </span>
        </Link>
        <Link to="/create">
            <span className="mr-6 text-white hover:border-b-2 border-pink-500 py-4" onClick={(): void => {
                props.setRoute('/create');
            }}>
            Create
            </span>
        </Link>
        <Link to="/sign">
            <span className="mr-6 text-white hover:border-b-2 border-pink-500 py-4" onClick={(): void => {
                props.setRoute('/sign');
            }}>
            Sign
            </span>
        </Link>
        <Link to="/verify">
            <span className="mr-6 text-white hover:border-b-2 border-pink-500 py-4" onClick={(): void => {
                props.setRoute('/verify');
            }}>
            Verify
            </span>
        </Link> */}
    </div>
  )
}

export default MenuItems