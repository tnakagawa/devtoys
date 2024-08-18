'use strict'

import { getTabs } from './common.js';
import QRCode from 'https://cdn.jsdelivr.net/npm/qrcode@1.5.4/+esm';

function init() {
    const app = Vue.createApp(App).mount('#app');
    console.log(QRCode);
}

const App = {
    data() {
        return {
            tabs: getTabs(),
            qrtext: '',
            qrlevel: 'M',
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            const text = localStorage.getItem('qrcode.text');
            if (text) {
                this.qrtext = text;
            }
            const level = localStorage.getItem('qrcode.level');
            if (level) {
                this.qrlevel = level;
            }
            this.createQr();
        },
        createQr() {
            const canvas = document.getElementById('qr');
            if (this.qrtext) {
                const c = QRCode.toCanvas(canvas, this.qrtext, { errorCorrectionLevel: this.qrlevel },
                    (error) => {
                        if (error) {
                            console.error(error);
                        } else {
                            console.log('success!');
                            localStorage.setItem('qrcode.text', this.qrtext);
                            localStorage.setItem('qrcode.level', this.qrlevel);
                        }
                    });
                console.log(c);
            } else {
                localStorage.setItem('qrcode.text', '');
                canvas.width = canvas.width;
            }
        }
    }
}

window.addEventListener('load', init);