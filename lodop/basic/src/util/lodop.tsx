import { LodopLoadingError, LodopNotInstallError } from "./lodopError";

var CLodopIsLocal: boolean, CLodopJsState: string;
//加载CLodop时用双端口(http是8000/18000,而https是8443/8444)以防其中某端口被占,
//主JS文件“CLodopfuncs.js”是固定文件名，其内容是动态的，与当前打印环境有关:

type LodopPixelType = string | number;

type LodopBarCodeType = '128Auto' | 'QRCode';

type LodopPageOrient = 0 | 1 | 2 | 3;

export type LodopType = {
    PRINT_INITA: (
        Top: LodopPixelType,
        Left: LodopPixelType,
        Width: LodopPixelType,
        Height: LodopPixelType,
        strPrintTaskName: string,
    ) => void;
    ADD_PRINT_HTM: (
        Top: LodopPixelType,
        Left: LodopPixelType,
        Width: LodopPixelType,
        Height: LodopPixelType,
        strHtmlContent: string,
    ) => void;
    ADD_PRINT_TEXT: (
        Top: LodopPixelType,
        Left: LodopPixelType,
        Width: LodopPixelType,
        Height: LodopPixelType,
        strContent: string,
    ) => void;
    ADD_PRINT_TABLE: (
        Top: LodopPixelType,
        Left: LodopPixelType,
        Width: LodopPixelType,
        Height: LodopPixelType,
        Content: string,
    ) => void;
    ADD_PRINT_BARCODE: (
        Top: LodopPixelType,
        Left: LodopPixelType,
        Width: LodopPixelType,
        Height: LodopPixelType,
        Type: LodopBarCodeType,
        Content: string,
    ) => void;
    SET_PRINT_PAGESIZE: (
        Orient: LodopPageOrient,
        Width: LodopPixelType,
        Height: LodopPixelType,
        Name: string,
    ) => void;
    On_Return: (taskId: any, newValue: any) => void | undefined;
    SET_PRINT_MODE: (key: string, value: any) => void;
    SET_PRINT_STYLEA: (targetId: number, key: string, value: any) => void;
    PREVIEW: () => void;
    //直接打印
    PRINT: () => void;
    //选择打印机后打印
    PRINTA: () => void;
    PRINT_SETUP: () => string;
    PRINT_DESIGN: () => string; //返回代码
    NewPage: () => void;
};

function loadCLodop() {
    if (CLodopJsState == 'loading' || CLodopJsState == 'complete') return;
    CLodopJsState = 'loading';
    var head =
        document.head ||
        document.getElementsByTagName('head')[0] ||
        document.documentElement;
    var JS1 = document.createElement('script');
    var JS2 = document.createElement('script');

    if (window.location.protocol == 'https:') {
        JS1.src = 'https://localhost.lodop.net:8443/CLodopfuncs.js';
        JS2.src = 'https://localhost.lodop.net:8444/CLodopfuncs.js';
    } else {
        JS1.src = 'http://localhost:8000/CLodopfuncs.js';
        JS2.src = 'http://localhost:18000/CLodopfuncs.js';
    }
    JS1.onload = JS2.onload = function () {
        CLodopJsState = 'complete';
    };
    JS1.onerror = JS2.onerror = function (evt) {
        CLodopJsState = 'complete';
    };
    head.insertBefore(JS1, head.firstChild);
    head.insertBefore(JS2, head.firstChild);
    CLodopIsLocal = !!(JS1.src + JS2.src).match(/\/\/localho|\/\/127.0.0./i);
}

//开始加载
loadCLodop();

//==获取LODOP对象主过程,判断是否安装、需否升级:==
function getLodop(): LodopType {
    var strCLodopInstall_1 =
        "<br><font color='#FF00FF'>Web打印服务CLodop未安装启动，点击这里<a href='CLodop_Setup_for_Win32NT.zip' target='_self'>下载执行安装</a>";
    var strCLodopInstall_2 =
        "<br>（若此前已安装过，可<a href='CLodop.protocol:setup' target='_self'>点这里直接再次启动</a>）";
    var strCLodopInstall_3 = '，成功后请刷新或重启浏览器。</font>';
    var LODOP: any;
    try {
        const myGlobal = window as any;
        LODOP = myGlobal.getCLodop();
    } catch (err) { }
    if (!LODOP && CLodopJsState !== 'complete') {
        if (CLodopJsState == 'loading') {
            throw new LodopLoadingError('网页还没下载完毕，请稍等一下再操作.',);
        } else {
            throw new LodopLoadingError('没有加载CLodop的主js，请先调用loadCLodop过程.');
        }
    }
    if (!LODOP) {
        const message =
            strCLodopInstall_1 +
            (CLodopIsLocal ? strCLodopInstall_2 : '') +
            strCLodopInstall_3;
        throw new LodopNotInstallError(message);
    }
    //===如下空白位置适合调用统一功能(如注册语句、语言选择等):==
    LODOP.SET_LICENSES(
        '',
        '13528A153BAEE3A0254B9507DCDE2839',
        'EDE92F75B6A3D917F65910',
        'D60BC84D7CF2DE18156A6F88987304CB6D8',
    );
    let result = LODOP as LodopType;
    return result;
}

export default getLodop;
