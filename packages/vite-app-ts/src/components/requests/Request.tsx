import * as React from 'react';
import { Typography } from "@mui/material";
import {TransactionType} from "../../context/StateContext"

const Request: React.FC<TransactionType> = (props) => {
    const {id,from, to,walletId,value,message} = props
  return (
    <div className='flex flex-col space-y-3 p-8 border-2'>
        <div className='border-b-'>
            <Typography id="modal-modal-title" variant="h6" component="h2">
                <div className='text-black'>
                    Pending Request # {id}
                </div>
            </Typography>
        </div>
        <div className='flex flex-col'>
            <Typography id="modal-modal-title"  >
                To: {to}
            </Typography>
            <Typography id="modal-modal-title"  >
                From: {from}
            </Typography>
            <Typography id="modal-modal-title"  >
                Amount: {value}
            </Typography>
            <Typography id="modal-modal-title"  >
                Messgae: {message}
            </Typography>
        </div>

        <div className='flex justify-center space-x-4'>
            <button 
                className="px-8 bg-red-500 rounded-md shadow-lg py-3 shadow-gray-300">
                Reject
            </button>
            <button 
                className="px-8 bg-green-500 rounded-md shadow-lg py-3 shadow-gray-300">
                Confirm
            </button>
        </div>
    </div>
  )
}

export default Request