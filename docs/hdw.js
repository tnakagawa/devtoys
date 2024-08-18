'use strict'

import { getTabs } from './common.js';
import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@6.13.2/+esm';

function init() {
    const app = Vue.createApp(App).mount('#app');
    console.dir(app);
    console.log('ethers.version', ethers.version);
}

const App = {
    data() {
        return {
            loading: true,
            tabs: [],
            toast: null,
            toastmsg: '',
            mnemonic: '',
            errMnemonic: false,
            path: "m/44'/60'/0'/0",
            errPath: '',
            wallets: [],
            count: 10,
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            this.toast = bootstrap.Toast.getOrCreateInstance('#toast', {
                animation: true, autohide: true, delay: 3000,
            });
            const mnemonic = localStorage.getItem("hdw.mnemonic");
            if (mnemonic) {
                this.mnemonic = mnemonic;
            }
            const path = localStorage.getItem("hdw.path");
            if (path) {
                this.path = path;
            }
            this.change();
            this.tabs = getTabs();
            this.loading = false;
        },
        showToast(message) {
            this.toastmsg = message;
            this.toast.show();
        },
        generate() {
            const hDNodeWallet = ethers.HDNodeWallet.createRandom();
            console.log(hDNodeWallet);
            this.mnemonic = hDNodeWallet.mnemonic.phrase;
            this.change();
        },
        change() {
            console.log("changeMnemonic");
            this.errMnemonic = "";
            this.errPath = "";
            this.wallets.length = 0;
            if (this.mnemonic) {
                try {
                    ethers.Mnemonic.fromPhrase(this.mnemonic);
                } catch (e) {
                    this.errMnemonic = e.message;
                    console.error(e);
                    return;
                }
                let wallet = null;
                if (this.path) {
                    try {
                        wallet = ethers.HDNodeWallet.fromPhrase(this.mnemonic, "", this.path);
                    } catch (e) {
                        this.errPath = e.message;
                        console.error(e);
                        return;
                    }
                }
                if (wallet) {
                    for (let i = 0; i < this.count; i++) {
                        const child = wallet.deriveChild(i);
                        this.wallets.push({
                            path: child.path,
                            address: child.address,
                            publicKey: child.publicKey,
                            privateKey: child.privateKey,
                        });
                    }
                }
                localStorage.setItem("hdw.mnemonic", this.mnemonic);
                localStorage.setItem("hdw.path", this.path);
            } else {
                localStorage.setItem("hdw.mnemonic", '');
            }
        },
        copy(text) {
            if (text) {
                navigator.clipboard.writeText(text);
                this.showToast('コピーしました。');
            }
        },
    }
}

window.addEventListener('load', init);