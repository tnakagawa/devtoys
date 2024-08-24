'use strict'

import { getTabs } from './common.js';
import { ethers } from 'https://cdn.jsdelivr.net/npm/ethers@6.13.2/+esm';

function init() {
    const app = Vue.createApp(App).mount('#app');
    console.dir(app);
}

const App = {
    data() {
        return {
            loading: true,
            tabs: [],
            hashtext: "",
            hashhex: "",
            hashkeccak256: "",
            hashripemd160: "",
            hashsha256: "",
            hashsha512: "",
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            this.tabs = getTabs();
            this.loading = false;
        },
        change() {
            console.log("change");
            this.hashhex = "";
            this.hashkeccak256 = "";
            this.hashripemd160 = "";
            this.hashsha256 = "";
            this.hashsha512 = "";
            if (this.hashtext) {
                this.hashhex = ethers.toQuantity(ethers.toUtf8Bytes(this.hashtext));
                this.hashkeccak256 = ethers.keccak256(this.hashhex);
                this.hashripemd160 = ethers.ripemd160(this.hashhex);
                this.hashsha256 = ethers.sha256(this.hashhex);
                this.hashsha512 = ethers.sha512(this.hashhex);
            }
        },
    },
}

window.addEventListener('load', init);