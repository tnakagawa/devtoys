'use strict'

import { getTabs } from './common.js';

function init() {
    const app = Vue.createApp(App).mount('#app');
    console.dir(app);
}

const App = {
    data() {
        return {
            tabs: getTabs(),
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
        },
    },
}

window.addEventListener('load', init);