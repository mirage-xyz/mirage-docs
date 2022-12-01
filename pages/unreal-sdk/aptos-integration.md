# Aptos Integration

Aptos SDK is the means to integrate the Aptos blockchain into Unreal Engine via the official [Aptos API](https://fullnode.devnet.aptoslabs.com/v1/spec#/). The project still undergoes the early stages of development and has only been tested on Windows yet.

Aptos SDK enables transferring coins from one person to another using Aptos API. The supported functions reside inside the `AptosClient.cpp` file located in the Aptos SDK [GitHub repository](https://github.com/Ankr-network/game-unreal-aptos-sdk) at the following path `UnrealAptosSDK/Plugins/AptosSDK/Source/AptosSDK/Private/`. Those functions are to be called from the Blueprint.

Use the methods in the Blueprint below to reference `AptosClient.cpp`:
<br/>

<img src="/docs/gaming/aptos-client-blueprint.png" alt="AptosClient.cpp Blueprint" class="responsive-pic" width="800" />

## Functions supported

The coins transfer transaction executes via the number of functions:

  1. [`GetEncodeSubmissionRequest`](/unreal-sdk/aptos-integration/#getencodesubmissionrequest) — creates a request to encode submission data required to perform a transaction.
  2. [`EncodeSubmission`](/unreal-sdk/aptos-integration/#encodesubmission) — gets a signing message.
  3. [`GetTransactionSignature`](/unreal-sdk/aptos-integration/#gettransactionsignature) — creates a transaction signature scheme and signs the signing message.
  4. [`GetTransactionSubmitRequest`](/unreal-sdk/aptos-integration/#gettransactionsubmitrequest) — creates a request for transaction submission.
  5. [`SubmitTransaction`](/unreal-sdk/aptos-integration/#submittransaction) — submits a transaction and obtains a transaction hash.

## `GetEncodeSubmissionRequest`

The `GetEncodeSubmissionRequest` function requests encoding the transaction data required to submit a transaction.

Here you create a request for serialization that will be sent to Aptos. You need to provide the [raw transaction](https://aptos.dev/guides/creating-a-signed-transaction/#raw-transaction) for the function to be executed in an Aptos [Module](https://aptos.dev/reference/glossary/#move-module) (Contract) and the provided transaction data to be encoded in [BSC (Binary Canonical Serialization)](https://aptos.dev/guides/creating-a-signed-transaction/#bcs).
<br/>

<img src="/docs/gaming/submission-reguest.png" alt="Submission request Blueprint" class="responsive-pic" width="600" />

## `EncodeSubmission`

The `EncodeSubmission` function obtains the signing message.

Here you receive the BSC-encoded transaction data and the `prefix_bytes` (which is `sha3_256` hash bytes of the `APTOS::RawTransaction` string) concatenated into the signing message:

`signing_message = prefix_bytes | bcs_bytes_of_raw_transaction`.
<br/>

<img src="/docs/gaming/encode-submission.png" alt="Get encoded submission Blueprint" class="responsive-pic" width="800" />

## `GetTransactionSignature`

Call the `GetTransactionSignature` function to create a transaction signature scheme and sign the BSC-encoded submission data.

Here you sign the signing message with the sender's account private key.
<br/>

<img src="/docs/gaming/transaction-signature.png" alt="Get transaction signature Blueprint" class="responsive-pic" width="800" />

## `GetTransactionSubmitRequest`

The `GetTransactionSubmitRequest` function creates a transaction request ready to submit to Aptos.

Here you have the BSC-encoded transaction data and the transaction signature to be processed into the submit transaction request for Aptos.
<br/>

<img src="/docs/gaming/transaction-submit-request.png" alt="Get transaction submit request Blueprint" class="responsive-pic" width="800" />

## `SubmitTransaction`

The `SubmitTransaction` function submits a transaction request provided in the previous step and obtains a transaction hash.
<br/>

<img src="/docs/gaming/submit-transaction.png" alt="Submit transaction Blueprint" class="responsive-pic" width="800" />




