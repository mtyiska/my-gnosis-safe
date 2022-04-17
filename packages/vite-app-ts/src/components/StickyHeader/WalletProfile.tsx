import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { useSignerAddress } from 'eth-hooks';
import { useEthersContext, useBlockNumberContext } from 'eth-hooks/context';
import { TCreateEthersModalConnector } from 'eth-hooks/models';
import { Signer } from 'ethers';
import React, { FC, useState, ReactElement,useContext, useEffect } from 'react';
import { useThemeSwitcher } from 'react-css-theme-switcher';
import { useDebounce } from 'use-debounce';
import { Alert } from 'antd';
import { getNetwork } from '@ethersproject/networks';
import {StickyHeaderContext} from "./StickyProfileContext"

import { Address, Balance, Wallet } from 'eth-components/ant';
import { FaEthereum, FaUserCircle } from 'react-icons/fa';


export interface IAccountProps {
  ensProvider: StaticJsonRpcProvider | undefined;
  localProvider?: StaticJsonRpcProvider | undefined;
  createLoginConnector?: TCreateEthersModalConnector;
  address?: string;
  signer?: Signer;
  hasContextConnect: boolean;
  fontSize?: number;
  blockExplorer: string;
  price: number;
  scaffoldAppProviders: any;
}


const WalletProfile: FC<IAccountProps> = (props: IAccountProps) => {
  const blockNumber = useBlockNumberContext();
  const ethersContext = useEthersContext();
  const showLoadModal = !ethersContext.active;
  const [connecting, setConnecting] = useState(false);
  const selectedChainId = ethersContext.chainId;
  const {displayAccount,setNetworkDisplay, setDisplayAccount, networkDisplay} = useContext(StickyHeaderContext)


  const [signerAddress] = useSignerAddress(props.signer);
  const address = props.address ?? signerAddress;
  const [resolvedAddress] = useDebounce<string | undefined>(
    props.hasContextConnect ? ethersContext.account : address,
    200,
    {
      trailing: true,
    }
  );

  const [resolvedSigner] = useDebounce<Signer | undefined>(
    props.hasContextConnect ? ethersContext.signer : props.signer,
    200,
    {
      trailing: true,
    }
  );


  const { currentTheme } = useThemeSwitcher();

  useEffect(() =>{
    let networkD;
   if (selectedChainId && selectedChainId !== props.scaffoldAppProviders.targetNetwork.chainId) {
     const description = (
       <div>
         You have <b>{getNetwork(selectedChainId)?.name}</b> selected and you need to be on{' '}
         <b>{getNetwork(props.scaffoldAppProviders.targetNetwork)?.name ?? 'UNKNOWN'}</b>.
       </div>
     );
     networkD = (
       <div style={{ zIndex: 2, position: 'absolute', right: 0, top: 90, padding: 16 }}>
         <Alert message="⚠️ Wrong Network" description={description} type="error" closable={false} />
       </div>
     );
      if(setNetworkDisplay !== undefined){
        setNetworkDisplay(networkD);
      }
   } else {
    networkD = (
       <div
         style={{
           color: props.scaffoldAppProviders.targetNetwork.color,
         }}>
         {props.scaffoldAppProviders.targetNetwork.name}
       </div>
     );
        if(setNetworkDisplay !== undefined){
          setNetworkDisplay(networkD);
        }
   }
  }, [])

   const setDisplay = () =>{
    if(setDisplayAccount !== undefined){
      setDisplayAccount(!displayAccount);
    }
   }

  return (
    <>
      <div>
        {!showLoadModal  && (
          <button
          onClick={setDisplay} 
          className="cursor-pointer">
            <FaUserCircle size={32} color="blue"/>
          </button>
        )}
      </div>
    </>
  );
};

export default WalletProfile;