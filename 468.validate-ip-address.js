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
const validIPAddress = function (queryIP)
{
    const splittedByDot = queryIP.split('.');
    if (splittedByDot.length !== 1 && splittedByDot.length !== 4)
    {
        return 'Neither';
    }
    if (splittedByDot.length === 1) // not IPv4
    {
        const splittedByColon = queryIP.split(':');
        if (splittedByColon.length !== 8)
        {
            return 'Neither';
        }
        else    // possible IPv6
        {
            for (let x of splittedByColon)
            {
                if (x.length > 4 || x.length < 1)
                {
                    return 'Neither';
                }
                x = x.toUpperCase();
                for (const digit of x)
                {
                    const charCode = digit.charCodeAt(0);
                    if ((charCode < '0'.charCodeAt(0) || charCode > '9'.charCodeAt(0)) &&
                        (charCode < 'A'.charCodeAt(0) || charCode > 'F'.charCodeAt(0))
                    )
                    {
                        return 'Neither';
                    }
                }
                const parsedX = Number.parseInt(x, 16);
                if (parsedX < 0 || parsedX > 0xFFFF)
                {
                    return 'Neither';
                }
            }
            return 'IPv6';
        }
    }
    else    // possible IPv4
    {
        for (const x of splittedByDot)
        {
            if (x.length < 1 || x.length > 3
                || (x[0] === '0' && x.length !== 1))
            {
                return 'Neither';
            }
            for (const digit of x)
            {
                const charCode = digit.charCodeAt(0);
                if (charCode < '0'.charCodeAt(0) || charCode > '9'.charCodeAt(0))
                {
                    return 'Neither';
                }
            }
            const parsedX = Number.parseInt(x);
            if (parsedX < 0 || parsedX > 255)
            {
                return 'Neither';
            }
        }
        return 'IPv4';
    }
};
// @lc code=end