/*
 * @lc app=leetcode id=460 lang=javascript
 *
 * [460] LFU Cache
 */

// @lc code=start
class LFUCache {
    /** @type {Map<number, number>} */
    keyToValue;
    /** @type {Map<number, number>} */
    keyToFreq;
    /** @type {Map<number, Set<number>>} */
    freqToKeys;
    /** @type {number} */
    minFreq;
    /** @type {number} */
    capacity;

    /**
     * @param {number} capacity
     */
    constructor(capacity) {
        this.capacity = capacity;

        this.keyToValue = new Map();
        this.keyToFreq = new Map();
        this.freqToKeys = new Map();
        this.minFreq = 0;
    }

    #increaseFreq(key) {
        const prevFreq = this.keyToFreq.get(key) ?? 0;
        const newFreq = prevFreq + 1;
        this.keyToFreq.set(key, newFreq);

        const prevFreqKeys = this.freqToKeys.get(prevFreq);
        const newFreqKeys = this.freqToKeys.get(newFreq) ?? new Set();

        prevFreqKeys.delete(key);
        newFreqKeys.add(key);
        this.freqToKeys.set(newFreq, newFreqKeys);

        // 最小频率的 key 删光了，增加最小频率
        if (prevFreq === this.minFreq && prevFreqKeys.size === 0) {
            this.minFreq++;
        }
    }

    size() {
        return this.keyToValue.size;
    }

    #deleteLeastFreq() {
        const leastFreqKeys = this.freqToKeys.get(this.minFreq);
        const iterator = leastFreqKeys.values();
        const leastFreqKey = iterator.next().value;
        this.keyToValue.delete(leastFreqKey);
        this.keyToFreq.delete(leastFreqKey);

        leastFreqKeys.delete(leastFreqKey);
        // 最小频率一定会被 put 更新为 1，所以没必要更新
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key) {
        const value = this.keyToValue.get(key);
        if (value !== undefined) {
            this.#increaseFreq(key);
            return value;
        } else {
            return -1;
        }
    }

    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value) {
        if (this.keyToValue.has(key)) {
            this.#increaseFreq(key);
            this.keyToValue.set(key, value);
        }
        // 如果容量为 0，什么都不做
        else if (this.capacity > 0) {
            if (this.size() === this.capacity) {
                this.#deleteLeastFreq();
            }
            this.minFreq = 1;
            this.keyToValue.set(key, value);
            this.keyToFreq.set(key, 1);

            const oneFreqKeys = this.freqToKeys.get(1) ?? new Set();

            oneFreqKeys.add(key);
            this.freqToKeys.set(1, oneFreqKeys);
        }
    }
}

/**
 * Your LFUCache object will be instantiated and called as such:
 * var obj = new LFUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end
