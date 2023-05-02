import { Callout } from "components";

## `MirageSDKFactory`

This class for SDK instance creation.

### Static methods

  * [`GetMirageSDKInstance`](#getmiragesdkinstance) — creates an SDK instance with a given argument.

### `GetMirageSDKInstance`

#### Declaration

> `IMirageSDK GetMirageSDKInstance(string providerURI)` OR<br/>
> `IMirageSDK GetMirageSDKInstance(NetworkName networkName)`

**Parameters**:

  * `providerURI` (string) — an RPC endpoint for the provider.
  * `networkName` (enum) — the name of the network to use.

#### Returns

  * `IMirageSDK` — an instance of the SDK provider. 

Creates an instance of the SDK provider using either a provider URL or a network name.

#### Code example

```csharp
using MirageSDK.Data;
using MirageSDK.Provider;
using UnityEngine;

public class CreateSDKExample : MonoBehaviour
{
	private void Start()
	{
		var mirageSDKByProvider = MirageSDKFactory.GetMirageSDKInstance("http://...");
		// or
		var mirageSDKByNetwork = MirageSDKFactory.GetMirageSDKInstance(NetworkName.Ethereum);
	}
}
```



