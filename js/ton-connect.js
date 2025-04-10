var tonConnectUI = null;

function initTonConnectUI() {
    tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
        manifestUrl: 'https://dl.dropboxusercontent.com/scl/fi/s325wuk2agso3cd9b2nen/tonconnect-manifest.json?rlkey=vnzw6psrgnhfyyu3t5jhwq1dl',
        buttonRootId: 'ton-connect-button'
    });
    connectButtonOff();

    tonConnectUI.onStatusChange((walletInfo) => {
        if (walletInfo) {
            console.log("���� �����:", walletInfo);
            SendMessage("TONConnect", "OnWalletConnected", walletInfo.account.address);
        } else {
            console.log("���� ���� ������");
            SendMessage("TONConnect", "OnWalletDisconnected", "");
        }
    });
}

function getWalletAddress() {
    if (!tonConnectUI) return;
    return tonConnectUI.wallet ? tonConnectUI.wallet.account.address : null;
}

function sendTransaction(to, amount) {
    if (!tonConnectUI || !tonConnectUI.wallet) return;
    tonConnectUI.sendTransaction({
        messages: [{ address: to, amount: amount.toString() }]
    });
}

function connectButtonOff() {
    document.getElementById("ton-connect-button").style.display = "none";
}

function connectButtonOn() {
    document.getElementById("ton-connect-button").style.display = "block";
}
