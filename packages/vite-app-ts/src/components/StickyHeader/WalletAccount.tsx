import React, {useContext} from 'react'
import { Address, Balance } from 'eth-components/ant';
import { FaEthereum, FaUserCircle } from 'react-icons/fa';
import { useDebounce } from 'use-debounce';
import { useEthersContext } from 'eth-hooks/context';
import { useSignerAddress } from 'eth-hooks';
import { Signer } from 'ethers';
import { StaticJsonRpcProvider } from '@ethersproject/providers';

interface IWalletAccountProps {
    ensProvider: StaticJsonRpcProvider | undefined;
    address?: string;
    signer?: Signer;
    hasContextConnect: boolean;
    fontSize?: number;
    blockExplorer: string;
    price: number;
}


const WalletAccount = (props:IWalletAccountProps) => {
    const ethersContext = useEthersContext();
    const [signerAddress] = useSignerAddress(props.signer);
  const address = props.address ?? signerAddress;
    const [resolvedAddress] = useDebounce<string | undefined>(
        props.hasContextConnect ? ethersContext.account : address,
        200,
        {
          trailing: true,
        }
      );

  return (
      <div className="flex flex-col w-full py-2 bg-white rounded-md shadow-xl">
          <div className="flex flex-col px-8 py-3 text-lg text-center bg-gray-100 text-gray-700 items-center space-x-4">
              <div className=''>
              <FaUserCircle size={48}/>
              </div>
  
          </div>
          <div className="px-4 py-8 text-sm text-center text-gray-700">
          {resolvedAddress != null && (
              <Address
              punkBlockie
              address={resolvedAddress}
              fontSize={props.fontSize ?? 12}
              ensProvider={props.ensProvider}
              blockExplorer={props.blockExplorer}
              minimized={false}
          />
          )}
          </div>
          <div className="flex-row px-4 text-sm text-center text-gray-700  content-between space-y-2">          
            <div>
                {resolvedAddress != null && (
                <Balance address={resolvedAddress} price={props.price} fontSize={18} size="short"/>
                )}
            </div>
          </div>
      </div>
  )
}

export default WalletAccount