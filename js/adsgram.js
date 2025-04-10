
let unityInstanceRef = null;

//adsgram�� �ʱ�ȭ �մϴ�
function initAdsGram(unityInstance){
    unityInstanceRef = unityInstance;    
    //�ʱ�ȭ
    AdsGram.init({
        appId: '2f6ecfda7d9d4993b6a52591989f1a5f',      // AdsGram���� �߱޹��� �� ID (�ʼ�)
        userId: Telegram.WebApp.initDataUnsafe.user?.id || "guest",        // ���� ID (��: Telegram user id) (�ʼ�) 
        language: 'en',           // ���� ����: ��� (�⺻�� ������ ���� & ���� en, ko, ru �� ISO 639-1 ����)
    });

    unityInstanceRef.SendMessage("TelegramStarTestManager", "ToUnityMessage", "? AdsGram �ʱ�ȭ �Ϸ�");
}

function showAD(adType){
    unityInstanceRef?.SendMessage("TelegramStarTestManager", "ToUnityMessage", "���� ��û :" + adType);
    AdsGram.showAd({
        placement: adType,    //���� ���� (��: 'reward', 'banner', 'interstitial')
        onComplete: () => {
            console.log("? ���� ��û �Ϸ�! ���� ����");
            unityInstanceRef?.SendMessage("TelegramStarTestManager", "AdComplete");
        },
        onClose: () => {
            console.log("?? ������ ����");
            unityInstanceRef?.SendMessage("TelegramStarTestManager", "AdClose");
        },
        onError: (e) => {
            console.error("? ���� ����:", e); 
            unityInstanceRef?.SendMessage("TelegramStarTestManager", "AdError", String(e));
        }
    });
}

//reward - ��û�Ϸ�� ���� ���� 
window.adsgramShowAdReward = () => showAD('reward');
//banner - ȭ�� �ϴ�/��� ��� ����
window.adsgramShowAdBanner = () => showAD('banner'); 
//interstitial - ���鱤�� (���� ����)
window.adsgramShowAdInterstitial = () => showAD('interstitial');

window.adsgramIsAvailable = function () {
    const available = AdsGram.isAvailable('reward'); // true �Ǵ� false
    unityInstanceRef?.SendMessage("TelegramStarTestManager", "ToUnityMessage", "���� �غ� ���� Ȯ��: " + available);
    if(available) 
        unityInstanceRef?.SendMessage("TelegramStarTestManager", "AdReady");
    else
        unityInstanceRef?.SendMessage("TelegramStarTestManager", "AdWait");
}
