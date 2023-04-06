import { Callout } from "components";

## `MirageSDKFactory`

A class for SDK instance creation.

### Static methods

  * [`GetMirageSDKInstance`](#getmiragesdkinstance) — creates an SDK instance with a given argument.

### `GetMirageSDKInstance`

#### Declaration

> `IMirageSDK GetMirageSDKInstance(string providerURI)` OR<br/>
> `IMirageSDK GetMirageSDKInstance(NetworkName networkName)`

**Parameters**:

  * `providerURI` (string) — an RPC endpoint.
  * `networkName` (enum) — a network name.

#### Returns

  * `IMirageSDK` — an SDK provider instance. 

Creates an SDK instance with a provider URL or network name specified.

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



