Create Banner Ads
Instructions on how to create banner ads by integrating your codes into OpenAD Protocol.

Preparations
Make sure that you complete 4. Get Code before you start the following steps.

Github Codes And Demo
https://github.com/openad-protocol/openad-ad-demo

Easy embedding
Step #1. Load SDK
Load the SDK in the body of html, the code is as follows:

Copy
<body>
  <!--Your codes above-->
  <script
      name="openADJsSDK"
      version="3.0"
      type="text/javascript"
      src="https://protocol.openad.network/sdk/loader.js">
  </script>
</body>
We recommend to add your application version number or release timestamp after JS to obtain the latest JS SDK for your application. E.g.,

https://protocol.openad.network/sdk/loader.js?t=your-app-release-timestamp

https://protocol.openad.network/sdk/loader.js?v=your-app-version

The following global vairables will be loaded with 'https://protocol.openad.network/sdk/loader.js'.

openADSdkLoader.hostURL , node api url to serve end user. e.g., https://bf2055756e.api.openad.network .

The script will pick OpenAD node for your end users, and load proper version of OpenAD SDK for you.

Step #2. Add DOM placeholder for Ad banner
Copy
<body>
  <!-- code before banner -->
  <div class="openADJsSDKBanner #your_style_class" 
       publisherld="49"
       zoneld="158">
  </div>
  <!-- code after banner -->
</body>
zoneld="1", 1 is a demo zoneld, please use your own "zoneId" publisherld="56", 56 is a demo publisherld, please use your own "publisherld" feel free to define your own banner style

OpenAD SDK will get ad banner for your end users and has it rendered in the DOM placeholder.

In traditional web applications, you can see OpenAD banner been rendered.

!!! OpenAD only support ONE DOM placeholder in one web page.

Enjoy the OpenAD ecosystem !!!
Step #3. Init OpenAD Resource
In most SPA (single page application) web frameworks, DOM objects are rendered dynamically. Thus, the ad banner shall be init manually, the init js call will render ad banners to predefined DOM placeholder.

Please follow the guideline to add the following js code.

Please organize the data according to the following code.

Copy
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
    zoneId     : 158, // example zoneId, please check your own code parameters
    publisherId: 49, // example publisherId, please check your own code parameters
    eventId    : 0,  // Reserved Parameter
};

// Create a userInfo object. Regardless of whether the user is logged in to your application or not, the following parameters must be send to SDK.
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
 window.openADJsSDK.bridge.init({ adParams, adInfo, userInfo });
/* ... */
Explicit Call Functions
1. Load SDK
.......

2. Get Ad Info
Copy
// // Ad resource object structure, banner
// resource = {
//    type         : 'banner',
//    resource_url : string, // resource url
//    width        : int,    // resource width
//    height       : int,    // resource height
//    resource_id  : int     // resource ID
//};

// Create userInfo and adParams object, 
// which should be sent to the SDK to identify a logged in user.
// for detail, please view 'Step #3'.
const adParams = {...}
const userInfo = {...}

// Create an adInfo object
const adInfo = {
    zoneId     : 158, // example zoneId, please check your own code parameters
    publisherId: 49, // example publisherId, please check your own code parameters
    eventId    : 0,  // Reserved Parameter
};

// Call SDK method to get advertising data
const res = await window.openADJsSDK.bridge.get({ adParams, userInfo, adInfo });
if ( res.code === 0 ) {
   const resource = res.data;
   // After getting the data, you can render it on the page
   // you can add multiple ad banners
}else{
   // We recommend not throwing an error
}
3. Log User View
When the page loads the ad resources and users can see the ads, please execute the following SDK method.

Copy
const res = await window.openADJsSDK.bridge.log(adInfo);
if ( res.code === 0 ) {
   // Callback log info successful
}else{
   // We recommend not throwing an error
}
4. Log User Click
When users click on the ad, please execute the following SDK method:

Copy
window.openADJsSDK.bridge.click(adInfo);

SDK will open a new app by the above function;

No Callback, if you want to do sth, you should use yourself functions or methods;