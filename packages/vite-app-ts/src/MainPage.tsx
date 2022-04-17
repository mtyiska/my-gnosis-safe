import React, { FC, useEffect, useState, useContext } from 'react';
import { Address, Balance } from 'eth-components/ant';

import '~~/styles/main-page.css';

import { useContractReader, useBalance, useEthersAdaptorFromProviderOrSigners, useEventListener } from 'eth-hooks';
import { useEthersContext,  } from 'eth-hooks/context';
import { useDexEthPrice } from 'eth-hooks/dapps';
import { asEthersAdaptor } from 'eth-hooks/functions';
import { useScaffoldProviders as useScaffoldAppProviders } from '~~/components/main/hooks/useScaffoldAppProviders';
import { ExampleUI } from '~~/components/pages';

import { useScaffoldHooksExamples as useScaffoldHooksExamples } from './components/main/hooks/useScaffoldHooksExamples';

import { useAppContracts, useConnectAppContracts, useLoadAppContracts } from '~~/config/contractContext';
import { useBurnerFallback } from '~~/components/main/hooks/useBurnerFallback';
import { BURNER_FALLBACK_ENABLED, MAINNET_PROVIDER } from '~~/config/appConfig';
import { NETWORKS } from '~~/models/constants/networks';

import Layout from './components/Layout/Layout';

/**
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 * See config/appConfig.ts for configuration, such as TARGET_NETWORK
 * See MainPageContracts.tsx for your contracts component
 * See contractsConnectorConfig.ts for how to configure your contracts
 * ⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️⛳️
 *
 * For more
 */

/**
 * The main component
 * @returns
 */
export const Main: FC = () => {
  // -----------------------------
  // Providers, signers & wallets
  // -----------------------------
  // 🛰 providers
  // see useLoadProviders.ts for everything to do with loading the right providers
  const scaffoldAppProviders = useScaffoldAppProviders();
  // const {displayAccount, setDisplayAccount} = useContext(StickyHeaderContext)

  // 🦊 Get your web3 ethers context from current providers
  const ethersContext = useEthersContext();

  // if no user is found use a burner wallet on localhost as fallback if enabled
  useBurnerFallback(scaffoldAppProviders, BURNER_FALLBACK_ENABLED);

  // -----------------------------
  // Load Contracts
  // -----------------------------
  // 🛻 load contracts
  useLoadAppContracts();
  // 🏭 connect to contracts for mainnet network & signer
  const [mainnetAdaptor] = useEthersAdaptorFromProviderOrSigners(MAINNET_PROVIDER);
  useConnectAppContracts(mainnetAdaptor);
  // 🏭 connec to  contracts for current network & signer
  useConnectAppContracts(asEthersAdaptor(ethersContext));

  // -----------------------------
  // Hooks use and examples
  // -----------------------------
  // 🎉 Console logs & More hook examples:
  // 🚦 disable this hook to stop console logs
  // 🏹🏹🏹 go here to see how to use hooks!
  useScaffoldHooksExamples(scaffoldAppProviders);



  // -----------------------------
  // .... 🎇 End of examples
  // -----------------------------
  // 💵 This hook will get the price of ETH from 🦄 Uniswap:
  const [ethPrice] = useDexEthPrice(scaffoldAppProviders.mainnetAdaptor?.provider, scaffoldAppProviders.targetNetwork);

  // 💰 this hook will get your balance
  const [yourCurrentBalance] = useBalance(ethersContext.account);

  const yourContract = useAppContracts('YourContract', ethersContext.chainId);

  const [route, setRoute] = useState<string>('');
  useEffect(() => {
    setRoute(window.location.pathname);
  }, [setRoute]);

  if(!ethersContext.account){
    <div>User Logged Out</div>
  }
  console.log("CONTRACT", yourContract)

  const [purpose, update] = useContractReader(
    yourContract,
    yourContract?.purpose,
    [],
    yourContract?.filters.SetPurpose()
  );

  console.log("purpose", purpose)



  return (
    // <ExampleUI
    //       mainnetProvider={scaffoldAppProviders.mainnetAdaptor?.provider}
    //       yourCurrentBalance={yourCurrentBalance}
    //       price={ethPrice}
    //     />
      <Layout
        scaffoldAppProviders={scaffoldAppProviders} 
        price={ethPrice}
        route={route} 
        setRoute={setRoute}
        yourCurrentBalance={yourCurrentBalance}
      />

  );
};
