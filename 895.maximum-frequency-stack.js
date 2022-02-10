/*
 * @lc app=leetcode id=895 lang=javascript
 *
 * [895] Maximum Frequency Stack
 */

// @lc code=start

class FreqStack
{
    mostFreq;
    freqToValues;
    valueToFreq;
    values;

    constructor()
    {
        this.mostFreq = 0;
        this.freqToValues = new Map();
        this.valueToFreq = new Map();
        this.values = [];
    }

    increaseValueFreq(value)
    {
        this.values.push(value);
        
        const originalFreq = this.valueToFreq.get(value);
        if (originalFreq !== undefined)
        {
            const newFreq = originalFreq + 1;
            this.valueToFreq.set(value, newFreq);

            const originalValues = this.freqToValues.get(originalFreq);

            originalValues.delete(value);
            if (originalValues.size === 0)
            {
                this.freqToValues.delete(originalFreq);
            }

            const newValues = this.freqToValues.get(newFreq) ?? new Set();
            newValues.add(value);
            this.freqToValues.set(newFreq, newValues);

            this.mostFreq = Math.max(this.mostFreq, newFreq);
        }
        else    // 新增
        {
            const values = this.freqToValues.get(1) ?? new Set();
            values.add(value);
            this.freqToValues.set(1, values);
            this.valueToFreq.set(value, 1);

            this.mostFreq = Math.max(this.mostFreq, 1);
        }
    }

    decreaseValueFreq(value)
    {
        const originalFreq = this.valueToFreq.get(value);
        const newFreq = originalFreq - 1;
        if (newFreq !== 0)
        {
            this.valueToFreq.set(value, newFreq);

            const originalValues = this.freqToValues.get(originalFreq);

            originalValues.delete(value);
            if (originalValues.size === 0 && this.mostFreq === originalFreq)
            {
                this.freqToValues.delete(originalFreq);
                this.mostFreq--;
            }

            const newValues = this.freqToValues.get(newFreq) ?? new Set();
            newValues.add(value);
            this.freqToValues.set(newFreq, newValues);
        }
        else    // 值被删掉了，originalFreq === 1
        {
            this.valueToFreq.delete(value);
            const originalValues = this.freqToValues.get(originalFreq);

            originalValues.delete(value);
            if (originalValues.size === 0 && this.mostFreq === originalFreq)
            {
                this.freqToValues.delete(originalFreq);
                this.mostFreq--;
            }
        }

        for (let i = this.values.length - 1; i >= 0; i--)
        {
            if (this.values[i] === value)
            {
                this.values.splice(i, 1);
                break;
            }
        }
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val)
    {
        this.increaseValueFreq(val);
    }

    /**
     * @return {number}
     */
    pop()
    {
        const mostFreqValues = this.freqToValues.get(this.mostFreq);
        if (mostFreqValues.size === 1)
        {
            const poppedValue = [...mostFreqValues][0];
            this.decreaseValueFreq(poppedValue);
            return poppedValue;
        }
        else
        {
            for (let i = this.values.length - 1; i >= 0; i--)
            {
                if (mostFreqValues.has(this.values[i]))
                {
                    const poppedValue = this.values[i];
                    this.decreaseValueFreq(poppedValue);
                    return poppedValue;
                }
            }
        }
    }
}



/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */
// @lc code=end

var obj = new FreqStack();
obj.push(1);
obj.push(0);
obj.push(0);
obj.push(1);
obj.push(5);
obj.push(4);
obj.push(1);
obj.push(5);
obj.push(1);
obj.push(6);
obj.pop();  // 1
obj.pop();  // 1
obj.pop();  // 5
obj.pop();  // 1
obj.pop();  // 0
obj.pop();  // 6
obj.pop();  // 4
obj.pop();  // 5
obj.pop();  // 0
obj.pop();  // 1