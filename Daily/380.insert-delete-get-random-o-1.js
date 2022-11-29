/*
 * @lc app=leetcode id=380 lang=javascript
 *
 * [380] Insert Delete GetRandom O(1)
 */

// @lc code=start

class RandomizedSet {
    /** @type {Map<number, number>}*/
    #numberToIndex;
    /** @type {number[]} */
    #numbers;

    constructor() {
        this.#numberToIndex = new Map();
        this.#numbers = [];
    }

    /**
     * @param {number} val
     * @return {boolean}
     */
    insert(val) {
        if (this.#numberToIndex.has(val)) return false;

        this.#numbers.push(val);
        this.#numberToIndex.set(val, this.#numbers.length - 1);
        return true;
    }
    /**
     * @param {number} val
     * @return {boolean}
     */
    remove(val) {
        if (!this.#numberToIndex.has(val)) return false;

        const lastNumber = this.#numbers[this.#numbers.length - 1];

        if (lastNumber !== val) {
            // swap the removed number to be the last one
            const lastNumberIndex = this.#numbers.length - 1;
            const removedNumberIndex = this.#numberToIndex.get(val);

            [
                this.#numbers[removedNumberIndex],
                this.#numbers[lastNumberIndex],
            ] = [
                this.#numbers[lastNumberIndex],
                this.#numbers[removedNumberIndex],
            ];

            this.#numberToIndex.set(lastNumber, removedNumberIndex);
        }

        this.#numbers.pop();
        this.#numberToIndex.delete(val);
        return true;
    }
    /**
     * @return {number}
     */
    getRandom() {
        const length = this.#numbers.length;
        const randomIndex = this.#generateRandomInteger(0, length);
        return this.#numbers[randomIndex];
    }

    /**
     * Generate random integer in [begin, end)
     * @param {number} begin
     * @param {number} end
     * @returns {number}
     */
    #generateRandomInteger(begin, end) {
        const diff = end - begin;
        return begin + Math.floor(Math.random() * diff);
    }
}

/**
 * Your RandomizedSet object will be instantiated and called as such:
 * var obj = new RandomizedSet()
 * var param_1 = obj.insert(val)
 * var param_2 = obj.remove(val)
 * var param_3 = obj.getRandom()
 */
// @lc code=end
