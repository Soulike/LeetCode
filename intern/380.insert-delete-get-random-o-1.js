/*
 * @lc app=leetcode id=380 lang=javascript
 *
 * [380] Insert Delete GetRandom O(1)
 */

// @lc code=start

class RandomizedSet {
    store;
    valueToIndex;

    constructor() {
        this.store = [];
        this.valueToIndex = new Map();
    }

    /**
     * @param {number} val
     * @return {boolean}
     */
    insert(val) {
        if (!this.valueToIndex.has(val)) {
            this.store.push(val);
            this.valueToIndex.set(val, this.store.length - 1);
            return true;
        } else {
            return false;
        }
    }

    /**
     * @param {number} val
     * @return {boolean}
     */
    remove(val) {
        if (this.valueToIndex.has(val)) {
            const index = this.valueToIndex.get(val);
            const lastIndex = this.store.length - 1;
            if (lastIndex === index) {
                this.store.pop();
                this.valueToIndex.delete(val);
            } else {
                const lastIndexValue = this.store[lastIndex];

                [this.store[index], this.store[lastIndex]] = [
                    this.store[lastIndex],
                    this.store[index],
                ];

                this.store.pop();
                this.valueToIndex.delete(val);
                this.valueToIndex.set(lastIndexValue, index);
            }
            return true;
        } else {
            return false;
        }
    }
    /**
     * @return {number}
     */
    getRandom() {
        const length = this.store.length;
        const randomIndex = this.generateRandom(0, length - 1);
        return this.store[randomIndex];
    }

    generateRandom(start, end) {
        return Math.floor(start + Math.random() * (end + 1));
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
