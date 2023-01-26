# Aptos Integration

Aptos SDK is the means to integrate the Aptos blockchain into Unreal Engine via the official [Aptos API](https://fullnode.devnet.aptoslabs.com/v1/spec#/). The project is in the early stages of development and currently supports the Windows platform only.

## Supported functionality

Aptos SDK provides the following functionality:

  * [Submit transaction](/unreal-sdk/aptos-integration/#submit-transaction) — submitting a transaction to the Aptos blockchain.
  * [Transfer coins](/unreal-sdk/aptos-integration/#transfer-coins) — transferring coins between accounts.
  * [Check account balance](/unreal-sdk/aptos-integration/#get-account-balance) — checking the account's coin balance.
  * [Create collection](/unreal-sdk/aptos-integration/#create-collection) — creating a collection.
  * [Create token](/unreal-sdk/aptos-integration/#create-token) — creating a token inside a collection.
  * [Offer tokens](/unreal-sdk/aptos-integration/#offer-token) — offering tokens to another account.
  * [Claim tokens](/unreal-sdk/aptos-integration/#claim-token) — claiming the offered tokens.
  * [Cancel tokens](/unreal-sdk/aptos-integration/#cancel-token) — canceling the offered tokens.

The supported functions reside inside the `AptosClient.cpp` file located in the Aptos SDK [GitHub repository](https://github.com/Ankr-network/game-unreal-aptos-sdk) at the following path `UnrealAptosSDK/Plugins/AptosSDK/Source/AptosSDK/Private/`. Those functions are to be called from Unreal Engine's `Widget_Menu` Blueprint.

Use the methods in the Blueprint below to reference `AptosClient.cpp`:
<br/>

<img src="/docs/gaming/aptos-client-blueprint.png" alt="AptosClient.cpp Blueprint" class="responsive-pic" width="800" />

## Submit transaction

In Aptos, a transaction submission executes via the number of functions:

  1. [`GetEncodeSubmissionRequest`](/unreal-sdk/aptos-integration/#getencodesubmissionrequest) — creates a request to encode submission data required to perform a transaction.
  2. [`EncodeSubmission`](/unreal-sdk/aptos-integration/#encodesubmission) — gets a signing message.
  3. [`SignMessage`](/unreal-sdk/aptos-integration/#signmessage) — signs the BSC message.
  4. [`GetTransactionSignature`](/unreal-sdk/aptos-integration/#gettransactionsignature) — creates a transaction signature.
  5. [`GetSubmitTransactionRequest`](/unreal-sdk/aptos-integration/#getsubmittransactionrequest) — creates a request for transaction submission.
  6. [`SubmitTransaction`](/unreal-sdk/aptos-integration/#submittransaction) — submits a transaction and obtains a transaction hash.

### `GetEncodeSubmissionRequest`

The `GetEncodeSubmissionRequest` function requests [encoding](https://fullnode.devnet.aptoslabs.com/v1/spec#/schemas/EncodeSubmissionRequest) the transaction data required to submit a transaction.

Here you create a request for serialization that will be sent to Aptos. You need to provide the [raw transaction](https://aptos.dev/guides/creating-a-signed-transaction/#raw-transaction) for the function to be executed in an Aptos [Module](https://aptos.dev/reference/glossary/#move-module) (Contract) and the provided transaction data to be encoded in [BSC (Binary Canonical Serialization)](https://aptos.dev/guides/creating-a-signed-transaction/#bcs).

### `EncodeSubmission`

The `EncodeSubmission` function obtains the signing message.

Here you receive the BSC-encoded transaction data and the `prefix_bytes` (which is `sha3_256` hash bytes of the `APTOS::RawTransaction` string) concatenated into the signing message:

`signing_message = prefix_bytes | bcs_bytes_of_raw_transaction`.

### `SignMessage`

The `SignMessage` function signs the BCS message.

### `GetTransactionSignature`

Call the `GetTransactionSignature` function to create a transaction signature.

Here you sign the signing message with the sender's account private key.

### `GetSubmitTransactionRequest`

The `GetSubmitTransactionRequest` function creates a transaction request ready to submit to Aptos.

Here you have the BSC-encoded transaction data and the transaction signature to be processed into the submit transaction request for Aptos.

### `SubmitTransaction`

The `SubmitTransaction` function submits a transaction request provided in the previous step and obtains a transaction hash.

## Transfer coins

> **Transfers the specified amount of coins from the sender to receiver account.**

Coins transfer between two account requires the following info to be specified:

  * Sender account (`From`)
  * Receiver account (`To`)
  * The amount of coins to transfer
<br/>

<img src="/docs/gaming/aptos-unreal/transfer-coins.png" alt="Transfer coins" class="responsive-pic" width="800" />

## Get account balance

> **Gets the coin balance for the account specified.**

To get the account's coin balance, provide the following parameter:

  * Account address.
<br/>

<img src="/docs/gaming/aptos-unreal/get-balance.png" alt="Get an account balance" class="responsive-pic" width="800" />

## Create collection

> **Creates a new collection for the account specified.**

To create a new collection, provide the following parameters:

  * Collection name
  * Collection description
  * URI
  * Max. amount the collection can hold
<br/>

<img src="/docs/gaming/aptos-unreal/create-collection.png" alt="Create a collection" class="responsive-pic" width="800" />

## Create token

> **Creates a new token within the collection specified.**

To create a new token within the collection, provide the following parameters:

  * Collection name
  * Token name
  * Token description
  * Token supply
  * Token URI
  * Max. supply (the maximum number of tokens that can be minted from this token)
<br/>

<img src="/docs/gaming/aptos-unreal/create-token.png" alt="Create a token" class="responsive-pic" width="800" />

## Offer tokens

> **Transfer a specified amount of tokens from the creator to receiver account.**

To transfer tokens between two accounts, provide the following parameters:

  * Receiver address
  * Creator address
  * Collection name
  * Token name
  * Amount of tokens to transfer
<br/>

<img src="/docs/gaming/aptos-unreal/offer-token.png" alt="Offer tokens" class="responsive-pic" width="800" />

## Claim tokens

> **Claims tokens under the account specified.**

To claim tokens under the account specified, provide the following parameters:

  * Sender address
  * Creator address
  * Collection name
  * Token name
<br/>

<img src="/docs/gaming/aptos-unreal/claim-tokens.png" alt="Claim tokens" class="responsive-pic" width="800" />

## Cancel tokens

> **Cancels pending tokens offered for another account to claim.**

To cancel pending offered tokens, provide the following parameters:

  * Receiver account
  * Creator account
  * Collection name
  * Token name
<br/>

<img src="/docs/gaming/aptos-unreal/cancel-tokens.png" alt="Cancel offered tokens" class="responsive-pic" width="800" />




