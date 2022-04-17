import React, { useContext, useState } from 'react'
import {IoIosRemoveCircleOutline} from "react-icons/io"
import {StateContext} from "../../../context/StateContext"
import { useEthersContext } from 'eth-hooks/context';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';


const Home = () => {
    const ethersContext = useEthersContext();
    const scaffoldAppProviders = useScaffoldAppProviders();
    const {wallet, setWallet} = useContext(StateContext)
    const [owners, setOwners] = useState<string[]>([])
    const [currentAddress, setCurrentAddress] = useState<string>('');
    const [requiredSignatures, setRequiredSignatures] = useState<number>(1);
    const [isWalletNameSaved, setIsWalletnameSaved] = useState(false)
    const [walletName, setWalletName] = useState('');
    const maxOwners = 10;
    const [submitted, setSubmitted] = useState(false)

    React.useEffect(() =>{
        updateAddress()
     }, [])
  
     async function updateAddress(){
      const a = await scaffoldAppProviders.currentProvider?.listAccounts();
      if(a)setCurrentAddress(a[0])
     }
  
 
    const handleAddOwner = () =>{
        setOwners([...owners, currentAddress])
        setCurrentAddress('')
    }

    
    const handleSubmit= () =>{
        setSubmitted(true)
        setWallet({
            id: Math.random(),
            walletName,
            balance:0,
            owners,
            requiredSignatures
        })
    }

    const removeOwner = (address:string) =>{
        setOwners(owners.filter((i) =>i !== address))
    }

    
    if(!ethersContext.account){
        console.log("CONTEXT", ethersContext)
        return <div>No Context</div>
      }



  return (
    <div className='flex flex-col px-3 py-4 space-y-2 h-screen'>
        <h1 className='text-3xl font-bold'>Welcome to MultiSig Wallet</h1>
        <div className='text-lg'>
            MultiSig Wallet is the most trusted platform to manage digital assets.
            <p>Here is how to get started</p>
        </div>
        <div className='flex flex-col justify-between shadow-lg border-2 h-full rounded-lg py-4 px-3 overflow-y-hidden'>
            <div className='flex flex-col space-y-3 overflow-y-hidden'>
                <div className='flex space-x-3'>
                    <input type={"text"} disabled={isWalletNameSaved}
                    placeholder="wallet name"
                    onChange={(e)=>setWalletName(e.target.value)}
                    value={walletName}
                    className='border-2 w-52 rounded-md px-2 py-3 text-gray-800'/>

                    <button disabled={isWalletNameSaved}
                    className={`border-2 border-gray-400 w-24 px-3 py-2 bg-green-400 rounded-md text-gray-50 ${isWalletNameSaved&& "bg-gray-400"}`} 
                    onClick={()=>setIsWalletnameSaved(true)}>
                        Save
                    </button>

                </div>
                {isWalletNameSaved &&
                <div className='flex flex-col overflow-y-auto no-scrollbar space-y-4'>
                    {
                        owners.map((item:string, i) =>(
                            <div className='flex space-x-3 py-3 items-center' key={i+1}>
                                <p className='text-lg'>{i+1}</p>
                                <div>
                                    <label className="text-sm" htmlFor='address'>Owner Address</label>
                                    <input type={"text"} placeholder="owner address"
                                    name='address'
                                    value={item}
                                    disabled={true}
                                    className='border-2 w-48 rounded-md px-2 py-3 text-gray-800'/>
                                </div>

                                <IoIosRemoveCircleOutline
                                className='cursor-pointer'
                                onClick={() =>removeOwner(item)}
                                size={24}
                                color={"red"}
                                />
                            </div>
                        ))
                    }
                    {
                        owners.length < maxOwners&&
                        <div className='flex space-x-3 py-3 items-center'>
                            <p className='text-lg'>{owners.length+1}</p>
                            {/* <div className='flex flex-col'>
                                <label className="text-sm" htmlFor='owner'>Owner Name</label>
                                <input type={"text"}
                                value={currentOwner}
                                name="owner"
                                onChange={(e) =>setCurrentOwner(e.target.value)}
                                className='border-2 w-32 rounded-md px-2 py-3 text-gray-800'/>
                            </div> */}
                            
                            <div className='flex flex-col'>
                                <label className="text-sm" htmlFor='address'>Owner Address</label>
                                <input type={"text"} placeholder="owner address"
                                value={currentAddress} 
                                name="address"
                                onChange={(e) =>setCurrentAddress(e.target.value)}
                                className='border-2 w-48 rounded-md px-2 py-3 text-gray-800'/>
                            </div>
                        </div>
                    }
                </div>
                }
                {
                    isWalletNameSaved &&(
                    <div className='flex space-x-4 items-end '>
                        <button 
                        disabled={owners.length >= maxOwners}
                        className={`border-2 border-green-400  rounded-md w-48 px-3 py-2 ${owners.length >= maxOwners&& "bg-gray-400"}`} 
                        onClick={handleAddOwner}>
                            Add Owner(s)
                        </button>

                        <div className='flex flex-col'>
                            <label className="text-sm" htmlFor='numowners'># Required Owners</label>
                            <input type={"text"} placeholder="owner address"
                                value={requiredSignatures} 
                                name="numowners"
                                onChange={(e)=>setRequiredSignatures(Number(e.target.value) >owners.length?owners.length:Number(e.target.value)|| Number(e.target.value) < 1?1:Number(e.target.value))}
                                className='border-2 w-16 rounded-md px-2 py-3 text-gray-800'/>
                        </div>
                    </div>
                    )
                }
            </div>
            <div className='flex py-3 justify-center items-center'>
                <button className={`border-2 border-gray-400  rounded-md w-48 px-3 py-2 bg-green-400 text-gray-50 ${submitted&& "bg-gray-400"}`}
          
                disabled={owners.length < 1 || owners.length > maxOwners || submitted}
                onClick={handleSubmit}>Submit
                </button>
            </div>
        </div>
    </div>
  )
}

export {Home}