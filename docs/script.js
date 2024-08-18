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
    },
}

window.addEventListener('load', init);