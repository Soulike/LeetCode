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
        /** @type {Map<number, Set<number>>} */
        this.userIdToTweetTimestamps = new Map();

        this.tweetTimestamp = 0;

        /** @type {Map<number, number>} */
        this.tweetTimestampToTweetId = new Map();
    }
    /**
     * @param {number} userId
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId)
    {
        let tweetTimestamps = this.userIdToTweetTimestamps.get(userId);
        if (!tweetTimestamps)
        {
            /** @type {Set<number>} */
            tweetTimestamps = new Set();
        }
        this.tweetTimestamp++;
        tweetTimestamps.add(this.tweetTimestamp);
        this.tweetTimestampToTweetId.set(this.tweetTimestamp, tweetId);
        this.userIdToTweetTimestamps.set(userId, tweetTimestamps);
    }
    /**
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId)
    {
        const followeeIdsSet = this.followerIdToFolloweeIds.get(userId);
        /** @type {number[]} */
        let followeeIds;

        if (!followeeIdsSet)
        {
            followeeIds = [];
        }
        else
        {
            followeeIds = [...followeeIdsSet];
        }

        followeeIds.push(userId);

        /** @type {number[]} */
        const tweetTimestampsMix = [];
        for (const followeeId of followeeIds)
        {
            const tweetTimestamps = this.userIdToTweetTimestamps.get(followeeId);
            if (tweetTimestamps)
            {
                tweetTimestampsMix.push(...[...tweetTimestamps].slice(-10));
            }
        }
        tweetTimestampsMix.sort((a, b) => b - a);
        return tweetTimestampsMix.slice(0, 10).map(timestamp => this.tweetTimestampToTweetId.get(timestamp));
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
        }
        followeeIds.add(followeeId);
        this.followerIdToFolloweeIds.set(followerId, followeeIds);
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

