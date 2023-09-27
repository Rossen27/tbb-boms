import { isMobile, isAndroid, isChrome, isSafari, browserVersion, osVersion } from 'react-device-detect';
import StoreAction from '@StoreAction';
import { useLocalObservable } from 'mobx-react-lite';

const initialState = {
    mobile_flag: false, // boolean for mobile view
    smallScreen_flag: false,
    narrowScreen_flag: false, // Used for <Footer>. Otherwise it will unnecessarily change footer's layout
    iOS_flag: false,
    iOSNotSafari_flag: false,
    notSafari13_flag: false, // Some webkit feature only works in Safari 13
    safari_flag: false,
    androidNotChrome_flag: false,
};
const LayoutStore = () => {
    const store = useLocalObservable(() => ({
        /* observables */
        ...initialState,
        ...StoreAction(initialState),
        detectBody() {
            const currentFlag = this.mobile_flag;
            const defaultScreenSize = this.smallScreen_flag;
            const ifSmallScreen = document.body.clientWidth <= 768;
            const ifNarrowScreen = document.body.clientWidth <= 360;
            const nextFlag = isMobile;
            if (currentFlag !== nextFlag) {
                if (isMobile && !isAndroid) {
                    this.updateData('iOS_flag', true);
                    // const iOS_flag = true;
                    // this.assignData({ iOS_flag });
                    // this.iOS_flag = true
                }
                if (isMobile && !isAndroid && osVersion < 14.3 && !isSafari) {
                    // iOS support webrtc in webview since 14.3
                    this.updateData('iOSNotSafari_flag', true);
                }
                if (isMobile && isAndroid && !isChrome) {
                    this.updateData('androidNotChrome_flag', true);
                }
                this.updateData('mobile_flag', nextFlag);
            }
            if (isSafari) {
                if (browserVersion < 13) {
                    this.updateData('notSafari13_flag', true);
                }
                this.updateData('safari_flag', true);
            }
            if (defaultScreenSize !== ifSmallScreen) {
                this.updateData('smallScreen_flag', ifSmallScreen);
            }
            if (defaultScreenSize !== ifNarrowScreen) {
                this.updateData('narrowScreen_flag', ifNarrowScreen);
            }
            if (window.self !== window.top) {
                this.updateData('isEmbedding', true);
            }
        },
    }));

    return store;
};

export default LayoutStore;
