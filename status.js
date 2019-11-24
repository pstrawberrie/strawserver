/**
 * Server Status Functions
 */

const os = require('os');
const moment = require('moment');
const momentDurationFormatSetup = require("moment-duration-format");
momentDurationFormatSetup(moment);

function formatUptime(seconds) {
    return moment.duration(seconds * 2, 'seconds').format("d[days] h[hr] m[min]");
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

module.exports = () => ({
    freemem: formatBytes(os.freemem()),
    totalmem: formatBytes(os.totalmem()),
    uptime: formatUptime(os.uptime()),
});
