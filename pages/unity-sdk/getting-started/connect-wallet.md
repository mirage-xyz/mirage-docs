import { Callout } from "components";

# Connect wallet and authenticate

Connecting to a Web3 wallet, such as MetaMask via **WalletConnect**, establishes a link between a **Wallet Address** and a user's **Game Account**.

There are two ways to get a **Session Key** from your wallet. 

1. Connect via QRCode: This method is typically used for desktop-based applications or when running your project in Unity Editor play mode. It involves generating a QR code that the user can scan using a mobile app to open their wallet. To connect via QRCode, follow these steps: 

* Attach the `WalletConnectUnityMonoAdapter` script to a GameObject in your scene.

* Get a reference to a `WalletConnect` instance using the `ConnectProvider` class and call the Connect method. Here’s an example implementation:

```
public class ConnectProviderUsageExample
{  
	public async void LaunchWalletConnect()  
	{    
		var walletConnect = ConnectProvider<WalletConnect>.GetConnect();    
		await walletConnect.Connect();  
	}
}
```

* To display the QRCode, use a `QRCodeImage` component. The SDK includes a QRCode generator and a function that handles it. Call `UpdateQRCode(string url)` with the generated URL, and use `.SetImageActive(bool)` to activate or deactivate the QRCode. Here's an example:

```
var connectURL = WalletConnect.Instance.ConnectURL;
_qrCodeImage.UpdateQRCode(connectURL);
_qrCodeImage.SetImageActive(true);

```

* Users should scan the QRCode using their MetaMask mobile app. This will initiate the connection process. If the MetaMask mobile app does not open automatically, users should manually open the app.

2. Connect via `WalletConnect.OpenMobileWallet` or `WalletConnect.OpenDeepLink`: This method is typically used for mobile-based applications. The steps are similar to the QRCode method, but instead of showing and scanning a QR code, the `WalletConnect.OpenMobileWallet` or `WalletConnect.OpenDeepLink` methods are called from the mobile application.

Once the user agrees to connect on the wallet side, the `WalletConnect` instance status (stored in the `WalletConnect.Status` property) will change to `WalletConnected`, and a Session Key will be saved in `PlayerPrefs` for future use.

Examples demonstrating these connection methods and the general usage examples can be found in the `Examples` scene and the `ConnectionController.cs` script.


# Create and cache a smart contract

To create and cache a smart contract, do the following:

1. Initialize a `WalletConnect` session using `WalletConnect.cs` script. 
	1. Attach `WalletConnectUnityMonoAdapter` script to a `GameObject` in your scene.
	2. Call `WalletConnect.Connect()` from your starter script `Awake` or `Start` method to create and connect the session.
	3. Wait until `WalletConnect` establishes a connection to the WalletConnect bridge and requests the wallet app to connect. The default wallet app is MetaMask, but you can change it by editing `WalletConnectSettings` scriptable object or using your own alternative instance for this settings file locally in your project.
	4. Approve the connection on the wallet side. If the platform you use is Android make sure to use the same wallet for subsequent transactions as the one that was used during the connection process.
2. Use the static method below to create a new MirageSDK instance. You can only create this instance once `WalletConnect.Status` value is changed to `WalletConnected`. This happens only after user approves the connection on their wallet side.
   ```
   MirageSDKFactory.GetMirageSDKInstance(string ProviderURL);
   ```
3. Create and cache a contract by using the `IMirageSDK` initialized instance.  
   ```
   IContract GetContract(string contractAddress, string contractABI);
   ```

Now you can interact with the created contract via `GetData()` and `CallMethod()`. Read more about [interacting with a smart contact](/gaming/unity-sdk/interacting-with-blockchain/interacting-with-smart-contract/). 

# Reference example of connecting a wallet to an account

This is an example from the SDK on how to link a Web3 wallet to a player account.

1. To connect a wallet, first make an instance of a `Web3` class and call `Initialize` method after logging in MetaMask

    ```
    string provider_url = "<ethereum node url>";
            
    Web3 web3 = new Web3(provider_url);
    web3.Initialize();
    ```

2. To prove ownership of the wallet address, the player should sign an arbitrary string > zero length. We recommend using uuid strings. The Web3 Wallet provides the sign functionality. To start this step call method `Sign`.

    ```
    string message = "Hi I am a message !"
    string signature = await web3.Sign(message); //returns the signature.
    ```

3. The next step involves the backend server-side. You can view an example script [here](https://github.com/mirage-xyz/mirage-serverside-demo/blob/main/backends/signing-go/main.go). It returns a signature if authentication is successful. Below is an ***extract*** from this script:

    ```
    package main

    import (
        "encoding/hex"
        "encoding/json"
        "log"
        "math/big"
        "net/http"
        "strconv"

        "fmt"

        "github.com/ethereum/go-ethereum/common"
        "github.com/ethereum/go-ethereum/common/hexutil"
        "github.com/ethereum/go-ethereum/common/math"
        "github.com/ethereum/go-ethereum/crypto"
        "github.com/ethereum/go-ethereum/ethclient"
        cryptoTyped "github.com/ethersphere/bee/pkg/crypto"
        eip712 "github.com/ethersphere/bee/pkg/crypto/eip712"
        "github.com/gin-gonic/gin"
    )

    // Endpoint for evm rpc requests
    var ankr = "https://rpc.ankr.com/eth_rinkeby"
    var client, clientConnectErr = ethclient.Dial(ankr)

    // Simple ERC721 contract with methods to update nft fields and signature verification mechanism
    // For this demo use contract in "contracts/GameItem.sol"
    var contractAccount = "0x159D0A933137f3EC155f43834BDFCd534A8bfd61"

    // Private key should belong to account that deployed contract
    var privateKeyString = "a0022ef0d495da2ad7e639f9d93045661f149f31472cedf067a0712b391749df"

    // Private key on the server side For GD-3 (use case 8)
    var privateKey, _ = crypto.HexToECDSA(privateKeyString)

    // user's address associated with the hero id
    var clientAddress = common.HexToAddress("0x24d13b65bAbFc38f6eCA86D9e73C539a1e0C0196")

    }
    ```

4. To verify the user make a call using the method POST `/account/verification/address` with the payload i.e. returned signature

    ```
    {
    "message": "Hi I am a message !", // your message
    "signature":"0x..." // result of Web3.Sign()
    }
    ```

5. This method gets the address of the user from the signature so you can write it to database.

    ```go
    ...
    sigPublicKey := getAddrFromSign(input.Signature, data)
    address := string(sigPublicKey);
    // add address to a database
    ...
    ```
	
With these steps, you should now be able to connect a wallet to an account using the MirageSDK. The provided examples demonstrate how to link a Web3 wallet (such as MetaMask) to a player account and verify user ownership using signature verification.