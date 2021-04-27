var checkparams = require("./ws_utils").checkparams;

var svg = async function (msg) {
    /**
     * requires: msg = { text: "text to render as qrcode", options { type: [ svg | txt ], margin.... }
     */
    // console.log("/qrcode/svg/" + JSON.stringify(msg));
    if (checkparams(msg, "text,options")) {
        var QRCode = require('qrcode');
        /**
         * options = { errorCorrectionLevel, maskPattern, margin, scale, width, color.dark, color.light}
         * reference: https://github.com/soldair/node-qrcode#qr-code-options
         */
        msg.options.type = "svg";  // todo checar si existe msg.options
        return await QRCode.toString(msg.text, msg.options);
    } else {
        var err = { "status": "error", "message":"missing params: {text, options}"}
        return new Promise((resolve,reject)=>{
            resolve(err)
        })
    }
}

var png_dataUrl = async function (msg) {
    /**
     * requires: msg = { text: "text to render as qrcode", options { type: [ svg | txt ], margin.... }
     */
    // console.log("/qrcode/svg/" + JSON.stringify(msg));
    if (checkparams(msg, "text,options")) {
        var QRCode = require('qrcode');
        /**
         * options = { errorCorrectionLevel, maskPattern, margin, scale, width, color.dark, color.light}
         * reference: https://github.com/soldair/node-qrcode#qr-code-options
         */
        return await QRCode.toDataURL(msg.text, msg.options);
    } else {
        var err = { "status": "error", "message":"missing params: {text, options}"}
        return new Promise((resolve,reject)=>{
            resolve(err)
        })
    }
}

module.exports = {
    svg:svg,
    png_dataUrl:png_dataUrl
}
