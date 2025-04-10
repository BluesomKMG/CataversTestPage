
let unityInstanceRef = null;
let adController = null;

//adsgram�� �ʱ�ȭ �մϴ�
function initAdsGram(unityInstance){
    unityInstanceRef = unityInstance;    
    //�ʱ�ȭ
    try{
            adController = window.Adsgram.init({ 
                blockId: "int-9770",
                debug: true,
                debugBannerType: "FullscreenMedia" 
        });
        // AdsGram.init({
        //     appId: '2f6ecfda7d9d4993b6a52591989f1a5f',      // AdsGram���� �߱޹��� �� ID (�ʼ�)
        //     userId: Telegram.WebApp.initDataUnsafe.user?.id || "guest",        // ���� ID (��: Telegram user id) (�ʼ�) 
        //     language: 'en',           // ���� ����: ��� (�⺻�� ������ ���� & ���� en, ko, ru �� ISO 639-1 ����)
        // });
        
        adController.addEventListener('onStart', () => {
            unityInstanceRef.SendMessage("TelegramStarTestManager", "ToUnityMessage", " AdsGram onStart");
        });
        adController.addEventListener('onSkip', () => {
            unityInstanceRef.SendMessage("TelegramStarTestManager", "ToUnityMessage", " AdsGram onSkip");
        });
        adController.addEventListener('onReward', () => {
            unityInstanceRef.SendMessage("TelegramStarTestManager", "ToUnityMessage", " AdsGram onReward");
        });
        adController.addEventListener('onComplete', () => {
            unityInstanceRef.SendMessage("TelegramStarTestManager", "ToUnityMessage", " AdsGram onComplete");
        });
        adController.addEventListener('onError', () => {
            unityInstanceRef.SendMessage("TelegramStarTestManager", "ToUnityMessage", " AdsGram onError");
        });
        adController.addEventListener('onBannerNotFound', () => {
            unityInstanceRef.SendMessage("TelegramStarTestManager", "ToUnityMessage", " AdsGram onBannerNotFound");
        });
        adController.addEventListener('onNonStopShow', () => {
            unityInstanceRef.SendMessage("TelegramStarTestManager", "ToUnityMessage", " AdsGram onNonStopShow");
        });
        adController.addEventListener('onTooLongSession', () => {
            unityInstanceRef.SendMessage("TelegramStarTestManager", "ToUnityMessage", " AdsGram onTooLongSession");
        });

        unityInstanceRef.SendMessage("TelegramStarTestManager", "ToUnityMessage", " AdsGram Init");
    }
    catch(e){
        unityInstanceRef.SendMessage("TelegramStarTestManager", "ToUnityMessage", " AdsGram Init Error : " + e.message);
    }
}

async function showAD(){
    try {
        const showPromiseResult = await adController.show();
        // user watch ad till the end
        // your code to reward user
        unityInstanceRef?.SendMessage("TelegramStarTestManager", "ToUnityMessage", "SHOW AD SUCCESS : GET REWARD");
      } catch (e) {
        // user get error during playing ad or skip ad
        // do nothing or whatever you want
        unityInstanceRef?.SendMessage("TelegramStarTestManager", "ToUnityMessage", String(e));
      }
}

//reward - ��û�Ϸ�� ���� ���� 
window.adsgramShowAdReward = () => showAD();
//banner - ȭ�� �ϴ�/��� ��� ����
//window.adsgramShowAdBanner = () => showAD('banner'); 
//interstitial - ���鱤�� (���� ����)
//window.adsgramShowAdInterstitial = () => showAD('interstitial');

// window.adsgramIsAvailable = function () {
//     const available = AdsGram.isAvailable('reward'); // true �Ǵ� false
//     unityInstanceRef?.SendMessage("TelegramStarTestManager", "ToUnityMessage", "���� �غ� ���� Ȯ��: " + available);
//     if(available) 
//         unityInstanceRef?.SendMessage("TelegramStarTestManager", "AdReady");
//     else
//         unityInstanceRef?.SendMessage("TelegramStarTestManager", "AdWait");
// }
