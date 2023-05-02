import { Callout } from "components";

# Interact with smart contract

This section will walk you through the concept of a smart contract and how to interact with it.
You will learn the following things:

  * [What's a smart contract?](/unity-sdk/interacting-with-blockchain/interacting-with-smart-contract/#whats-a-smart-contract)
  * [How to prepare a contract for making calls?](/unity-sdk/interacting-with-blockchain/interacting-with-smart-contract/#how-to-prepare-a-contract-for-calls)
  * [What's a transaction?](/unity-sdk/interacting-with-blockchain/interacting-with-smart-contract/#whats-a-transaction)
  * [How to interact with data-changing methods?](/unity-sdk/interacting-with-blockchain/interacting-with-smart-contract/#interaction-via-data-changing-methods)
  * [How to interact via data-retrieving methods?](/unity-sdk/interacting-with-blockchain/interacting-with-smart-contract/#interaction-via-data-retrieving-methods)

## What's a smart contract?

On a high level of abstraction, a smart contract is a way to store data on the blockchain and access that data. A smart contract feels like a classic backend with controller, service, and data layers in one class. But unlike the backend, smart contracts have substantial limitations. Let's take a closer look at them:

  * You need to pay for all data changes made via a smart contract. Of course, not you personally, but the user who calls methods that change data on the blockchain. The payment for processing such transactions is called gas. Meanwhile, the methods that only return values require no gas fee for processing.
  * A smart contract can't process bulk data. That applies to the methods either storing and retrieving data.
  * You can't select multiple data, only single items. Solidity has no any sort of circles that is why you will need to request data items one by one using some kind of identifier. Only [events](/unity-sdk/how-to/update-events/) allow you to make selections from data.

Let's create a simple contract for the next steps.

```solidity
// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16;

contract SimpleStorage {
    mapping (address => uint) public count;

    function add(uint sum) public {
        count[msg.sender] = sum;
    }

    function get(address user) public view returns (uint) {
        return count[user];
    }
}
```

What's the purpose of that contract?

  * Initializes the field count an associative array with address and count of this address.
  * Defines the method that adds value for a specific address (requires a gas fee).
  * Defines the method that counts specific addresses (free of gas fee).
  * Let’s deploy this contract to the blockchain and write the code to call contract methods.

To find more info on gas fees and gas-free methods, go [here](/extra/gas-fees-gas-free-methods/).

<Callout type="tip">
The smart contract code presented here is not intended for production purposes. It ignores the Solidity best practices and has purely educative purposes behind it. And we didn't intend to teach you writing contracts.
</Callout>

## How to prepare a contract for calls?

You have a wide range of tools to deploy a smart contract — Smart contract manager, Remix IDE, or script. When a smart contract has been compiled and deployed, several items need your attention — the contract's ABI and address. Using them, we'll create a contract instance via the SDK.

Before we start writing code, let's [set up](/unity-sdk/setting-up/) the Mirage SDK in our project:

```solidity
var ABI = "your contract abi";
var address = "your contract address";
var sdkInstance = MirageSDKFactory.GetMirageSDKInstance(NetworkName.BinanceSmartChain_TestNet);
var contract = sdkInstance.GetContract(address, ABI);
```

## What's a transaction?

Transactions are the primary way to interact with the blockchain. Requests to the smart contract methods changing the current blockchain state involve the transactions under the hood. For instance, to make a call to the contract's `add` method, we'll create a transaction containing the method name and an argument. A transaction body contains the sender, receiver, gas, and other fields.

A transaction has the following lifecycle:

  1. `Sent to node`: a transaction has already been sent but is still pending to be accepted into the mine.
  2. `Accepted to mine`: the network has accepted a transaction into the mine, but the transaction is yet to be mined.
  3. `Mined`: the transaction has been written into the blockchain.
  4. `Error`: the transaction has been rejected by the network.

## Interaction via data-changing methods

Let’s take a closer look at our contract sample. It has a single data-changing method – `add`. So how we call it?

There are two ways to call that type of method on a smart contract: `CallMethod` and `Web3SendMethod`. Let’s dive into those.

### `Web3SendMethod`

Using the `Web3SendMethod` is the easiest way to interact with smart contract methods for its provision of convenient mechanisms for observing all the transaction lifecycle stages. You just need to use the [`TransactionEventDelegator`](https://github.com/Ankr-network/game-unity-sdk/blob/88f4086882c0f5a66adda0f8e5683c5ac3da6ec5/Assets/MirageSDK/Examples/Scripts/EventListenerExample/TransactionEventDelegator.cs) class or implement your own class from the [`ITransactionHandler`](https://github.com/Ankr-network/game-unity-sdk/blob/88f4086882c0f5a66adda0f8e5683c5ac3da6ec5/Assets/MirageSDK/Runtime/Core/Infrastructure/ITransactionEventHandler.cs) interface.

```solidity
// 1
var evController = new TransactionEventDelegator();
evController.OnTransactionSendBegin += HandleSending;
evController.OnTransactionSendEnd += HandleSent;
evController.OnTransactionHashReceived += HandleTransactionHash;
evController.OnReceiptReceived += HandleReceipt;
evController.OnError += HandleError;

// 2
var methodName = "add";
var arguments = new object[]
{
	new BigInteger(10)
};

// 3		
contract.Web3SendMethod(methodName, arguments, evController);
```

The stages involved in the code above:

  1. Make an instance of [`TransactionEventDelegator`](https://github.com/Ankr-network/game-unity-sdk/blob/88f4086882c0f5a66adda0f8e5683c5ac3da6ec5/Assets/MirageSDK/Examples/Scripts/EventListenerExample/TransactionEventDelegator.cs) and subscribe to the events you need to observe. You don't need to subscribe to all events.

  2. Prepare a method name and arguments. The arguments must be prepared according to the contract's method argument types and in the same order as in the contract method. To read more about C# and Solidity comparison, go [here](/extra/csharp-to-solidity/).

  3. Call `Web3SendMethod` with the arguments prepared.

After the call, the methods are subscribed to [`TransactionEventDelegator`](https://github.com/Ankr-network/game-unity-sdk/blob/88f4086882c0f5a66adda0f8e5683c5ac3da6ec5/Assets/MirageSDK/Examples/Scripts/EventListenerExample/TransactionEventDelegator.cs) will execute in the order of transaction lifecycle.


### `CallMethod`

You can use a more granular method — `CallMethod`— for specific cases. It covers transaction lifecycle events until receiving the `Accepted to mine` event. That will require you to control other lifecycle events using the [`GetTransaction`](/unity-sdk/reference/eth-handler/#gettransaction) or [`GetTransactionReceipt`](/unity-sdk/reference/eth-handler/#gettransactionreceipt) methods.

```solidity
var arguments = new object[]
{
  new BigInteger(10)
};

var methodName = "add";
			
var transactionHash = await contract.CallMethod(methodName, arguments);
Debug.Log($"Receipt: {transactionHash}");

var trx = await _eth.GetTransaction(transactionHash);

Debug.Log($"Nonce: {trx.Nonce}");
```

## Interaction via data-retrieving methods

Retrieving data from the contract is similarly easy as adding data. But that process requires more preparation. First, you need to analyze the signature of the method that you're going to call for data retrieving.

Based on that you need to prepare an entity.

```solidity
// function get(address user) public view returns (uint) {
//    return count[user];
// }

[Function("get", "uint")]
public class GetMessage : FunctionMessage
{
	[Parameter("address", "user")]
	public string User { get; set; }
}
```

For convenience, we have the code of the contract method before the class definition.

Let's break down the parts of that class:

  1. The `Function` attribute defines the name and returns the contract type of method.

  2. The `GetMessage` class extends from `FunctionMessage`. There are no specific rules for class naming, but we use the `Message` postfix after a contract method name.

  3. The fields of the entity correspond to the arguments that a contract method takes. Each of those fields must have a `Parameter` attribute with the type and name of the argument. If there is more than one argument in a contract method, use the third argument of the `Parameter` attribute to define the arguments' order.

Then we can query the `get` contract method calling `GetData` with the instance of our entity.

```solidity
var getMessage = new GetMessage()
{
	User = "your address"
};

var count = await contract.GetData<GetMessage, BigInteger>(getMessage);
```

Method `GetData` returns `BigInteger` according to the [type transition between C# and Solidity](/extra/csharp-to-solidity/).

## Conclusion

We've covered the major parts of interacting with a smart contract, but it's not an all-encompassing guide on the topic. To obtain more info, refer to our SDK samples. To get more info on how events can help with tracking your smart contract activity in real time, refer to this [article](/unity-sdk/how-to/update-events/).

