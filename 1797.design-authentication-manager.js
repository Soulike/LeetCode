/*
 * @lc app=leetcode id=1797 lang=javascript
 *
 * [1797] Design Authentication Manager
 */

// @lc code=start

class ListNode
{
    /**
     * 
     * @param {string} token 
     * @param {number} expireTime 
     * @param {ListNode | null} prev 
     * @param {ListNode | null} next 
     */
    constructor(token, expireTime, prev, next)
    {
        this.token = token;
        this.expireTime = expireTime;
        this.prev = prev;
        this.next = next;
    }
}

/**
 * @param {number} timeToLive
 */
class AuthenticationManager
{
    timeToLive;
    tokenToNode;
    listHead;

    /**
     * 
     * @param {number} timeToLive 
     */
    constructor(timeToLive)
    {
        this.timeToLive = timeToLive;
        this.tokenToNode = new Map();
        this.listHead = new ListNode('',-Infinity, null, null);

        const fakeTail = new ListNode('',Infinity, null, null);

        this.listHead.next = fakeTail;
        fakeTail.prev = this.listHead;
    }
    /**
     * @param {string} tokenId
     * @param {number} currentTime
     * @return {void}
     */
    generate(tokenId, currentTime)
    {
        this.#cleanExpiredTokens(currentTime);

        this.#addToken(tokenId, currentTime);
    }
    /**
     * @param {string} tokenId
     * @param {number} currentTime
     * @return {void}
     */
    renew(tokenId, currentTime)
    {
        this.#cleanExpiredTokens(currentTime);

        if (this.tokenToNode.has(tokenId))
        {
            this.#deleteToken(tokenId);
            this.#addToken(tokenId, currentTime);
        }
    }
    /**
     * @param {number} currentTime
     * @return {number}
     */
    countUnexpiredTokens(currentTime)
    {
        this.#cleanExpiredTokens(currentTime);
        return this.tokenToNode.size;
    }

    /**
     * 
     * @param {number} currentTime 
     */
    #cleanExpiredTokens(currentTime)
    {
        let currentNode = this.listHead.next;

        while (currentNode.expireTime <= currentTime)
        {
            currentNode = currentNode.next;
        }

        if (currentNode.next === null)  // 全部过期了
        {
            this.listHead.next = currentNode;
            currentNode.prev = this.listHead;
            this.tokenToNode.clear();
        }
        else
        {
            this.#deleteTokensBefore(currentNode.token);
        }
    }

    /**
     * 
     * @param {string} token 
     */
    #deleteTokensBefore(token)
    {
        const node = this.tokenToNode.get(token);
        
        let currentNode = this.listHead.next;

        while (currentNode !== node)
        {
            this.tokenToNode.delete(currentNode.token);
            currentNode = currentNode.next;
        }

        this.listHead.next = node;
        node.prev = this.listHead;
    }

    /**
     * 
     * @param {string} token 
     */
    #deleteToken(token)
    {
        const node = this.tokenToNode.get(token);
        const prevNode = node.prev;
        const nextNode = node.next;

        prevNode.next = nextNode;
        nextNode.prev = prevNode;

        this.tokenToNode.delete(token);
    }

    /**
     * 
     * @param {string} token 
     * @param {number} currentTime 
     */
    #addToken(token, currentTime)
    {
        const expireTime = currentTime + this.timeToLive;
        const newNode = new ListNode(token, expireTime, null, null);
        this.tokenToNode.set(token, newNode);

        let currentNode = this.listHead;
        while (currentNode.expireTime < expireTime)
        {
            currentNode = currentNode.next;
        }

        const prevNode = currentNode.prev;
        const nextNode = currentNode;

        prevNode.next = newNode;
        newNode.prev = prevNode;

        newNode.next = nextNode;
        nextNode.prev = newNode;
    }
}




/** 
 * Your AuthenticationManager object will be instantiated and called as such:
 * var obj = new AuthenticationManager(timeToLive)
 * obj.generate(tokenId,currentTime)
 * obj.renew(tokenId,currentTime)
 * var param_3 = obj.countUnexpiredTokens(currentTime)
 */
// @lc code=end

