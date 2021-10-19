/*
 * @lc app=leetcode id=355 lang=javascript
 *
 * [355] Design Twitter
 */

// @lc code=start

class Twitter
{
    constructor()
    {
        /** @type {Map<number, Set<number>>} */
        this.followerIdToFolloweeIds = new Map();
        /** @type {Map<number, number>} */
        this.tweetIndexToUserId = new Map();
        /** @type {number[]} */
        this.tweetIds = [];
    }
    
    /**
     * @param {number} userId
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId)
    {
        this.tweetIndexToUserId.set(this.tweetIds.length, userId);
        this.tweetIds.push(tweetId);
    }

    /**
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId)
    {
        let followeeIds = this.followerIdToFolloweeIds.get(userId);
        if (!followeeIds)
        {
            followeeIds = new Set();
        }
        const TWEET_IDS_LENGTH = this.tweetIds.length;
        /** @type {number[]} */
        let result = [];
        for (let i = TWEET_IDS_LENGTH - 1; i >= 0; i--)
        {
            const tweetUserId = this.tweetIndexToUserId.get(i);
            if (followeeIds.has(tweetUserId) || tweetUserId === userId)
            {
                result.push(this.tweetIds[i]);
            }
            if (result.length === 10)
            {
                break;
            }
        }
        return result;
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId)
    {
        let followeeIds = this.followerIdToFolloweeIds.get(followerId);
        if (!followeeIds)
        {
            /** @type {Set<number>} */
            followeeIds = new Set();
            this.followerIdToFolloweeIds.set(followerId, followeeIds);
        }
        followeeIds.add(followeeId);
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId, followeeId)
    {
        let followeeIds = this.followerIdToFolloweeIds.get(followerId);
        if (followeeIds)
        {
            followeeIds.delete(followeeId);
        }
    }
}
/**
 * Your Twitter object will be instantiated and called as such:
 * var obj = new Twitter()
 * obj.postTweet(userId,tweetId)
 * var param_2 = obj.getNewsFeed(userId)
 * obj.follow(followerId,followeeId)
 * obj.unfollow(followerId,followeeId)
 */
// @lc code=end

