/*
 * @lc app=leetcode id=895 lang=javascript
 *
 * [895] Maximum Frequency Stack
 */

// @lc code=start

class FreqStack {
    maxFreq;
    freqToValues;
    valueToFreq;

    constructor() {
        this.maxFreq = 0;
        this.freqToValues = new Map();
        this.valueToFreq = new Map();
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        const originalFreq = this.valueToFreq.get(val) ?? 0;
        const newFreq = originalFreq + 1;
        this.valueToFreq.set(val, newFreq);

        const values = this.freqToValues.get(newFreq) ?? [];
        values.push(val);
        this.freqToValues.set(newFreq, values);

        this.maxFreq = Math.max(this.maxFreq, newFreq);
    }

    /**
     * @return {number}
     */
    pop() {
        const values = this.freqToValues.get(this.maxFreq);

        const lastValue = values.pop();
        this.valueToFreq.set(lastValue, this.valueToFreq.get(lastValue) - 1);
        if (values.length === 0) {
            this.freqToValues.delete(this.maxFreq);
            this.maxFreq--;
        }
        if (this.valueToFreq.get(lastValue) === 0) {
            this.valueToFreq.delete(lastValue);
        }
        return lastValue;
    }
}

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */
// @lc code=end
