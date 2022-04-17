import { BigNumber } from 'ethers';
import Menu  from "./SideBar/Menu";
import StickyHeader from "../StickyHeader/StickyHeader";
import {WalletsList, TransactionList, Home}  from '~~/components/pages/';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import {StateContext} from "../../context/StateContext"
import * as React from "react"
import WalletAccount from '../StickyHeader/WalletAccount';
import {TransactionModal, ReceiveTransactionModal} from "../modal"

export interface IStickyHeaderProps {
    route: string;
    setRoute: React.Dispatch<React.SetStateAction<string>>;
    scaffoldAppProviders: any;
    price: number;
    yourCurrentBalance: BigNumber | undefined;
}

const Layout: React.FC<IStickyHeaderProps> = ({children,...props}) => {
    const {scaffoldAppProviders, price, route, setRoute, yourCurrentBalance} = props;
    const [isOpen, setIsOpen] = React.useState(false);
    const {wallet, setWallet} = React.useContext(StateContext)

    
    return (
        <div className="h-screen">
            <div className="flex flex-col h-full">
            <StickyHeader 
                scaffoldAppProviders={scaffoldAppProviders} 
                    price={price}
                    route={route} 
                    setRoute={setRoute}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    hasWallet={!!wallet.id}
                    />
                    <TransactionModal
                    mainnetProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
                    price={price}
                    />
                    <ReceiveTransactionModal
                    mainnetProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
                    price={price}
                    />
            <Router>            
          
                {wallet && !!wallet.id ? (
                <div className="h-full flex">     
                    <Menu 
                    setRoute={setRoute}
                    isOpen={isOpen}>
                        <WalletAccount
                        ensProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
                        price={price}
                        blockExplorer={scaffoldAppProviders.targetNetwork.blockExplorer}
                        hasContextConnect={true}
                        />
                    </Menu>
            
                    <Switch>
                        <main className='flex-1 overflow-y-auto bg-white-mike px-3 py-2'>
                            <Route exact path="/" render={() => <WalletsList price={price}/>} />
                            <Route exact path="/transaction"render={() =><TransactionList/>}/>
                            <Route exact path="/wallets" render={() => <WalletsList price={price}/>} />
                            <Route path="/sign" render={() => <h1>Sign</h1>} />
                            <Route exact path="/verify" render={() => <h1>Verify</h1>}/>
                        </main>
                    </Switch>
                    
                </div>): <Home/>
                }
            </Router>
            </div>
        </div>
    )
}

export default Layout
