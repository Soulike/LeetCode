/*
 * @lc app=leetcode id=839 lang=javascript
 *
 * [839] Similar String Groups
 */

// @lc code=start
class UnionFind
{
    parent;
    groupCount;
    constructor(n)
    {
        this.parent = new Array(n);
        for (let i = 0; i < n; i++)
        {
            this.parent[i] = i;
        }
        this.groupCount = n;
    }

    find(i)
    {
        while (this.parent[i] !== i)
        {
            this.parent[i] = this.parent[this.parent[i]];
            i = this.parent[i];
        }

        return i;
    }

    union(i, j)
    {
        const iRoot = this.find(i);
        const jRoot = this.find(j);
        if (iRoot !== jRoot)
        {
            this.parent[iRoot] = jRoot;
            this.groupCount--;
        }
    }
}

/**
 * @param {string[]} strs
 * @return {number}
 */
var numSimilarGroups = function (strs)
{
    /**
     * 使用并查集分组
     * 
     * n^2 遍历 strs，是相似的就归入同一组
     * 
     * 最后输出分组数量
     */

    const n = strs.length;
    const unionFind = new UnionFind(n);

    for (let i = 0; i < n; i++)
    {
        for (let j = i + 1; j < n; j++)
        {
            if (isSimilar(strs[i], strs[j]))
            {
                unionFind.union(i, j);
            }
        }
    }

    return unionFind.groupCount;
};

/**
 * 
 * @param {string} str1 
 * @param {string} str2 
 */
function isSimilar(str1, str2)
{
    let diffCount = 0;
    for (let i = 0; i < str1.length; i++)
    {
        if (str1[i] !== str2[i])
        {
            diffCount++;
            if (diffCount > 2)
            {
                return false;
            }
        }
    }

    return true;
}
// @lc code=end