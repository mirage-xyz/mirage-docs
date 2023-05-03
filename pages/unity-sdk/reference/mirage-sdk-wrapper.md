## `MirageSDKWrapper`

`MirageSDKWrapper` provides support for all platform-dependent features and implements `IMirageSDK`.

**Properties**:

  * `Eth` — provides an `IEthHandler` instance.

### Public methods

  * [`GetContract`](#getcontract) — creates a contract instance for a smart contract interaction.
  * [`CreateSubscriber`](#createsubscriber) — creates subscribers for the real-time contract event subscriptions.
  * [`Disconnect`](#disconnect) — disconnects from the wallet.

### `GetContract`

#### Declaration

> `IContract GetContract(string contractAddress, string contractABI)`

**Parameters**:

  * `contractAddress` (string) — a contract address.
  * `contractABI` (string) — a contract's application binary interface (ABI).

#### Returns

  * `IContract` — returns an instance of the [Contract](/gaming/unity-sdk/reference/contract/) class.

Provides an instance of a contract with a platform-dependent provider.

#### Code example

```csharp
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using UnityEngine;

public class ContractExample : MonoBehaviour
{
	private IContract _contract;

	private void Start()
	{
		var mirageSDK = MirageSDKFactory.GetMirageSDKInstance("http://...");
		_contract = mirageSDK.GetContract("0x...","...");
	}
}
```

### `CreateSubscriber`

#### Declaration

> `IContractEventSubscriber CreateSubscriber(string wsUrl)`

**Parameters**:

  * `wsUrl` (string) — an RPC endpoint for the WebSockets connection.

#### Returns

  * `IContractEventSubscriber` — returns a subscriber class instance.

Provides an instance of subscriber to make contract event subscriptions. See more on [Events and subscriptions](/gaming/extra/events-and-subscriptions/).

#### Code example

```csharp
using MirageSDK.Base;
using MirageSDK.Core.Infrastructure;
using MirageSDK.Data;
using MirageSDK.DTO;
using MirageSDK.Provider;
using Cysharp.Threading.Tasks;
using UnityEngine;

namespace MirageSDK.EventListenerExample
{
	public class EventListenerExample : UseCaseBodyUI
	{
		[SerializeField] 
		private ContractInformationSO _contractInformationSO;
		[SerializeField]
		private ProviderInformationSO _providerInformationSO;
		private IContractEventSubscriber _eventSubscriber;
		private IContractEventSubscription _subscription;
		private IEthHandler _eth;

		// If you know topic position then you can use EventFilterData
		public async UniTaskVoid SubscribeWithTopics()
		{
			var filters = new EventFilterData
			{
				FilterTopic2 = new object[] { await _eth.GetDefaultAccount() }
			};

			_subscription = await _eventSubscriber.Subscribe(
				filters,
				_contractInformationSO.ContractAddress, 
				(TransferEventDTO t) => ReceiveEvent(t)
			);
		}
		
		// If you know only topic name then you can use EventFilterRequest
		public async UniTaskVoid SubscribeWithRequest()
		{
			var filtersRequest = new EventFilterRequest<TransferEventDTO>();
			filtersRequest.AddTopic("To", await _eth.GetDefaultAccount());

			_subscription = await _eventSubscriber.Subscribe(
				filtersRequest,
				_contractInformationSO.ContractAddress, 
				ReceiveEvent
			);
		}

		private void ReceiveEvent(TransferEventDTO contractEvent)
		{
			Debug.Log($"{contractEvent.From} - {contractEvent.To} - {contractEvent.Value}");
		}

		public void Unsubscribe()
		{
			_eventSubscriber.Unsubscribe(_subscription.SubscriptionId).Forget();
		}

		public override void SetUseCaseBodyActive(bool isActive)
		{
			base.SetUseCaseBodyActive(isActive);

			if (isActive)
			{
				var sdkInstance = MirageSDKFactory.GetMirageSDKInstance(_providerInformationSO.HttpProviderURL);
				_eth = sdkInstance.Eth;

				_eventSubscriber = sdkInstance.CreateSubscriber(_providerInformationSO.WsProviderURL);
				_eventSubscriber.ListenForEvents().Forget();
				_eventSubscriber.OnOpenHandler += UniTask.Action(SubscribeWithRequest);
			}
			else
			{
				_eventSubscriber.StopListen();
			}
		}
	}
}
```

### `Disconnect`

#### Declaration

> `UniTask Disconnect(bool waitForNewSession)`

**Parameters**:

  * `waitForNewSession` (boolean) — if `true` (by default), a connection will be reestablished upon disconnection. If `false`, connection will be closed immediately.

#### Returns

Removes a wallet connection.

#### Code example

```csharp
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using UnityEngine;

public class DisconnectExample : MonoBehaviour
{
	private IMirageSDK _sdk;

	private void Start()
	{
		_sdk = MirageSDKFactory.GetMirageSDKInstance("http://...");
	}

	private void OnDisable()
	{
		_sdk.WalletHandler.Disconnect(false);
	}
}
```