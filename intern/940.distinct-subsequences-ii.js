/*
 * @lc app=leetcode id=940 lang=javascript
 *
 * [940] Distinct Subsequences II
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var distinctSubseqII = function (s) {
    /**
     * 每加入一个字母，subsequence 序列都先复制一次，然后在第二份后面添加一下新加入的字母
     *
     * 比如 abc
     * [a]
     * [a,ab,b]
     * [a,ab,b,ac,abc,bc,c]
     *
     * 主要问题在于去重，比如 aba
     * [a]
     * [a,ab,b]
     * [a,ab,b,aa,aba,ba,a]
     *
     * 去重可以借助 Trie。每次添加新字母就相当于往所有结点后面添加了一个字母，然后再添加一个单个字母叶结点
     * 什么时候会重复呢？结点本来就以该字母结尾的时候
     *
     * 新单词总数量 = 单词总数量 + (单词总数量-以该字母结尾的数量) + 1
     * +1 是因为我们不能删掉只有一个字母的情况
     * 比如 aba
     * [a] 1 a->1
     * [a,ab,b] 1+(1-0)+1=3 a->1 b->2
     * [a,ab,b,aa,aba,ba] 3+(3-1)+1=6
     *
     * 以该字母结尾的数量可以用两次总数量差值算出来
     *
     * https://www.jianshu.com/p/02501f516437
     */

    const MOD = 10 ** 9 + 7;
    const endsWithCount = new Array(26);
    endsWithCount.fill(0);
    let totalCount = 0;

    for (let i = 0; i < s.length; i++) {
        const letter = s[i];
        const letterOffset = letter.charCodeAt(0) - 'a'.charCodeAt(0);
        const letterEndsWithCount = endsWithCount[letterOffset];
        const newTotalCount =
            (MOD + totalCount + (totalCount - letterEndsWithCount) + 1) % MOD;
        const newEndsWithCount =
            (MOD + newTotalCount - totalCount + letterEndsWithCount) % MOD;

        totalCount = newTotalCount % MOD;
        endsWithCount[letterOffset] = newEndsWithCount;
    }

    return totalCount;
};
// @lc code=end
