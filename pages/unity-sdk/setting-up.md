# Setting up

## Installation

### Install via package

To install using the package, follow these steps:

  1. Download `MirageSDKImporter.unitypackage` from the latest [release](https://github.com/Ankr-network/game-unity-sdk/releases).
  2. Move the downloaded `MirageSDKImporter.unitypackage` package into your project's **Assets** folder.
  3. Select “Import all” to enable the full scope of SDK capabilities.

<img src="/docs/gaming/install-sdk.png" alt="Install SDK" class="responsive-pic" width="700" />

### Install via GitHub URL

Prerequisites:

  * Ensure you have a Unity version that supports the path query parameter for git packages (Unity version >= 2019.3.4f1; Unity version >= 2020.1a21).

Installation flow:

  * Add the following URL to Package Manager:

    ```
    https://github.com/Ankr-network/game-unity-sdk.git?path=Assets/MirageSDK
    ```

    <img src="/docs/gaming/package-mngr.png" alt="Package Manager" class="responsive-pic" width="700" />

OR

  * Add the following key-value pair to `Packages/manifest.json`:
    ```json
    "com.mirage.miragesdk": "https://github.com/Ankr-network/game-unity-sdk.git?path=Assets/MirageSDK"
    ```

### Install via OpenUPM

To install the package using [openupm-cli](https://github.com/openupm/openupm-cli) from [OpenUPM registry](https://openupm.com/packages/com.mirage.miragesdk/), execute the following command:

```shell
openupm add com.mirage.miragesdk
```

## What's inside

The SDK is designed to make it super easy to get started with game development by enabling connection and interaction across different blockchains.

  * Contains a huge range of examples, scripts and plugins for a variety of use cases.

  * Nethereum libraries provide support for web requests using RPC over HTTP.

  * Mirage RPC network infrastructure enables fast and easy connection to multiple chains.

<iframe width="600" height="400" src="https://www.youtube.com/embed/nuU-OvP1p1E" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>