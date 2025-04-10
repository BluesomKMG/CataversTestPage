const canvas = document.querySelector("#unity-canvas");
const loadingScreen = document.querySelector("#loading-screen");
const progressBarFill = document.querySelector("#loading-progress-bar-fill");
const targetWidth = 1080;
const targetHeight = 1920;

function resizeCanvas() {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const targetRatio = targetWidth / targetHeight;
    const windowRatio = windowWidth / windowHeight;

    if (windowRatio > targetRatio) {
        canvas.style.height = `100%`;
        canvas.style.width = `${100 * targetRatio / windowRatio}%`;
    } else {
        canvas.style.width = `100%`;
        canvas.style.height = `${100 * windowRatio / targetRatio}%`;
    }
    canvas.style.margin = "0 auto";
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

const buildUrl = "Build";
const loaderUrl = `${buildUrl}/WebBuild.loader.js`;
const config = {
    dataUrl: `${buildUrl}/WebBuild.data`,
    frameworkUrl: `${buildUrl}/WebBuild.framework.js`,
    codeUrl: `${buildUrl}/WebBuild.wasm`,
    streamingAssetsUrl: "StreamingAssets",
    companyName: "Bluesom",
    productName: "강남상어 키우기",
    productVersion: "2.6.1"
};

let unityInstance = null;

const script = document.createElement("script");
script.src = loaderUrl;
script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
        progressBarFill.style.width = 100 * progress + "%";
    }).then((instance) => {
        unityInstance = instance;
        loadingScreen.style.display = "none";

        // ? ���� �ܰ�� �ݹ�
        window.onUnityLoaded && window.onUnityLoaded(unityInstance);
    }).catch((message) => {
        alert(`Unity WebGL failed to load: ${message}`);
    });
};
document.body.appendChild(script);
