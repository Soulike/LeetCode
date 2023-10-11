/*
 * @lc app=leetcode id=2251 lang=javascript
 *
 * [2251] Number of Flowers in Full Bloom
 */

// @lc code=start
/**
 * @param {number[][]} flowers
 * @param {number[]} people
 * @return {number[]}
 */
var fullBloomFlowers = function (flowers, people) {
    /** @type {[people: number, index: number][]} */
    const peopleAndIndex = people.map((val, index) => [val, index]);
    peopleAndIndex.sort(([people1], [people2]) => people1 - people2);

    /** @type {[index: number, isBloom: boolean][]} */
    const flowerChangeIndexes = [];

    for (const [start, end] of flowers) {
        flowerChangeIndexes.push([start, true], [end + 1, false]);
    }

    flowerChangeIndexes.sort(([index1], [index2]) => index1 - index2);

    let currentBloomFlowerNumber = 0;
    /** @type {number[]} */
    const peopleAndIndexFlowerNumber = new Array(people.length);
    peopleAndIndexFlowerNumber.fill(0);
    let currentPeopleIndex = 0;

    OUT: for (let i = 0; i < flowerChangeIndexes.length; i++) {
        const [currentIndex, isBloom] = flowerChangeIndexes[i];
        while (currentIndex > peopleAndIndex[currentPeopleIndex][0]) {
            peopleAndIndexFlowerNumber[currentPeopleIndex] =
                currentBloomFlowerNumber;
            currentPeopleIndex++;
            if (currentPeopleIndex === people.length) {
                break OUT;
            }
        }

        if (isBloom) currentBloomFlowerNumber++;
        else currentBloomFlowerNumber--;
    }

    /** @type {number[]} */
    const result = new Array(people.length);
    for (let i = 0; i < people.length; i++) {
        const [_, index] = peopleAndIndex[i];
        const flowerNumber = peopleAndIndexFlowerNumber[i];

        result[index] = flowerNumber;
    }

    return result;
};
// @lc code=end

fullBloomFlowers(
    [
        [19, 37],
        [19, 38],
        [19, 35],
    ],
    [6, 7, 21, 1, 13, 37, 5, 37, 46, 43],
);
