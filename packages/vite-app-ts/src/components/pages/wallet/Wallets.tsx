import * as React from "react";
import { 
  Box, 
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import {StateContext, WalletsType} from "../../../context/StateContext"
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { useEthersContext } from 'eth-hooks/context';

import {Balance } from 'eth-components/ant';
import { useAppContracts } from '~~/config/contractContext';
import { parseEther } from '@ethersproject/units';
import { useBalance } from 'eth-hooks';
import { ethers } from 'ethers';
import Request from "~~/components/requests/Request";

export interface IWalletProps {
    price: number;
}

export const WalletsList: React.FC<IWalletProps> = (props) => {
    const {price} = props;
    const {wallet, setIsSendModalOpen, setIsReceiveModalOpen, transaction} = React.useContext(StateContext)
    const scaffoldAppProviders = useScaffoldAppProviders();
    const [address, setAddress] = React.useState('')
    const ethersContext = useEthersContext();
    const yourContract = useAppContracts('YourContract', ethersContext.chainId);
    const [balance] = useBalance(yourContract?.address);

  
    React.useEffect(() =>{
        updateAddress()
    }, [scaffoldAppProviders])

   async function updateAddress(){
    const a = await scaffoldAppProviders.currentProvider?.listAccounts();
    if(a){
        setAddress(a[0])
        console.log("ADDRES CHANGE", a[0])
    }
   }

//    const data = wallet.filter(i=>i.owners.includes(address))
   const data = wallet.owners.map(i=>{
        if(i === address){
        return wallet
        }
    })

  


  // React.useEffect(() =>{
  //   run(api.getAllProfiles())
  // }, [])

 
  // React.useEffect(() =>{
  //   if(isSuccess){
  //     const result = Object.keys(data).map((row) => data[row]);
  //     setTableData(result)
  //     console.log(result)
  //   }
  // }, [data])

  // if (isLoading) {
  //   return (
  //     <Box sx={{ alignItems: "center", display: "flex", justifyContent: "center", padding: "50px 0", width: "100%" }}>
  //       <CircularProgress />
  //     </Box>
  //   );
  // }

  if(!ethersContext.account){
      return <div>No Data</div>
  }
  console.log("TRANSACTIONS", transaction)
  

  return (
    <Box>
        <div className="flex flex-col space-y-8 ">  
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell >Required Signatures</TableCell>
                    <TableCell >Name</TableCell>
                    <TableCell >Balance</TableCell>
                    <TableCell ></TableCell>
                    <TableCell ></TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
            
                {!!data[0] &&(
                    <TableRow
                    key={data[0]!.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {data[0]!.id}
                    </TableCell>
                    <TableCell >{ `${data[0]!.requiredSignatures} of ${data[0]!.owners.length}`}</TableCell>
                    <TableCell >{data[0]!.walletName}</TableCell>
                    <TableCell >
                    <Balance balance={parseEther(ethers.utils.formatEther(balance).toString())} price={price} address={yourContract?.address} fontSize={14}/>
                    </TableCell>
                    <TableCell>
                        <button 
                            onClick={(): void => setIsSendModalOpen(true)}
                            className="px-5 py-2 bg-blue-300 rounded-md shadow-lg shadow-gray-300">
                            Send
                            </button>
                        </TableCell>
                        <TableCell>
                        <button 
                            onClick={(): void => setIsReceiveModalOpen(true)}
                            className="px-5 py-2 bg-green-500 rounded-md shadow-lg shadow-gray-300">
                            Receive
                            </button>
                        </TableCell>

                    </TableRow>
                )} 
                </TableBody>
            </Table>
        </TableContainer>
        {transaction && transaction.length>0 &&
        <TableContainer component={Paper} className="flex justify-center items-center py-4 px-8">
            {
                <Request 
                id={transaction[0].id}
                to={transaction[0].to}
                from={transaction[0].from}
                value={transaction[0].value}
                walletId={transaction[0].walletId}
                message={transaction[0].message}
                />
            }
        </TableContainer>}
        </div>
    </Box>
  );
};




