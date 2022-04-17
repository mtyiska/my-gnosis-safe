import React, {useState, FC} from 'react'
import { useEthersContext } from 'eth-hooks/context';
import { Button } from 'antd';
import { useDebounce } from 'use-debounce';
import { invariant } from 'ts-invariant';
import { useIsMounted } from 'usehooks-ts';
import { TCreateEthersModalConnector } from 'eth-hooks/models';

export interface IWalletConnectProps {
    createLoginConnector?: TCreateEthersModalConnector;
    hasContextConnect: boolean;

  }

const WalletConnect:FC<IWalletConnectProps> = (props:IWalletConnectProps) => {
    const ethersContext = useEthersContext();
    const showLoadModal = !ethersContext.active;
    const [connecting, setConnecting] = useState(false);
    const isMounted = useIsMounted();

    const [loadingButton, loadingButtonDebounce] = useDebounce(connecting, 1000, {
        maxWait: 1500,
    });

    if (loadingButton && connecting) {
        setConnecting(false);
    }

    const handleLoginClick = (): void => {
        if (props.createLoginConnector != null) {
          const connector = props.createLoginConnector?.();
          if (!isMounted()) {
            invariant.log('openModal: no longer mounted');
          } else if (connector) {
            setConnecting(true);
            ethersContext.openModal(connector);
          } else {
            invariant.warn('openModal: A valid EthersModalConnector was not provided');
          }
        }
    };

    const resetLogin = () =>{
      ethersContext.disconnectModal()
    }

    const loadModalButton = (
        <>
          {showLoadModal && props.createLoginConnector && (
            <Button
              loading={loadingButtonDebounce.isPending()}
              key="loginbutton"
              shape="round"
              size="large"
              onClick={handleLoginClick}>
              connect
            </Button>
          )}
        </>
      );
    
      const logoutButton = (
        <>
          {!showLoadModal && props.createLoginConnector && (
            <Button
              key="logoutbutton"
              shape="round"
              size="large"
              onClick={resetLogin}>
              logout
            </Button>
          )}
        </>
      );
  return (
    <div>
    {props.hasContextConnect && (
        <>
        {loadModalButton}
        {logoutButton}
        </>
    )}
    </div>
  )
}

export default WalletConnect