import React, { createContext, useState, FC,ReactElement } from 'react'
export interface IStickyProfileContext {
    displayAccount: boolean;
    setDisplayAccount?: (value:boolean) =>void;
    networkDisplay?: ReactElement | undefined;
    setNetworkDisplay?: (value:ReactElement) =>void
  }

  const defaultState: IStickyProfileContext = {
    displayAccount: false,
    networkDisplay:undefined
  };
const StickyHeaderContext = createContext<IStickyProfileContext >(defaultState);
StickyHeaderContext.displayName = 'StickyHeaderContext'

const StickyHeaderProvider: FC = ({children}:any)=>{
    const [displayAccount, setDisplayAccount] = useState(defaultState.displayAccount);
    const [networkDisplay, setNetworkDisplay] = useState(defaultState.networkDisplay);
  

    return <StickyHeaderContext.Provider value={{displayAccount, setDisplayAccount, networkDisplay, setNetworkDisplay} }>
        {children}
    </StickyHeaderContext.Provider>
}

export {StickyHeaderContext, StickyHeaderProvider}