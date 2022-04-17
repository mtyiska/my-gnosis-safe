import React from 'react'
import { useEthersContext } from 'eth-hooks/context';
import { getNetwork } from '@ethersproject/networks';
import { Alert } from 'antd';

export interface IStickyHeaderProps {
    scaffoldAppProviders: any;
}

const NetworkDisplay:React.FC<IStickyHeaderProps> = (props) => {
    const {scaffoldAppProviders} = props
    const ethersContext = useEthersContext();
    const selectedChainId = ethersContext.chainId;
      /**
   * display the current network on the top left
   */
   let networkDisplay: React.ReactElement | undefined;
   if (selectedChainId && selectedChainId !== scaffoldAppProviders.targetNetwork.chainId) {
     const description = (
       <div>
         You have <b>{getNetwork(selectedChainId)?.name}</b> selected and you need to be on{' '}
         <b>{getNetwork(scaffoldAppProviders.targetNetwork)?.name ?? 'UNKNOWN'}</b>.
       </div>
     );
     networkDisplay = (
       <div style={{ zIndex: 2, position: 'absolute', right: 0, top: 90, padding: 16 }}>
         <Alert message="⚠️ Wrong Network" description={description} type="error" closable={false} />
       </div>
     );
   } else {
     networkDisplay = (
       <div
       className='bg-orange-600 shadow-lg shadow-gray-300 py-2 px-8 rounded-md hidden md:block'>
         {scaffoldAppProviders.targetNetwork.name}
       </div>
     );
   }
  return (
    <div>NetworkDisplay</div>
  )
}

export default NetworkDisplay