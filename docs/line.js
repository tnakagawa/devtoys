'use strict'

import { getTabs } from './common.js';

function init() {
    const app = Vue.createApp(App).mount('#app');
    console.dir(app);
}

const App = {
    data() {
        return {
            loading: true,
            tabs: [],
            input: "",
            output: "",
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
        format() {
            this.output = "";
            let tmp = this.input;
            tmp = tmp.replaceAll("\r\n", " ");
            tmp = tmp.replaceAll("\r", " ");
            tmp = tmp.replaceAll("\n", " ");
            tmp = tmp.replaceAll(". ", ".\n");
            this.output = tmp;
        },
    },
}

window.addEventListener('load', init);