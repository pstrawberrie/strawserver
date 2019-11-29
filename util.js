/**
 * JS Utils
 */

 const moment = require('moment');
 const momentDurationFormatSetup = require("moment-duration-format");
 momentDurationFormatSetup(moment);

 exports.formatUptime = function(seconds) {
     return moment.duration(seconds, 'seconds').format("d[days] h[hr] m[min]");
 }

 exports.formatBytes = function(bytes, decimals = 2) {
     if (bytes === 0) return '0 Bytes';

     const k = 1024;
     const dm = decimals < 0 ? 0 : decimals;
     const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

     const i = Math.floor(Math.log(bytes) / Math.log(k));

     return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
 }
