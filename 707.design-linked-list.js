/*
 * @lc app=leetcode id=707 lang=javascript
 *
 * [707] Design Linked List
 */

// @lc code=start

class MyLinkedListNode
{
    /** @type {number} */
    val;
    /** @type {MyLinkedListNode|null} */
    next;

    /**
     * @param {number} val 
     */
    constructor(val)
    {
        this.val = val;
    }
}

class MyLinkedList
{
    #fakeHead;
    #tail;
    #length;

    constructor()
    {
        this.#fakeHead = new MyLinkedListNode(-1);
        this.#tail = this.#fakeHead;
        this.#length = 0;
    }

    /**
     * @param {number} index
     * @return {number}
     */
    get(index)
    {
        if (index <= this.#length - 1)
        {
            let currentNode = this.#fakeHead;
            for (let i = 0; i <= index; i++)
            {
                currentNode = currentNode.next;
            }
            return currentNode.val;
        }
        else
        {
            return -1;
        }
    }

    /**
     * @param {number} val
     * @return {void}
     */
    addAtHead(val)
    {
        this.addAtIndex(0, val);
    }

    /**
     * @param {number} val
     * @return {void}
     */
    addAtTail(val)
    {
        this.addAtIndex(this.#length, val);
    }

    /**
     * @param {number} index
     * @param {number} val
     * @return {void}
     */
    addAtIndex(index, val)
    {
        if (index <= this.#length - 1)
        {
            let prevNode = this.#fakeHead;
            for (let i = 0; i < index; i++)
            {
                prevNode = prevNode.next;
            }
            
            const nextNode = prevNode.next;
            const newNode = new MyLinkedListNode(val);
            
            prevNode.next = newNode;
            newNode.next = nextNode;

            this.#length++;
        }
        else if (index === this.#length)
        {
            const prevNode = this.#tail;
            const newNode = new MyLinkedListNode(val);

            prevNode.next = newNode;

            this.#tail = newNode;
            this.#length++;
        }
    }

    /**
     * @param {number} index
     * @return {void}
     */
    deleteAtIndex(index)
    {
        if (index <= this.#length - 1)
        {
            let prevNode = this.#fakeHead;
            let currentNode = this.#fakeHead.next;

            for (let i = 0; i < index; i++)
            {
                prevNode = currentNode;
                currentNode = currentNode.next;
            }

            const nextNode = currentNode.next;
            prevNode.next = nextNode;

            this.#length--;
            if (currentNode === this.#tail)
            {
                this.#tail = prevNode;
            }
        }
    }
}

/**
 * Your MyLinkedList object will be instantiated and called as such:
 * var obj = new MyLinkedList()
 * var param_1 = obj.get(index)
 * obj.addAtHead(val)
 * obj.addAtTail(val)
 * obj.addAtIndex(index,val)
 * obj.deleteAtIndex(index)
 */
// @lc code=end