import { lazier } from 'eth-hooks/helpers';

// the components and pages are lazy loaded for performance and bundle size reasons
// code is in the component file
import {Home} from "./home/Home"
export const ExampleUI = lazier(() => import('./exampleui/ExampleUI'), 'ExampleUI');
export const Subgraph = lazier(() => import('./subgraph/Subgraph'), 'Subgraph');
export const Hints = lazier(() => import('./hints/Hints'), 'Hints');
export const WalletsList =lazier(() => import('./wallet/'), 'WalletsList')
export const TransactionList =lazier(() => import('./transactions/Transaction'), 'TransactionList')
export {Home}
