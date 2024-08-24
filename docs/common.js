'use strict';

const TABS = [
    { name: "Main", link: "index.html" },
    { name: "QR Code", link: "qrcode.html" },
    { name: "HD Wallet", link: "hdw.html" },
    { name: "bcrypt", link: "bcrypt.html" },
];

const getTabs = () => {
    const tabs = [];
    let setActive = false;
    for (let tab of TABS) {
        if (location.pathname.indexOf(tab.link) >= 0) {
            tab['active'] = true;
            setActive = true;
        } else {
            tab['active'] = false;
        }
        tabs.push(tab);
    }
    if (!setActive) {
        tabs[0]['active'] = true;
    }
    return tabs
};

export { getTabs };