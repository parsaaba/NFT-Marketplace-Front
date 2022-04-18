/**
 * Expose
 */

const { BigNumber } = require('@0x/utils')

const debug = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports = {
  env: process.env.NODE_ENV || 'development',
  debug,
  ethDBID: process.env.ETH_DB_ID || '2',
  maticDBID: process.env.MATIC_DB_ID || '1',
  matic: {
    deployment: {
      network: process.env.DEPLOYMENT_NETWORK || 'testnet',
      version: process.env.DEPLOYMENT_VERSION || 'mumbai',
    },
  },
  apis: {
    MARKETPLACE_API_HOST:
      process.env.MARKETPLACE_API_HOST || 'http://localhost:3001/api/v1/',
    FILE_HOST: process.env.FILE_HOST || 'http://localhost:3001/',
  },
  displaySaleTagTime: process.env.DISPLAY_SALE_TAG_TIME || 2, // In days
  displayDecimals: process.env.DISPLAY_DECIMALS || 2,
  maticDecimals: process.env.MATIC_DECIMALS || 18,
  defaultPageSize: process.env.DEFAULT_PAGE_SIZE || 20,
  pageIncrementSize: process.env.PAGE_INCREMENT_SIZE || 50,
  mainRPC:
    process.env.MAIN_RPC ||
    'https://mainnet.infura.io/v3/73d0b3b9a4b2499da81c71a2b2a473a9',
  maticRPC: process.env.MATIC_RPC || 'https://rpc-mainnet.matic.network',
  maticWidgetKey: process.env.MATIC_WIDGET_KEY || 'kiLV4NOqXgk346wibvG4',
  maxBulkDeposit: process.env.MAX_BULK_DEPOSIT || 20,
  mainExplorer: process.env.MAIN_EXPLORER || 'https://etherscan.io/',
  maticExplorer: process.env.MATIC_EXPLORER || 'http://explorer.matic.network/',
  sentryDsn:
    process.env.SENTRY_DSN ||
    'https://ab96a87b1b2f49c3984587361063a2f2@o562377.ingest.sentry.io/5707254',

  // 0x
  ONE_SECOND_MS: 1000,
  ONE_MINUTE_MS: 1000 * 60,
  TEN_MINUTES_MS: 60000 * 10,
  UNLIMITED_ALLOWANCE_IN_BASE_UNITS: new BigNumber(2).pow(256).minus(1),
  NULL_ADDRESS: '0x0000000000000000000000000000000000000000',
  NULL_BYTES: '0x',
  TX_DEFAULTS: { gas: 800000, gasPrice: 10000000000 },
  BASE_DERIVATION_PATH: `44'/60'/0'/0`,
  SALT:
    process.env.SALT ||
    '0x0000000000000000000000000000000000000000000000000000000000000089',
  MIXPANEL_TOKEN:
    process.env.MIXPANEL_TOKEN || '9a8fcc0a01cbd02a89a988924ec857ae',
}
