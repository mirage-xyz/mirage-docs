## `EthHandler`

A class containing the methods for making transactions, estimating transactions fee, and getting data on that.

### Public methods

  * [`GetDefaultAccount`](#getdefaultaccount) — returns the address of the account currently logged in via the third-party wallet.
  * [`GetBalance`](#getbalance) — get the balance of a wallet address specified.
  * [`GetBlockNumber`](#getblocknumber) — returns the current block number.
  * [`GetTransaction`](#gettransaction) — returns a transaction from the given transaction hash.
  * [`GetTransactionReceipt`](#gettransactionreceipt) — returns a TransactionReceipt for the given transaction hash.
  * [`GetTransactionCount`](#gettransactioncount) — get the number of transactions in a given block.
  * [`GetBlockWithTransactions`](#getblockwithtransactions) — returns a block with transactions matching the block number or block hash.
  * [`GetBlockWithTransactionsHashes`](#getblockwithtransactionshashes) — returns a block with transactions hashes matching the block number or block hash.
  * [`EstimateGas`](#estimategas) — returns the estimated gas cost.
  * [`Sign`](#sign) — signs data using a specific account address.
  * [`SendTransaction`](#sendtransaction) — sends a transaction to the network.

### `GetDefaultAccount`

#### Declaration

> `Task<string> GetDefaultAccount()`

#### Returns

  * `string` — an account address.

The method returns address that your wallet provided. There is no way to change it from SDK because it has a pair private key stored in your wallet. To change a default address, open your wallet and change it manually.

#### Code example

```csharp
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using Cysharp.Threading.Tasks;
using UnityEngine;

public class GetAddressExample : MonoBehaviour
{
	private IEthHandler _eth;

	private void Start()
	{
		var mirageSDK = MirageSDKFactory.GetMirageSDKInstance("http://...");
		_eth = mirageSDK.Eth;
	}

	public async UniTaskVoid GetAddress()
	{
		var address = await _eth.GetDefaultAccount();
	}
}
```

---

### `GetBalance`

#### Declaration

> `Task<BigInteger> GetBalance(string address)`

**Parameters**:

  * `address` (string) — an account address. The method returns the default account's balance if the parameter hasn't been specified.

#### Returns

  * `BigInteger` — an account balance in WEI.

Retrieves account balance info in WEI units. To convert balance into other units, use [Web3.Convert](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.Util/UnitConversion.cs).

To find more info on the currency units, have a look at the [Currency Units](/gaming/extra/currency-units/) section.

#### Code example

```csharp
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using Nethereum.Util;
using Nethereum.Web3;
using UnityEngine;

namespace DefaultNamespace
{
    public class GetBalanceExample : MonoBehaviour
    {
        private IMirageSDK _mirageSDKWrapper;

        private void Start()
        {
            _mirageSDKWrapper = MirageSDKFactory.GetMirageSDKInstance("https://...");
        }

        public async void GetBalance()
        {
            var balanceInWei = await _mirageSDKWrapper.Eth.GetBalance();
            var etherAmount = Web3.Convert.FromWei(balanceInWei);
            var gweiAmount = Web3.Convert.FromWei(balanceInWei, UnitConversion.EthUnit.Gwei);
        }
    }
}
```

---

### `GetBlockNumber`

#### Declaration

`Task<BigInteger> GetBlockNumber()`

#### Returns

  * `BigInteger` — the latest block's number.

Returns the latest block's number.

#### Code example

```csharp
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using Nethereum.Util;
using Nethereum.Web3;
using UnityEngine;

namespace DefaultNamespace
{
    public class GetBlockNumberExample : MonoBehaviour
    {
        private IMirageSDK _mirageSDKWrapper;

        private void Start()
        {
            _mirageSDKWrapper = MirageSDKFactory.GetMirageSDKInstance("https://...");
        }

        public async void GetBalance()
        {
            var currentBlock = await _mirageSDKWrapper.Eth.GetBlockNumber();
        }
    }
}
```

---

### `GetTransaction`

#### Declaration

> `Task<Transaction> GetTransaction(string transactionReceipt)`

**Parameters**:

  * `transactionReceipt` (string) — a transaction hash.

#### Returns

  * `Transaction` — returns a transaction object.

Returns a transaction for the transaction hash specified.

#### Code example

```csharp
using System;
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using UnityEngine;

public class ContractExample : MonoBehaviour
{
	private IContract _contract;
	private IEthHandler _eth;

	private void Start()
	{
		var mirageSDK = MirageSDKFactory.GetMirageSDKInstance("http://...");
		_contract = mirageSDK.GetContract("0x...","...");
		_eth = mirageSDK.Eth;
	}

	public async void Call()
	{
		var transactionHash = await _contract.CallMethod("yourMethodName", Array.Empty<object>());

		var trx = await _eth.GetTransaction(transactionHash);

		Debug.Log($"Nonce: {trx.Nonce}");
	}
}
```

---

### `GetTransactionReceipt`

#### Declaration

`Task<TransactionReceipt> GetTransactionReceipt(string transactionHash)`

**Parameters**:

  * `transactionHash` (string) — a transaction hash.

#### Returns

  * `TransactionReceipt` — a transaction receipt object.

Returns the receipt of a transaction by transaction hash. Method resolves when transaction is mined.

#### How to get contract events from receipt

If contract method that you called emits an event, you can get it from [TransactionReceipt](https://github.com/Nethereum/Nethereum/blob/master/src/Nethereum.RPC/Eth/DTOs/TransactionReceipt.cs) on `ReceiptReceived` stage. But first you need to create a [DTO corresponding to a contract event](/gaming/extra/events-and-subscriptions/#event-nature).

```csharp
public void HandleReceipt(object sender, TransactionReceipt receipt)
{
	var transferEventOutput = receipt.DecodeAllEvents<DTO>();
	transferEventOutput[0].Event./// Get all data what you need
}
```

#### Code example

```csharp
using System;
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using UnityEngine;

public class ContractExample : MonoBehaviour
{
	private IContract _contract;
	private IEthHandler _eth;

	private void Start()
	{
		var mirageSDK = MirageSDKFactory.GetMirageSDKInstance("http://...");
		_contract = mirageSDK.GetContract("0x...","...");
		_eth = mirageSDK.Eth;
	}

	public async void Call()
	{
		var successsStatus = 1;
		var transactionHash = await _contract.CallMethod("yourMethodName", Array.Empty<object>());

		var receipt = await _eth.GetTransactionReceipt(transactionHash);

		if (receipt.Status.Value.Equals(successsStatus))
		{
			Debug.Log("Transaction was successful");
		}
		else
		{
			Debug.Log("Transaction has failed");
		}
	}
}
```

---

### `GetTransactionCount`

#### Declaration

> `Task<BigInteger> GetTransactionCount(string hash)` OR<br/>
> `Task<BigInteger> GetTransactionCount(BlockParameter block)`

**Parameters**:

  * `hash` (string) — a block hash.
  * `block` — a `BlockParameter` that can be either a number of blocks or the `earliest`, `latest`, or `pending` options.

#### Returns

  * `BigInteger` — a number of transactions in the block specified.

Retrieves a number of transactions in the block specified.

#### Code example

```csharp
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using Nethereum.RPC.Eth.DTOs;
using UnityEngine;

namespace DefaultNamespace
{
    public class GetTransactionCountExample : MonoBehaviour
    {
        private IMirageSDK _mirageSDKWrapper;

        private void Start()
        {
            _mirageSDKWrapper = MirageSDKFactory.GetMirageSDKInstance("https://...");
        }

        public async void GetBalance()
        {
            var blockHash = "0x...";
            ulong blockNumber = 99999;
            
            var blockTransactionsCountByHash = await _mirageSDKWrapper.Eth.GetTransactionCount(blockHash);
            var latestBlockTransactionsCount = await _mirageSDKWrapper.Eth.GetTransactionCount(BlockParameter.CreateLatest());
            var blockTransactionsCountByNumber = await _mirageSDKWrapper.Eth.GetTransactionCount(new BlockParameter(blockNumber));
        }
    }
}
```

---

### `GetBlockWithTransactions`

#### Declaration

> `Task<BlockWithTransactions> GetBlockWithTransactions(string hash)` OR<br/>
> `Task<BlockWithTransactions> GetBlockWithTransactions(BlockParameter block)`

**Parameters**:

  * `hash` (string) — a block hash.
  * `block` (string) — a `BlockParameter` that can be either a number of blocks or the `earliest`, `latest`, or `pending` options.

#### Returns

  * `BlockWithTransactions` — a block object containing transactions objects.

#### Code sample

```csharp
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using Nethereum.RPC.Eth.DTOs;
using UnityEngine;

namespace DefaultNamespace
{
    public class GetBlockWithTransactionsExample : MonoBehaviour
    {
        private IMirageSDK _mirageSDKWrapper;

        private void Start()
        {
            _mirageSDKWrapper = MirageSDKFactory.GetMirageSDKInstance("https://...");
        }

        public async void GetBalance()
        {
            var blockHash = "0x...";
            ulong blockNumber = 99999;
            
            var blockByHash = await _mirageSDKWrapper.Eth.GetBlockWithTransactions(blockHash);
            var latestBlock = await _mirageSDKWrapper.Eth.GetBlockWithTransactions(BlockParameter.CreateLatest());
            var blockByNumber = await _mirageSDKWrapper.Eth.GetBlockWithTransactions(new BlockParameter(blockNumber));
        }
    }
}
```

---

### `GetBlockWithTransactionsHashes`

#### Declaration

> `Task<BlockWithTransactionHashes> GetBlockWithTransactionsHashes(string hash)` OR<br/>
> `Task<BlockWithTransactionHashes> GetBlockWithTransactionsHashes(BlockParameter block)`

**Parameters**:

  * `hash` (string) — a block hash.
  * `block` (string) — `BlockParameter` that can be either a block number or the `earliest`, `latest`, or `pending` options.

#### Returns

  * `BlockWithTransactionHashes` — a block object containing transactions hashes.

Returns a block specified by a block number or block hash.

#### Code example

```csharp
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using Nethereum.RPC.Eth.DTOs;
using UnityEngine;

namespace DefaultNamespace
{
    public class GetBlockWithTransactionsHashesExample : MonoBehaviour
    {
        private IMirageSDK _mirageSDKWrapper;

        private void Start()
        {
            _mirageSDKWrapper = MirageSDKFactory.GetMirageSDKInstance("https://...");
        }

        public async void GetBalance()
        {
            var blockHash = "0x...";
            ulong blockNumber = 99999;
            
            var blockByHash = await _mirageSDKWrapper.Eth.GetBlockWithTransactionsHashes(blockHash);
            var latestBlock = await _mirageSDKWrapper.Eth.GetBlockWithTransactionsHashes(BlockParameter.CreateLatest());
            var blockByNumber = await _mirageSDKWrapper.Eth.GetBlockWithTransactionsHashes(new BlockParameter(blockNumber));
        }
    }
}
```

---

### `EstimateGas`

#### Declaration

> `Task<HexBigInteger> EstimateGas(string from, string to, string data, string value, string gas, string gasPrice, string nonce)` OR<br/>
> 
> `Task<HexBigInteger> EstimateGas(TransactionInput transactionInput)`

**Parameters**:

  * `from` (string) — a sender's account address.
  * `to` (sting) — the destination address of the message.
  * `data` (string; optional) — a contract's function call data.
  * `value` (string; optional) — a value transferred for the transaction (in wei).
  * `gas` (sting; optional) — a maximum gas value provided for this transaction (gas limit).
  * `gasPrice` (string; optional) — a gas price (in wei) to use for this transaction.
  * `nonce` (integer; optional) — allows to overwrite your own pending transactions that use the same nonce.
  * `transactionInput` — an object containing transaction parameters.

#### Returns

  * `HexBigInteger` — a gas amount.

Retrieves an amount of gas for the transaction specified.

#### Code example

```csharp
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using Cysharp.Threading.Tasks;
using UnityEngine;

public class EstimateGasExample : MonoBehaviour
{
	private IEthHandler _eth;

	private void Start()
	{
		var mirageSDK = MirageSDKFactory.GetMirageSDKInstance("http://...");
		_eth = mirageSDK.Eth;
	}

	public async UniTaskVoid EstimateGas()
	{
		var sender = "0x...";
		var receiver = "0x...";
		var value = "1"; // in Wei
		var gas = await _eth.EstimateGas(sender, receiver, value: value);
		
	}
}
```

---

### `Sign`

#### Declaration

> `Task<string> Sign(string messageToSign, string address)`

**Parameters**:

  * `messageToSign` (string) — a message that has to be signed.
  * `address` (string) — an account address.

#### Returns

  * `string` — a signature.

Signs the data using an account address specified.

#### Code example

```csharp
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using UnityEngine;

public class SignExample : MonoBehaviour
{
	private IEthHandler _eth;

	private void Start()
	{
		var mirageSDK = MirageSDKFactory.GetMirageSDKInstance("http://...");
		_eth = mirageSDK.Eth;
	}

	public async void SignMessage()
	{
		var address = await _eth.GetDefaultAccount();
		
		var message = "Hello world!";
		var signature = await _eth.Sign(message, address);
		
		Debug.Log($"Signature: {signature}");
	}
}
```

---

### `SendTransaction`

#### Declaration

> `Task<string> SendTransaction(string from, string to, string data, string value, string gas, string gasPrice, string nonce)`

**Parameters**:

  * `from` (string) — a sender's account address.
  * `to` (sting) — a destination address of the message.
  * `data` (string; optional) — a contract's function call data.
  * `value` (string; optional) — a value transferred for the transaction (in wei).
  * `gas` (sting; optional) — a maximum gas value provided for this transaction (gas limit).
  * `gasPrice` (string; optional) — a gas price (in wei) to use for this transaction.
  * `nonce` (integer; optional) — allows to overwrite your own pending transactions that use the same nonce.

#### Returns

  * `string` — a 32-bytes transaction hash.

Sends a transaction to the network.

#### Code example

```csharp
using MirageSDK.Core.Infrastructure;
using MirageSDK.Provider;
using Cysharp.Threading.Tasks;
using UnityEngine;

public class SendTransactionExample : MonoBehaviour
{
	private IEthHandler _eth;

	private void Start()
	{
		var mirageSDK = MirageSDKFactory.GetMirageSDKInstance("http://...");
		_eth = mirageSDK.Eth;
	}

	public async UniTaskVoid SendTransaction()
	{
		var sender = "0x...";
		var receiver = "0x...";
		var value = "1"; // in Wei
		var trxHash = await _eth.SendTransaction(sender, receiver, value: value);
	}
}
```

---

### `WalletAddEthChain`

#### Declaration

> `UniTask WalletAddEthChain(EthChainData chainData)`

**Parameters**:

* `chainData` (EthChainData) — chain data.

Add new chain to wallet.

---

### `WalletSwitchEthChain`

#### Declaration

> `UniTask WalletSwitchEthChain(EthChain chain)`

**Parameters**:

* `chain` (EthChain) — object with chain id.

Switch wallet to given chain.

---

### `WalletUpdateEthChain`

#### Declaration

> `UniTask WalletUpdateEthChain(EthUpdateChainData chain)`

**Parameters**:

* `chain` (EthUpdateChainData) — chain data for update.

Update existed chain data 