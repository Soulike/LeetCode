/*
 * @lc app=leetcode id=468 lang=javascript
 *
 * [468] Validate IP Address
 */

// @lc code=start
/**
 * @param {string} queryIP
 * @return {string}
 */
const validIPAddress = function (queryIP) {
    if (queryIP.length < 7) {
        return 'Neither';
    }
    let type = '';
    for (let i = 0; i < 5; i++) {
        if (queryIP[i] === '.') {
            type = 'IPv4';
            break;
        }
        if (queryIP[i] === ':') {
            type = 'IPv6';
            break;
        }
    }

    if (type === 'IPv4') {
        const splitted = queryIP.split('.');
        if (splitted.length !== 4) {
            return 'Neither';
        }
        for (const x of splitted) {
            if (x.length < 1 || x.length > 3) {
                return 'Neither';
            }
            if (x[0] === '0' && x.length !== 1) {
                return 'Neither';
            }
            let xNum = 0;
            for (const digit of x) {
                const charCode = digit.charCodeAt(0);
                if (
                    charCode < '0'.charCodeAt(0) ||
                    charCode > '9'.charCodeAt(0)
                ) {
                    return 'Neither';
                }
                xNum = xNum * 10 + Number.parseInt(digit, 10);
                if (xNum > 255) {
                    return 'Neither';
                }
            }
        }
        return 'IPv4';
    } // IPv6
    else {
        const splitted = queryIP.split(':');
        if (splitted.length !== 8) {
            return 'Neither';
        }
        for (let x of splitted) {
            if (x.length < 1 || x.length > 4) {
                return 'Neither';
            }
            x = x.toUpperCase();
            let xNum = 0;
            for (const digit of x) {
                const charCode = digit.charCodeAt(0);
                if (
                    (charCode < '0'.charCodeAt(0) ||
                        charCode > '9'.charCodeAt(0)) &&
                    (charCode < 'A'.charCodeAt(0) ||
                        charCode > 'F'.charCodeAt(0))
                ) {
                    return 'Neither';
                }
                xNum = xNum * 16 + Number.parseInt(digit, 16);
                if (xNum > 0xffff) {
                    return 'Neither';
                }
            }
        }
        return 'IPv6';
    }
};
// @lc code=end
