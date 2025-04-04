# Create Interactive Ads

Instructions on how to create interactive ads by integrating your codes into OpenAD Protocol.

Ad rendering and user interaction will notify publishers and/or advertisers upon request. This feature is suitable for providing traditional gaming incentive scenarios to publisher LIFF apps, such as extra lives for ad viewing.

Interactive ads will be presented in full screen, ads will be displayed for a certain time, and the number of impressions is calculated by CPM.

## OpenAD Event Notifications

OpenAD will notify publishers of the following ad display events:

- `adResourceLoad`: Indicates load ad resource from OpenAD platform, false will be returned if there is no resource to be loaded for the publisher slot/zone
- `adOpening`: Indicates the interactive ad is opening
- `adOpened`: Indicates the interactive ad is opened
- `adTaskFinished`: Indicates the interactive ad task is finished, the task is defined by advertiser
- `adClosing`: Indicates the interactive ad is closing
- `adClosed`: Indicates the interactive ad is closed
- `adClick`: Indicates clicked and jumps

This document provides instructions on how to use OpenAD js SDK to create interactive ads on:
- PC (Desktop Web App)
- Mobile H5 (Mobile Web App)
- LIFF (LINE Front-end Framework)

## Step #1. Load SDK

Load the SDK in the body of html:

```html
<body>
  <!--Your codes above-->
  <script
      name="openADJsSDK"
      version="3.0"
      type="text/javascript"
      src="https://protocol.openad.network/sdk/loader.js">
  </script>
</body>
```

We recommend to add your application version number or release timestamp after JS to obtain the latest JS SDK for your application:

```
https://protocol.openad.network/sdk/loader.js?t=your-app-release-timestamp
https://protocol.openad.network/sdk/loader.js?v=your-app-version
```

The following global variables will be loaded with 'https://protocol.openad.network/sdk/loader.js':

- `openADSdkLoader.hostURL`: node api url to serve end user, e.g., https://bf2055756e.api.openad.network

The script will pick OpenAD node for your end users, and load proper version of OpenAD SDK for you.

## Step #2. Init OpenAD Resource for Interactive Ad

The interactive ads shall be init manually. Please follow the guideline to add the following js code:

