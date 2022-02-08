/*
 * @lc app=leetcode id=146 lang=javascript
 *
 * [146] LRU Cache
 */

// @lc code=start

class LRUCache
{
    keyToValue;
    capacity;

    constructor(capacity)
    {
        this.capacity = capacity;
        this.keyToValue = new Map();
    }

    #size()
    {
        return this.keyToValue.size;
    }

    /**
     * @param {number} key
     * @return {number}
     */
    get(key)
    {
        const value = this.keyToValue.get(key);
        if (value !== undefined)
        {
            this.keyToValue.delete(key);
            this.keyToValue.set(key, value);
            return value;
        }
        else
        {
            return -1;
        }
    }
    /**
     * @param {number} key
     * @param {number} value
     * @return {void}
     */
    put(key, value)
    {
        if (!this.keyToValue.has(key))
        {
            if (this.#size() === this.capacity)
            {
                const iterator = this.keyToValue.keys();
                const oldestKey = iterator.next().value;
                this.keyToValue.delete(oldestKey);
            }
            this.keyToValue.set(key, value);
        }
        else
        {
            this.keyToValue.delete(key);
            this.keyToValue.set(key, value);
        }
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */
// @lc code=end