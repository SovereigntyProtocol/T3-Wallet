// import { MINTSCAN_URL } from '~/constants/common';
// import cosmosChainImg from '~/images/chainImgs/sovergienT.png'; // token and chain symbol are same
import cosmosTokenImg from '~/images/symbols/sovid.png';
import type { CosmosChain } from '~/types/chain';

export const SovidId = '44430154-6f96-4f07-adec-2f9d38fd17b8';

export const SOVID: CosmosChain = {
  id: SovidId,
  line: 'COSMOS',
  type: '',
  chainId: 'sov-5',
  chainName: 'AuthenticityNet',
  restURL: 'http://146.190.5.120:1317',
  tokenImageURL: cosmosTokenImg,
  imageURL: cosmosTokenImg,
  baseDenom: 'usovid',
  displayDenom: 'SOVID',
  decimals: 6,
  bip44: {
    purpose: "44'",
    coinType: "118'",
    account: "0'",
    change: '0',
  },
  bech32Prefix: { address: 'ssi' },
  coinGeckoId: 'cosmos',
  explorerURL: `https://identityforge.sovereignty.one`,
  gasRate: {
    tiny: '0.00025',
    low: '0.0025',
    average: '0.025',
  },
  gas: { send: '100000' },
};
