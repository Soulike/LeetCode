/*
 * @lc app=leetcode id=1641 lang=javascript
 *
 * [1641] Count Sorted Vowel Strings
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
var countVowelStrings = function (n)
{
    /**
     * 隔板法，我们有 n-1 个位置可以放隔板
     * 插 0 个搁板，只有一个字母，数量 C(5,1)
     * 插 1 个搁板，数量 C(n-1,1)*C(5,2)
     * ...
     * 插 i 个搁板，数量 C(n-1,i)*C(5,i+1)
     * 
     * C(n-1,0)*C(5,1) 
     * + C(n-1,1)*C(5,2) 
     * + C(n-1,2)*C(5,3) 
     * + C(n-1,3)*C(5,4) 
     * + C(n-1,4)*C(5,5)
     */

    let result = 0;
    for (let i = 0; i <= 4 && i <= n - 1; i++)
    {
        result += combination(n - 1, i) * combination(5, i + 1);
    }
    return result;
};

function combination(m, n)
{
    let result = 1;
    for (let i = 1; i <= m - n; i++)
    {
        // 先做除法再做乘法，避免溢出
        result /= i;
        result *= i + n;
    }
    return result;
}
// @lc code=end