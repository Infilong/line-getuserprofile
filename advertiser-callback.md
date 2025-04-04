# Advertiser Callback

OpenAD will notify advertisers for live ad publishing and upgrade user tags based on callback from advertiser application calls. This will be used to enhance the governance consensus within OpenAD Network.

This document describes how advertisers use the callback method to notify and return data to OpenAD Protocol.

## For LINE LIFF App

### How to Get Callback Parameters

If your promotion link is like:
```
https://liff.line.me/2005923890-Pz9btqGN?startapp=OpenAD_Protocol
```
The callback parameters will be spliced after your promotion link.

If your promotion link is like:
```
https://liff.line.me/2005923890-Pz9btqGN
```
Then your promotion link will be spliced with `?startapp=OpenAD_Protocol` and callback parameters.

### Your LIFF Launch Page URL

```
https://openad.network/?liffWebAppStartParam=OpenAD_Protocol
_26zoneId_3D159
_26publisherId_3D49
_26eventId_3D158
_26traceId_3D10511960c290a145c3fb555c8dddcbf48f96cc
_26cb_3D1b2a1fced9f036b8881a0ffda17920d2
_26hash_3D29ebc1be403b57aba2d2689410e15b01
_26signature_3Db2c2525ef5f8c71378af2fd587b3cdd0
_26userId_3D6087580917
#liffWebAppData=......
```

## For Web App

### How to Get Callback Parameters

If your promotion link is like:
```
https://openad.network/?startapp=OpenAD_Protocol
```
The callback parameters will be spliced after your promotion link.

If your promotion link is like:
```
https://openad.network/
```
Then your promotion link will be spliced with `?startapp=OpenAD_Protocol` and callback parameters.

### Your Web App Launch Page URL

```
https://openad.network/
?startapp=OpenAD_Protocol
&zoneId=159
&publisherId=49
&eventId=158
&traceId=10511960c290a145c3fb555c8dddcbf48f96cc
&cb=1b2a1fced9f036b8881a0ffda17920d2
&hash=29ebc1be403b57aba2d2689410e15b01
&signature=b2c2525ef5f8c71378af2fd587b3cdd0
&userId=6087580917
```

## Callback OpenAD SDK Method

```javascript
let { code } = await window.openADJsSDK.advertiser.cb();
```

### Response Codes
- `code = 0`: Send callback info successfully
- `code = -1`: Invalid parameters
- `code = -2`: Send callback info failed
- `code = -3`: Ajax Request 404
- `code = -4`: Ajax Request Timeout
- `code = -5`: Ajax Request Error

## Implementation Guidelines

1. If promotion link reaches your APP directly, and your APP is a SPA application, please put the callback code in the root route.

2. If promotion link reaches your APP directly, and your APP is a native HTML application, please put the callback code in the body:
```html
<script name="openADJsSDK" ....... > </script>
<script type="text/javascript">
   // Here is your execution code
</script>
```

3. If promotion link cannot reach the APP directly, but is processed through an intermediate page before jumping:
   - Please make sure that the callback method is executed before jumping
   - For specific implementation methods, please refer to guidelines 1 and 2 above
