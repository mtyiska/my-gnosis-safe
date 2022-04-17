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
import { useContractReader, useBalance } from 'eth-hooks';
import { BigNumber, ethers } from 'ethers';

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

const TransactionModal:React.FC<IExampleUIProps> = (props) => {
    const { mainnetProvider, price} = props;
    const ethersContext = useEthersContext();
    const yourContract = useAppContracts('YourContract', ethersContext.chainId);
    const {isSendModalOpen, setIsSendModalOpen, transaction,setTransaction, wallet} = React.useContext(StateContext)
    const scaffoldAppProviders = useScaffoldAppProviders();
    const [to, setTo] = React.useState('')
    const [message, seteMessage] = React.useState('')
    const [value, setValue] = React.useState(0)
    

    const handleTransaction = () =>{
      setTransaction([...transaction, {id:Math.random(),walletId: wallet.id,to,from:yourContract?.address,value, message:''}])
      setIsSendModalOpen(false)
    }
  

  
  return (
    <div>
      <Modal
        open={isSendModalOpen}
        onClose={() => setIsSendModalOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <div className='flex flex-col space-y-2'>
                <div className='border-b-2'>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Request Funds
                    </Typography>
                </div>
                
                <div className='flex flex-col'>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Requesting Funds From:
                    </Typography>

                    <div className="px-4 py-2 text-sm text-center text-gray-700">
                      <Address address={yourContract?.address} ensProvider={mainnetProvider} fontSize={16} />
                    </div>
                </div>

                <input className='border-2 w-full p-4' placeholder='Recipient' onChange={(e) => setTo(e.target.value)}/>
                <input className='border-2 w-full p-4' placeholder='Amount' onChange={(e) => setValue(Number(e.target.value))}/>
                  <textarea value={message} className='border-2 w-full p-4' placeholder='comment' onChange={(e) => seteMessage(e.target.value)}/>
                <div className='flex justify-center'>
                    <button 
                        onClick={handleTransaction}
                        className="px-5 bg-green-500 rounded-md shadow-lg w-full py-3 shadow-gray-300">
                        Submit Request
                    </button>
                </div>
            </div>
            
        </Box>
      </Modal>
    </div>
  );
}

export {TransactionModal}
