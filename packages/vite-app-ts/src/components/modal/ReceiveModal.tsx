import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {StateContext} from "../../context/StateContext"
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { useEthersContext } from 'eth-hooks/context';
import { Address, Balance } from 'eth-components/ant';
import { useDexEthPrice } from 'eth-hooks/dapps';
import { StaticJsonRpcProvider } from '@ethersproject/providers';
import { useAppContracts } from '~~/config/contractContext';
import { formatEther, parseEther } from '@ethersproject/units';
import { useContractReader, useBalance, useGasPrice, } from 'eth-hooks';
import { BigNumber, ethers } from 'ethers';
import { transactor } from 'eth-components/functions';
import { getNetworkInfo } from '~~/functions';
import { EthComponentsSettingsContext } from 'eth-components/models';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height:500
};

export interface IExampleUIProps {
    mainnetProvider: StaticJsonRpcProvider | undefined;
    price: number;
}
const ReceiveTransactionModal:React.FC<IExampleUIProps> = (props) => {
    const { mainnetProvider, price } = props;
    const ethComponentsSettings = React.useContext(EthComponentsSettingsContext);
    const ethersContext = useEthersContext();
    const yourContract = useAppContracts('YourContract', ethersContext.chainId);
    const [balance] = useBalance(yourContract?.address);
    const [ethAmount, setEthAmount] = React.useState<Number | String>(0);
    
    // const [resolvedAddress] = useDebounce<string | undefined>(ethersContext.account,
    //     200,
    //     {
    //       trailing: true,
    //     }
    //   );
    const [gasPrice] = useGasPrice(ethersContext.chainId, 'fast', getNetworkInfo(ethersContext.chainId));
    const {isReceiveModalOpen, setIsReceiveModalOpen} = React.useContext(StateContext)
    const scaffoldAppProviders = useScaffoldAppProviders();
    const [ethPrice] = useDexEthPrice(scaffoldAppProviders.mainnetAdaptor?.provider, scaffoldAppProviders.targetNetwork);
    const tx = transactor(ethComponentsSettings, ethersContext?.signer, gasPrice);

  return (
    <div>
      <Modal
        open={isReceiveModalOpen}
        onClose={() => setIsReceiveModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className='flex flex-col space-y-3'>
                <div className='border-b-2'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                   Fund Wallet
                    </Typography>
                </div>
                <div className='flex flex-col'>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        This is the address of your Safe. Deposits funds by copying the address below.
                    </Typography>
                </div>
                <div className="px-4 py-4 text-sm text-center text-gray-700">
                    <Address address={yourContract?.address} ensProvider={mainnetProvider} fontSize={24} />
                </div>
                <div className="flex-row px-4 text-sm text-center text-gray-700 "> 
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Balance
                    </Typography>         
                    <Balance balance={parseEther(ethers.utils.formatEther(balance).toString())} price={price} address={yourContract?.address} />
                </div>

            

                <div className="px-4 py-8 text-sm text-center text-gray-700">
                    <input className='border-2 w-full p-4' placeholder='Amount'
                        onChange={(e)=> {
                        if(isNaN(Number(e.target.value)))return
                        setEthAmount(e.target.value)
                      }}
                      value={ethAmount?.toString()}
                    />
                </div>

                <div className='flex justify-center'>
                    <button 
                        onClick={() => {
                        
                            if (tx&&yourContract && ethersContext.account && ethAmount) {
                              tx(yourContract.transferEther({ value: ethers.utils.parseEther(ethAmount.toString()) }));
                              setEthAmount(0)
                            }
                          }} className="px-5 bg-green-500 rounded-md shadow-lg w-full py-3 shadow-gray-300">
                        
                        
                        Send Eth
                    </button>
                </div>
            </div>
            
        </Box>
      </Modal>
    </div>
  );
}

export {ReceiveTransactionModal}