```javascript
/* ... */

// Create a params object
const adParams = {
    // LINE Mini App Configuration
    // This section configures how your app integrates with LINE's ecosystem
    line: {
        type: 'LMA', // 'LMA(Line Mini App)' - Specifies that this is a LINE Mini App
        // This type is required for LINE integration and enables LIFF-specific features
        // When set to 'LMA', the SDK will automatically detect if the app is running in LINE
        // and adjust its behavior accordingly (e.g., using LINE's login system)
    },
    // Ethereum Wallet Configuration
    wallet: {
        type: 'eth', // 'eth(Ethereum)' - Specifies that this is an Ethereum wallet
        provider: 'new ethers.providers.Web3Provider(window.ethereum)',
        // ethers.js provider for connecting to Ethereum network via MetaMask or other web3 wallets
        // For RPC connection, use: new ethers.providers.JsonRpcProvider("YOUR-RPC-URL")
    },
    // TON Wallet Configuration
    tonWallet: {
        type: 'ton', // 'ton(TON Blockchain)',
        provider: 'new TonConnectSDK.TonConnect({ manifestUrl: "/tonconnect-manifest.json" })',
        // TON Connect is the standard way to connect TON wallets to dApps
        // manifestUrl points to a JSON file that describes your dApp
        // This file should be hosted on your domain and accessible via HTTPS
    },
    // LINE Wallet Configuration
    lineWallet: {
        type: 'line', // 'line(LINE Blockchain)',
        provider: 'DappPortalSDK.init({ clientId: "YOUR-CLIENT-ID" }).then(sdk => sdk.getWalletProvider())',
        // LINE Dapp Portal SDK provides a wallet provider that follows EIP-1193
        // clientId is your LINE Dapp Portal client ID
        // The provider supports various wallet types:
        // - Dapp Portal Wallet (Web)
        // - Kaia Wallet (Mobile App)
        // - Kaia Wallet (Chrome Extension)
        // - Automatically uses Dapp Portal Wallet (LIFF) if opened from LINE Messenger
    },
};

// Create an adInfo object
const adInfo = {
    zoneId     : 159, // example zoneId, please check your own code parameters
    publisherId: 49, // example publisherId, please check your own code parameters
    eventId    : 0,  // Reserved Parameter
};

// Create a userInfo object
const userInfo = {
   // Please add reasonable user IDs for your end users.
   // Otherwise, OpenAD statistics may be inaccurate
   // which may affect your incentives
   userId: string, // user Id, LINE LIFF please leave it blank, webApp if there is no data, please leave it blank
   firstName: string, // firstName or userId, LINE LIFF please leave it blank, webApp if there is no data, please leave it blank
   lastName: string, // lastName or userId, LINE LIFF please leave it blank, webApp if there is no data, please leave it blank
   userName: string, // username or userId, LINE LIFF please leave it blank, webApp if there is no data, please leave it blank
   walletType: string, // user wallet type: TON / EVM / TRON / other blockchain project names,  if there is no data, please leave it blank
   walletAddress: string, // user wallet address,  if there is no data, please leave it blank
};

/* ... */

// init/load OpenAD resource manually
window.openADJsSDK.interactive.init({ adParams, adInfo, userInfo }).then(res => {
  if(res.code === 0){
     // you can callback 'getRender' function, user can load an interactive ad;
  }else{
     // you can't callback 'getRender' function, user can't load an interactive ad;
  }
});
```

## Step #3. Get Ad And Render

```javascript
// Create a callback object
// view AD steps is [1,2,3,5,6,7], click steps is [1,2,3,6,7,5,4]
const callbackFunc = {
  // Indicates load ad resource from OpenAD platform, false will be returned if there is no resource to be loaded for the publisher slot/zone
  adResourceLoad: (e) => {
    // 'step1', e = ture / false
  },
  // Indicates the interactive ad is opening
  adOpening: (e) => {
    // 'step2', e = ture / false
  },
  // Indicates the interactive ad is opened
  adOpened: (e) => {
    // 'step3',  e = ture / false
  },
  // indicates the interactive ad task is finished, the task is defined by publisher
  adTaskFinished: (e) => {
    // 'step5',  e = ture / false
  },
  // Indicates the interactive ad is closing
  adClosing: (e) => {
    // 'step6', e = ture / false
  },
  // Indicates the interactive ad is closed
  adClosed: (e) => {
    // 'step7', e = viewAD / click / close
    // viewAD: viewed Ad completed, not clicked, not manually closed ads; client side needs to issue rewards level 1.
    // click: click Ad completed, include viewed Ad, not manually closed ads; client side needs to issue rewards level 2.
    // close: user manually closed ads. client side can not get any rewards.
    // If you want to perform different steps based on different shutdown states, please write the code here.
  },
  // Indicates clicked and jumps
  adClick: (e) => {
    // 'step4', e = ture / false
  },
};

// Call SDK method to get advertising and render data
window.openADJsSDK.interactive.getRender({ adInfo, cb: callbackFunc });
```

## Important Notices

1. After executing the init method, determine whether to continue executing the getRender method based on the status of `res.code`!

2. Please pay attention to your page flow design, there may be `res.code !== 0`. In the case of `res.code === 0`, please execute the getRender method as soon as possible. The data is time-sensitive. After the timeout, the ad delivery will be invalid.

3. There are 7 callback methods for calling the getRender method, which can be called on demand!

4. The client must re-execute the init method every time to determine whether the AD can be loaded. Otherwise, the data statistics will only take effect once, and multiple repeated impressions cannot be counted!!!