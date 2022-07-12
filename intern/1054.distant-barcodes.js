/*
 * @lc app=leetcode id=1054 lang=javascript
 *
 * [1054] Distant Barcodes
 */

// @lc code=start
/**
 * @param {number[]} barcodes
 * @return {number[]}
 */
const rearrangeBarcodes = function (barcodes) {
    const LENGTH = barcodes.length;
    /** @type {Map<number, number>} */
    const barcodeToCount = new Map();
    for (const barcode of barcodes) {
        // 统计频率
        barcodeToCount.set(barcode, (barcodeToCount.get(barcode) ?? 0) + 1);
    }

    // 频率按照从高到低排列
    const barcodeToCountArray = Array.from(barcodeToCount).sort(
        (a, b) => b[1] - a[1],
    );

    const result = new Array(LENGTH);

    let currentIndex = 0; // 先填充偶数位置
    for (const [barcode, count] of barcodeToCountArray) {
        for (let i = 0; i < count; i++) {
            result[currentIndex] = barcode;
            currentIndex += 2;
            if (currentIndex > LENGTH - 1) {
                currentIndex = 1; // 偶数位置填充完后填充奇数位置
            }
        }
    }
    return result;
};
// @lc code=end
