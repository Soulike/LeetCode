/*
 * @lc app=leetcode id=661 lang=javascript
 *
 * [661] Image Smoother
 */

// @lc code=start
/**
 * @param {number[][]} img
 * @return {number[][]}
 */
var imageSmoother = function (img) {
    const M = img.length;
    const N = img[0].length;

    /**
     * @param {[number, number]} coordinate
     */
    const getSmoothedValue = ([x, y]) => {
        /** @type {number[]} */
        const samples = [];
        for (let i = -1; i <= 1; i++) {
            if (x + i < 0 || x + i > M - 1) continue;

            for (let j = -1; j <= 1; j++) {
                if (y + j < 0 || y + j > N - 1) continue;

                samples.push(img[x + i][y + j]);
            }
        }

        const samplesSum = samples.reduce((prev, curr) => prev + curr);
        return Math.floor(samplesSum / samples.length);
    };

    const smoothedImg = new Array(M);
    for (let i = 0; i < M; i++) {
        smoothedImg[i] = new Array(N);
    }

    for (let i = 0; i < M; i++) {
        for (let j = 0; j < N; j++) {
            smoothedImg[i][j] = getSmoothedValue([i, j]);
        }
    }

    return smoothedImg;
};
// @lc code=end

imageSmoother([
    [100, 200, 100],
    [200, 50, 200],
    [100, 200, 100],
]);
