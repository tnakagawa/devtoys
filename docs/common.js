'use strict';

const TABS = [
    { name: "Main", link: "index.html" },
    { name: "QR Code", link: "qrcode.html" },
    { name: "HD Wallet", link: "hdw.html" },
];

const getTabs = () => {
    const tabs = [];
    for (let tab of TABS) {
        if (location.pathname.indexOf(tab.link) >= 0) {
            tab['active'] = true;
        } else {
            tab['active'] = false;
        }
        tabs.push(tab);
    }
    return tabs
};

export { getTabs };