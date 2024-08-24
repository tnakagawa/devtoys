'use strict'

import { getTabs } from './common.js';
import bcrypt from 'https://cdn.jsdelivr.net/npm/bcryptjs@2.4.3/+esm'

function init() {
    const app = Vue.createApp(App).mount('#app');
    console.dir(app);
}

const App = {
    data() {
        return {
            loading: true,
            tabs: [],
            toast: null,
            toastmsg: '',
            bcrypttarget: '',
            bcrypthash: '',
            bcryptcomp: '',
            bcryptresult: -1,
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            this.tabs = getTabs();
            this.toast = bootstrap.Toast.getOrCreateInstance('#toast', {
                animation: true, autohide: true, delay: 3000,
            });
            this.loading = false;
        },
        showToast(message) {
            this.toastmsg = message;
            this.toast.show();
        },
        change() {
            if (this.bcrypttarget) {
                let update = true;
                if (this.bcrypthash) {
                    if (bcrypt.compareSync(this.bcrypttarget, this.bcrypthash)) {
                        update = false;
                    }
                }
                if (update) {
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(this.bcrypttarget, salt);
                    this.bcrypthash = hash;
                }
            }
            this.bcryptresult = -1;
            if (this.bcrypthash && this.bcryptcomp) {
                const result = bcrypt.compareSync(this.bcryptcomp, this.bcrypthash);
                if (result) {
                    this.bcryptresult = 1;
                } else {
                    this.bcryptresult = 0;
                }
            }
        },
        copy(text) {
            if (text) {
                navigator.clipboard.writeText(text);
                this.showToast('コピーしました。');
            }
        },
    },
}

window.addEventListener('load', init);