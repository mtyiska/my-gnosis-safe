import * as React from "react";

export interface StateContextInterface {
    wallet:WalletsType;
    transaction: TransactionType[];
    setWallet: React.Dispatch<React.SetStateAction<any>>;
    setTransaction:React.Dispatch<React.SetStateAction<any>>;
    isSendModalOpen:boolean;
    setIsSendModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    isReceiveModalOpen:boolean;
    setIsReceiveModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}


export interface WalletsType {
    id:number;
    walletName:string,
    requiredSignatures:number,
    owners:string[],
    transactions?: TransactionType
}

export interface TransactionType {
    id:number;
    walletId:number;
    from:string,
    to:string,
    value:number,
    message:string
}

const defaultWalletState: WalletsType = {
    id:0,
    walletName:'',
    requiredSignatures:0,
    owners:[],
}

const defaultTransactionState: TransactionType = {
    id:0,
    walletId:0,
    from:'',
    to:'',
    value:0,
    message:''
}

const defaultState: StateContextInterface = {
    wallet:defaultWalletState,
    transaction:[defaultTransactionState],
    setWallet:()=> {},
    setTransaction:()=>{},
    isSendModalOpen:false,
    setIsSendModalOpen:()=>{},
    isReceiveModalOpen:false,
    setIsReceiveModalOpen:()=>{},
    
}


export const StateContext = React.createContext(defaultState);

export const StateProvider: React.FC = (props) => {
  const [wallet, setWallet] = React.useState<WalletsType>(defaultWalletState)
  const [transaction, setTransaction] = React.useState<TransactionType[]>([]);
  const [isSendModalOpen, setIsSendModalOpen] = React.useState(false);
  const [isReceiveModalOpen, setIsReceiveModalOpen] = React.useState(false);


  const context = {
    wallet,
    transaction,
    setWallet, 
    setTransaction,
    isSendModalOpen,
    setIsSendModalOpen,
    isReceiveModalOpen, 
    setIsReceiveModalOpen
  };

  return <StateContext.Provider value={context}>{props.children}</StateContext.Provider>;
};
