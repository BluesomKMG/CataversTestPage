function initializeTelegram(unityInstance) {
    Telegram.WebApp.ready();

    unityInstance.SendMessage('TelegramStarTestManager', 'OnTelegramInit', JSON.stringify({
        user: Telegram.WebApp.initDataUnsafe.user,
        chat: Telegram.WebApp.initDataUnsafe.chat
    }));

    unityInstance.SendMessage('TelegramStarTestManager', 'ToUnityMessage', '<<platform>> :' + Telegram.WebApp.platform);
    unityInstance.SendMessage('TelegramStarTestManager', 'ToUnityMessage', '<<sendData>> :' + (typeof Telegram.WebApp.sendData));
    unityInstance.SendMessage('TelegramStarTestManager', 'ToUnityMessage', '<<Telegram.WebApp.initData>> : ' + Telegram.WebApp.initData);

    window.requestPayment = function (itemId) {
        Telegram.WebApp.sendData(JSON.stringify({
            action: 'buy_stars',
            item_id: itemId
        }));
    }

    window.requestPayment2 = function (itemName, itemPrice) {
        const jsonData = JSON.stringify({
            action: 'buy_stars',
            item_id: itemName,
            item_price: itemPrice,
            user_id: Telegram.WebApp.initDataUnsafe.user?.id,
            username: Telegram.WebApp.initDataUnsafe.user?.username
        });

        try {
            initiatePayment(unityInstance);
            unityInstance.SendMessage('TelegramStarTestManager', 'ToUnityMessage', "? `sendData()` �����: " + jsonData);
        } catch (error) {
            unityInstance.SendMessage('TelegramStarTestManager', 'ToUnityMessage', "? `sendData()` ����: " + JSON.stringify(error.message));
        }
        unityInstance.SendMessage("TelegramStarTestManager", "ToUnityMessage", "? ���� ������: " + jsonData);
    }
}

async function initiatePayment(unityInstance) {
    try {
        const response = await fetch('https://0e98-112-220-78-250.ngrok-free.app/CreateInvoice', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: '��ǰ��',
                description: '��ǰ ����',
                payload: 'unique_payload',
                currency: 'XTR',
                prices: [{ label: '��ǰ��', amount: 1000 }],
            }),
        });

        const { invoiceLink } = await response.json();
        unityInstance.SendMessage("TelegramStarTestManager", "ToUnityMessage", "��invoiceLink: " + invoiceLink);

        Telegram.WebApp.openInvoice(invoiceLink, (status) => {
            let logMessage = status === 'paid' ? "Payment successful" : 'Payment status:' + status;
            unityInstance.SendMessage("TelegramStarTestManager", "ToUnityMessage", "��Payment Result: " + logMessage);
        });
    } catch (error) {
        console.error('Payment initiation failed:', error);
        unityInstance.SendMessage("TelegramStarTestManager", "ToUnityMessage", "��Payment initiation failed: " + error);
    }
}
