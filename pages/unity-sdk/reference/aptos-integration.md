# Aptos Integration

Aptos SDK is the means to integrate the Aptos blockchain into Unity via the official [Aptos API](https://fullnode.devnet.aptoslabs.com/v1/spec#/).

## AptosSDK classes

  * [Account](/unity-sdk/reference/aptos-integration/#account) — creating and managing the Aptos account.
  * [Client](/unity-sdk/reference/aptos-integration/#client) — retrieving data from the Aptos node.
  * [CoinClient](/unity-sdk/reference/aptos-integration/#coinclient) — transferring coins and checking balances.
  * [FaucetClient](/unity-sdk/reference/aptos-integration/#faucetclient) — requesting tokens from the faucet.
  * [TokenClient](/unity-sdk/reference/aptos-integration/#tokenclient) — creating, minting, and managing minted NFT collections and tokens.

## Account

A class for creating and managing an Aptos account.

**Hierarchy**:

  * System.Object  
    ↳ Account

**Inherited members**:

System.Object.ToString()  
System.Object.Equals(System.Object)  
System.Object.Equals(System.Object, System.Object)  
System.Object.ReferenceEquals(System.Object, System.Object)  
System.Object.GetHashCode()  
System.Object.GetType()  
System.Object.MemberwiseClone()

**Syntax**:

```csharp
public class Account
```

### Constructors

#### Account

**Declaration**:

```csharp
public Account(byte[] privateKey, string address)
```

**Parameters**:

  * `privateKey` (`System.Byte[]`): a private key from which the account key pair will be generated. If not specified, new key pair will be created.
  * `address` (`System.String`): a hex-encoded 32 byte account address. If not specified, a new one will be generated from a public key.  
    Example: `0xe8012714cd17606cee7188a2a365eef3fe760be598750678c8c5954eb548a591`.

### Methods

#### `GetAddress`

Retrieves the address associated with the account specified.

An address  is the key by which Aptos account is referenced. It is the 32-byte of the SHA-3 256 cryptographic hash of the public key(s) concatenated with a signature scheme identifier byte.

**Declaration**:

```csharp
public string GetAddress()
```

**Returns**:

  * `System.String`: a hex string of the address associated with the account specified.

---

#### `Sign`

Signs a specified message with account's private key.

**Declaration**:

```csharp
public byte[] Sign(byte[] message)
```

**Parameters**:

  * `message` (`System.Byte[]`): the message to sign with account's private key.

**Returns**:

  * `System.Byte[]`: a signature HexString.

---

## Client

A class for retrieving data from the Aptos node.

**Hierarchy**:

  * System.Object  
    ↳ Client

**Inherited members**:

System.Object.ToString()  
System.Object.Equals(System.Object)  
System.Object.Equals(System.Object, System.Object)  
System.Object.ReferenceEquals(System.Object, System.Object)  
System.Object.GetHashCode()  
System.Object.GetType()  
System.Object.MemberwiseClone()

**Syntax**:

```csharp
public class Client
```

### Constructors

#### Client

Builds a client configured to connect to an Aptos node at the given URL.

**Declaration**:

```csharp
public Client(string nodeUrl, OpenAPIConfig config = null)

```

**Parameters**:

  * `nodeUrl` (`System.String`): the URL of the Aptos Node API endpoint.
  * `config` (`OpenAPIConfig`): additional [configuration options](https://aptos-labs.github.io/ts-sdk-doc/types/Types.OpenAPIConfig.html) for the generated Axios client.

### Methods

#### `GetAccountResource`

Retrieves the resource associated with an account specified by resource type.

**Declaration**:

```csharp
public Task<MoveResource> GetAccountResource(string account, string resourceType)
```

**Parameters**:

  * `account` (`System.String`): the hex-encoded 32 byte Aptos account address.
  * `resourceType` (`System.String`): a string representation of an on-chain Move struct type.

**Returns**:

  * `System.Threading.Tasks.Task<MoveResource>`: an account resource of specified type and ledger version.

---

#### `GetEventsByCreationNumber`

Event types are globally identifiable by an account `address` and monotonically increasing `creation_number`, one per event type emitted to the given account. This API returns events corresponding to that event type.

**Declaration**:

```csharp
public Task<VersionedEvent> GetEventsByCreationNumber(string address, ulong creationNumber, ulong? start = null, ulong? limit = null)
```

**Parameters**:

  * `address` (`System.String`): the hex-encoded 32 byte Aptos account, with or without a 0x prefix, for which events are queried. This refers to the account that events were emitted to, not the account hosting the move module that emits that event type.
  Example: `0x88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1`.

  * `creationNumber` (`System.UInt64`): a creation number corresponding to the event stream originating from the given account.
  Example: `32425224034`.

  * `start` (`System.Nullable<System.UInt64>`): the max number of events to retrieve. If unspecified, defaults to the page size.

  * `limit` (`System.Nullable<System.UInt64>`): the starting sequence number of events. If unspecified, retrieves the most recent events.
  Example: `32425224034`.

**Returns**:

  * `System.Threading.Tasks.Task<VersionedEvent>`: an array of events associated with the given account and creation number.

---

#### `GetEventsByEventHandle`

This API uses the given account `address`, `eventHandle`, and `fieldName` to build a key that can globally identify an event types. It then uses this key to return events emitted to the given account matching that event type.

**Parameters**:

  * `address` (`System.String`): the hex-encoded 32 byte Aptos account, with or without a `0x` prefix, for which events are queried. This refers to the account that events were emitted to, not the account hosting the move module that emits that event type.
  Example: `0x88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1`.

  * `eventHandle` (`System.String`): the name of the struct to look for the event handle.
  Example: `0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>`.
  Match pattern: `^0x[0-9a-zA-Z:_<>]+$`.

  * `fieldName` (`System.String`): the name of the field to look for the event handle.
  Example: `withdraw_events`.

  * `start` (`System.Nullable<System.UInt64>`): the max number of events to retrieve. If unspecified, defaults to the page size.

  * `limit` (`System.Nullable<System.UInt64>`): the starting sequence number of events. If unspecified, retrieves the most recent.
  Example: `32425224034`.

**Returns**:

  * `System.Threading.Tasks.Task<VersionedEvent>`: an array of events.

---

#### `GetTableItem<TReturn>`

Gets a table item from the table identified by `table_handle` and `TableItemRequest` provided in the request body.

**Declaration**:

```csharp
public Task<TReturn> GetTableItem<TReturn>(string tableHandle, TableItemRequest requestBody)
```

**Parameters**:

  * `tableHandle` (`System.String`): the table handle hex-encoded 32 byte string.
  * `requestBody` (`TableItemRequest`): a request containing the [following parameters](https://fullnode.devnet.aptoslabs.com/v1/spec#/schemas/TableItemRequest).

**Returns**:

  * `System.Threading.Tasks.Task<TReturn>`: a table item value rendered in JSON.

---

#### `GetTransactionByHash`

Looks up a transaction by its hash.

When given a transaction hash, the server first looks for the transaction in storage (on-chain, committed). If no on-chain transaction is found, it looks the transaction up by hash in the mempool (pending, not yet committed).

**Declaration**:

```csharp
public Task<TypedTransaction> GetTransactionByHash(string hash)
```

**Parameters**:

  * `hash` (`System.String`): the hash of the transaction to retrieve.

**Returns**:

  * `System.Threading.Tasks.Task<TypedTransaction>`: either a transaction from the mempool (pending) or an on-chain (committed) transaction.

---

#### `PopulateRequestParams`

**Declaration**:

```csharp
public async Task PopulateRequestParams(SubmitTransaction transaction, OptionalTransactionArgs extraArgs = null)
```

**Parameters**:

  * `transaction` (`SubmitTransaction`): a request to submit a transaction containing the [following parameters](https://fullnode.devnet.aptoslabs.com/v1/spec#/schemas/SubmitTransactionRequest).
  * `extraArgs` (`OptionalTransactionArgs`): [optional transaction arguments](https://aptos-labs.github.io/ts-sdk-doc/interfaces/OptionalTransactionArgs.html).

**Returns**:

  * `System.Threading.Tasks.Task`:

---

#### `SimulateTransaction`

The output of the transaction will have the exact transaction outputs and events that running an actual signed transaction would have. However, it will not have the associated state hashes, as they are not updated in storage. This can be used to estimate the maximum gas units for a submitted transaction.

**Declaration**:

```csharp
public Task<UserTransaction> SimulateTransaction(SubmitTransactionRequest requestBody, bool? estimateMaxGasAmount = null, bool? estimateGasUnitPrice = null, bool? estimatePrioritizedGasUnitPrice = null)
```

**Parameters**:

  * `requestBody` (`SubmitTransactionRequest`): a request to submit a transaction containing the [following parameters](https://fullnode.devnet.aptoslabs.com/v1/spec#/schemas/SubmitTransactionRequest).
  * `estimateMaxGasAmount` (`System.Nullable<System.Boolean>`): if set to `true`, the max gas value in the transaction will be ignored and the maximum possible gas will be used.
  * `estimateGasUnitPrice` (`System.Nullable<System.Boolean>`): if set to `true`, the gas unit price in the transaction will be ignored and the estimated value will be used.
  * `estimatePrioritizedGasUnitPrice` (`System.Nullable<System.Boolean>`): if set to `true`, the transaction will use a higher price than the original estimate.

**Returns**:

  * `System.Threading.Tasks.Task<UserTransaction>`: the BCS-encoded signed transaction.

---

#### `SubmitTransaction`

Submits a transaction. See the details [here](https://fullnode.devnet.aptoslabs.com/v1/spec#/operations/submit_transaction).

**Declaration**:

```csharp
public Task<PendingTransactionPayload> SubmitTransaction(SubmitTransactionRequest request)
```

**Parameters**:

  * `request` (`SubmitTransactionRequest`): a request to submit a transaction containing the [following parameters](https://fullnode.devnet.aptoslabs.com/v1/spec#/schemas/SubmitTransactionRequest).

**Returns**:

  * `System.Threading.Tasks.Task<PendingTransactionPayload>`: the transaction that is accepted and submitted to mempool.

---

## CoinClient

A class for working with the coin module, such as transferring coins and checking balances.

**Hierarchy**:

  * System.Object  
    ↳ CoinClient

**Syntax**:

```csharp
public class CoinClient : SpecificClient
```

### Constructors

#### CoinClient

Creates a new CoinClient instance.

**Declaration**:

```csharp
public CoinClient(Client client)
```

**Parameters**:

  * `client` (`Client`): an instance of the [Client](https://aptos-docs.mirage.xyz/api/Mirage.Aptos.SDK.Client.html).

### Methods

#### `GetBalance`

Retrieves the amount of AptosCoin for the account specified.

**Declaration**:

```csharp
public async Task<BigInteger> GetBalance(Account account)
```

**Parameters**:

  * `account` (`Account`): the address of account you'd like to check the balance for.  
  Example: `0x88fbd33f54e1126269769780feb24480428179f552e2313fbe571b72e62a1ca1`.

**Returns**:

  * `System.Threading.Tasks.Task<BigInteger>`: the task with the account balance as a big integer.

---

#### `SimulateTransfer`

This method retrieves the same transaction outputs and events as the actual transfer would have. However, it will not have the associated state hashes, as they are not updated in storage. This can be used to estimate the maximum gas units for a transfer transaction.

**Declaration**:

```csharp
public async Task<UserTransaction> SimulateTransfer(Account from, Account to, ulong amount)
```

**Parameters**:

  * `from` (`Account`): the sender's hex-encoded 32 byte Aptos account address.
  * `to` (`Account`): the recipient's hex-encoded 32 byte Aptos account address.
  * `amount` (`System.UInt64`): the amount of coins to transfer.

**Returns**:

  * `System.Threading.Tasks.Task<UserTransaction>`: returns the [UserTransaction parameters](https://fullnode.devnet.aptoslabs.com/v1/spec#/schemas/Transaction_UserTransaction).

---

### `Transfer`

Generate, sign, and submit a transaction to the Aptos blockchain API to transfer AptosCoin from one account to another.

**Declaration**:

```csharp
public async Task<PendingTransactionPayload> Transfer(Account from, Account to, ulong amount)
```

**Parameters**:

  * `from` (`Account`): the sender's hex-encoded 32 byte Aptos account address.
  * `to` (`Account`): the recipient's hex-encoded 32 byte Aptos account address.
  * `amount` (`System.UInt64`): the amount of coins to transfer.

**Returns**:

  * `System.Threading.Tasks.Task<PendingTransactionPayload>`: the hash of the transaction submitted to the API.

---

## FaucetClient

A class for requesting tokens from the faucet.

**Hierarchy**:

  * System.Object  
    ↳ FaucetClient

**Inherited members**:

System.Object.ToString()  
System.Object.Equals(System.Object)  
System.Object.Equals(System.Object, System.Object)  
System.Object.ReferenceEquals(System.Object, System.Object)  
System.Object.GetHashCode()  
System.Object.GetType()  
System.Object.MemberwiseClone()

**Syntax**:

```csharp
public class FaucetClient
```

### Constructors

#### FaucetClient

Establishes a connection to Aptos node.

**Declaration**:

```csharp
public FaucetClient(string faucetUrl, Client client)
```

**Parameters**:

  * `faucetUrl` (`System.String`): a faucet URL to request the tokens from.
  * `client` (`Client`): the Aptos client.

### Methods

#### `FundAccount`

Creates an account if it does not exist, and mints the specified amount of coins into that account.

**Declaration**:

```csharp
public async Task<TypedTransaction[]> FundAccount(Account account, uint amount)
```

**Parameters**:

  * `account` (`Account`): the Aptos account to mint the tokens into.
  * `amount` (`System.UInt32`): the amount of tokens to mint.

**Returns**:

  * `System.Threading.Tasks.Task<TypedTransaction[]>`: the task with the transaction submitted.

---

## TokenClient

A class for creating, minting, and managing minted NFT collections and tokens.

**Hierarchy**:

  * System.Object  
    ↳ TokenClient

**Syntax**:

```csharp
public class TokenClient : SpecificClient
```

### Constructors

#### TokenClient

Creates a new TokenClient instance.

**Declaration**:

```csharp
public TokenClient(Client client)
```

**Parameters**:

  * `client` (`Client`): an instance of the [Client](https://aptos-docs.mirage.xyz/api/Mirage.Aptos.SDK.Client.html).

### Methods

#### `ClaimToken`

Claims a token on the account specified.

**Declaration**:

```csharp
public Task<PendingTransactionPayload> ClaimToken(Account account, string sender, string creator, string collectionName, string name, long propertyVersion = 0L, OptionalTransactionArgs extraArgs = null)
```

**Parameters**:

  * `account` (`Account`): an Aptos account which will claim the token.
  * `sender` (`System.String`): the hex-encoded 32 byte Aptos account address which holds the token.
  * `creator` (`System.String`): the hex-encoded 32 byte Aptos account address which created the token.
  * `collectionName` (`System.String`): the name of collection storing the token.
  * `name` (`System.String`): the token name.
  * `propertyVersion` (`System.Int64`): the version of token PropertyMap with a default value 0.
  * `extraArgs` (`OptionalTransactionArgs`): [optional transaction arguments](https://aptos-labs.github.io/ts-sdk-doc/interfaces/OptionalTransactionArgs.html).\

**Returns**:

  * `System.Threading.Tasks.Task<PendingTransactionPayload>`: the hash of the transaction submitted to the API.

---

#### `CreateCollection`

Creates a new NFT collection within the account specified.

**Declaration**:

```csharp
public Task<PendingTransactionPayload> CreateCollection(Account account, string name, string description, string uri, long maxAmount = 4294967295L, OptionalTransactionArgs extraArgs = null)
```

**Parameters**:

  * `account` (`Account`): an Aptos account where the collection will be created.
  * `name` (`System.String`): a collection name.
  * `description` (`System.String`): a collection description.
  * `uri` (`System.String`): a URL to additional info on the collection.
  * `maxAmount` (`System.Int64`): the maximum number of `token_data` allowed within this collection.
  * `extraArgs` (`OptionalTransactionArgs`): [optional transaction arguments](https://aptos-labs.github.io/ts-sdk-doc/interfaces/OptionalTransactionArgs.html).

#### Returns

  * `System.Threading.Tasks.Task<PendingTransactionPayload>`: the hash of the transaction submitted to the API.

---

#### `CreateToken`

Creates a new NFT collection within the account specified.

**Declaration**:

```csharp
public Task<PendingTransactionPayload> CreateToken(Account account, string collectionName, string name, string description, ulong supply, string uri, ulong max = 18446744073709551615UL, string royaltyPayeeAddress = null, int royaltyPointsDenominator = 0, int royaltyPointsNumerator = 0, string[] propertyKeys = null, string[] propertyValues = null, string[] propertyTypes = null, OptionalTransactionArgs extraArgs = null)
```

**Parameters**:

  * `account` (`Account`): an Aptos account where the token will be created.
  * `collectionName` (`System.String`): the name of collection the token belongs to.
  * `name` (`System.String`): the token name.
  * `description` (`System.String`): a token description.
  * `supply` (`System.UInt64`): the token supply.
  * `uri` (`System.String`): a URL to additional info on the token.
  * `max` (`System.UInt64`): the maximum number of tokens that can be minted from this token.
  * `royaltyPayeeAddress` (`System.String`): the address to receive the royalty, the address can be a shared account address.
  * `royaltyPointsDenominator` (`System.Int32`): the denominator for royalty calculation.
  * `royaltyPointsNumerator` (`System.Int32`): the numerator for royalty calculation.
  * `propertyKeys` (`System.String[]`): the property keys for storing on-chain properties.
  * `propertyValues` (`System.String[]`): the property values to be stored on-chain.
  * `propertyTypes` (`System.String[]`): the type of property values.
  * `extraArgs` (`OptionalTransactionArgs`): [optional transaction arguments](https://aptos-labs.github.io/ts-sdk-doc/interfaces/OptionalTransactionArgs.html).

**Returns**:

  * `System.Threading.Tasks.Task<PendingTransactionPayload>`: the hash of the transaction submitted to the API.

---

#### `GetCollectionData`

Retrieves collection data.

**Declaration**:

```csharp
public async Task<CollectionPayload> GetCollectionData(string creator, string collectionName)
```

**Parameters**:

  * `creator` (System.String): the hex-encoded 32 byte Aptos account address that created a collection.
  * `collectionName` (System.String): a collection name.

**Returns**:

  * `System.Threading.Tasks.Task<CollectionPayload>`: returns collection data.

---

#### `GetToken`

Retrieves a token balance for the token creator.

**Declaration**:

```csharp
public Task<TokenFromAccount> GetToken(string creator, string collectionName, string tokenName, long propertyVersion)
```

**Parameters**:

  * `creator` (`System.String`): the hex-encoded 32 byte Aptos account address which created the token.
  * `collectionName` (`System.String`): the name of collection the token belongs to.
  * `tokenName` (`System.String`): the name of the token.
  * `propertyVersion` (`System.Int64`): the version of token PropertyMap with a default value 0.

**Returns**:

  * `System.Threading.Tasks.Task<TokenFromAccount>`: returns the token balance.

---

#### `GetTokenData`

Retrieves token data from a collection.

**Declaration**:

```csharp
public async Task<TokenPayload> GetTokenData(string creator, string collectionName, string tokenName)
```

**Parameters**:

  * `creator` (`System.String`): the hex-encoded 32 byte Aptos account address which created the token.
  * `collectionName` (`System.String`): the name of collection the token belongs to.
  * `tokenName` (`System.String`): the name of the token.

**Returns**:

  * `System.Threading.Tasks.Task<TokenPayload>`: returns token data.

---

#### `GetTokenForAccount`

Retrieves the token balance for a token account.

**Declaration**:

```csharp
public async Task<TokenFromAccount> GetTokenForAccount(string creator, TokenId tokenId)
```

**Parameters**:

  * `creator` (`System.String`): the hex-encoded 32 byte Aptos account address which created the token.
  * `tokenId` (`TokenId`): a token ID.

**Returns**:

  * `System.Threading.Tasks.Task<TokenFromAccount>`: returns the token object with ID and value parameters.

---

#### `OfferToken`

Transfers specified amount of tokens from the sender to receiver account.

**Declaration**:

```csharp
public Task<PendingTransactionPayload> OfferToken(Account account, string receiver, string creator, string collectionName, string name, long amount, long propertyVersion = 0L, OptionalTransactionArgs extraArgs = null)
```

**Parameters**:

  * `account` (`Account`): the hex-encoded 32 byte Aptos account address possessing the tokens to be transferred.
  * `receiver` (System.String): the hex-encoded 32 byte Aptos account address to which tokens will be transferred.
  * `creator` (System.String): the hex-encoded 32 byte Aptos account address that created tokens.
  * `collectionName` (System.String): a name of the collection storing the token.
  * `name` (System.String): the token name.
  * `amount` (System.Int64): the amount of tokens to transfer.
  * `propertyVersion` (System.Int64): the version of token PropertyMap with a default value 0.
  * `extraArgs` (OptionalTransactionArgs): [optional transaction arguments](https://aptos-labs.github.io/ts-sdk-doc/interfaces/OptionalTransactionArgs.html).

**Returns**:

  * `System.Threading.Tasks.Task<PendingTransactionPayload>`: the hash of the transaction submitted to the API.