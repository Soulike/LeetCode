/*
 * @lc app=leetcode id=224 lang=javascript
 *
 * [224] Basic Calculator
 */

// @lc code=start
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s)
{
    /**
     * 进行解析，解析过程中忽略空白
     * nums = []
     * operators = []
     * 
     * -1+2-3 被解析为
     * nums = [-1,2-3]
     * operators = [+,-,null]
     * 
     * 如果解析过程中遇到括号，递归求括号当中的值，放入 nums
     * 最后根据 nums 和 operators 的信息算出结果
     * 
     * 解析方法：
     * 标志 processingDigit, isPositive
     * 
     * for(let i=0;i<s.length;i++)
     *  const c = s[i]
     *  if(processingDigit)
     *      if(c === '-')
     *          isPositive = false
     *      else if(c === '(')
     *          处理括号算式
     *          正确设置 i
     *      else if(isDigit(c))
     *          nums.push(parse(c))
     *      else 
     *          processingDigit = false;
     *          i--;
     *  else
     *      switch 填充 operators
     */

    function helper(left, right)
    {
        if (left === right)
        {
            return Number.parseInt(s[left]);
        }

        let isProcessingDigit = true;
        let isPositive = true;
        const nums = [];
        const operators = [];
        let currentNum = null;

        for (let i = left; i <= right; i++)
        {
            if (s[i] !== ' ')
            {
                const c = s[i];
                if (isProcessingDigit)
                {
                    if (c === '-' && currentNum === null)
                    {
                        isPositive = false;
                    }
                    else if (c === '(')
                    {
                        let openLeftBracket = 1;
                        for (let k = i + 2; ; k++)
                        {
                            if (s[k] === ')')
                            {
                                openLeftBracket--;
                                if (openLeftBracket === 0)
                                {
                                    const subResult = helper(i + 1, k - 1);
                                    nums.push(subResult * (isPositive ? 1 : -1));
                                    i = k;
                                    isProcessingDigit = false;
                                    isPositive = true;
                                    break;
                                }
                            }
                            else if(s[k] === '(')
                            {
                                openLeftBracket++;
                            }
                        }
                    }
                    else if (isDigit(c))
                    {
                        currentNum = currentNum ?? 0;
                        currentNum *= 10;
                        currentNum += Number.parseInt(c);
                    }
                    else
                    {
                        isProcessingDigit = false;
                        i--;
                        nums.push(currentNum * (isPositive ? 1 : -1));
                        currentNum = null;
                        isPositive = true;
                    }
                }
                else
                {
                    operators.push(c);
                    isProcessingDigit = true;
                }
            }
        }

        nums.push(currentNum * (isPositive ? 1 : -1));
        operators.push(null);

        if (nums.length === 1)
        {
            return nums[0];
        }
        else
        {
            const result = nums.reduce((prev, curr, i) =>
            {
                if (operators[i - 1] === '+')
                {
                    return prev + curr;
                }
                else
                {
                    return prev - curr;
                }
            });
            
            return result;
        }
    }

    return helper(0, s.length - 1);
};

function isDigit(c)
{
    return c.charCodeAt(0) >= '0'.charCodeAt(0)
        && c.charCodeAt(0) <= '9'.charCodeAt(0);
}
// @lc code=end

console.log(calculate('(9-(10-(10-0-(3+(8+(0+(8-(10-8-(7-(2+(5+(6+(10+(3+(8+(3-(9+(1+(10+(1-(1+(6-2+0+(10-(9-(3-(3-9-(1-(7+(4-(2+(2-(10+(3+(7-(1-(4+(1+(1-(10-(5-(9+(9-4-(5-(1+8-(2-(1+(1-10-(4-(1+(4-(7)-(3-(8)+(5+5-(5-(9-(8+(8-4-1+(0-(1+(1+(10-(7+(2-(5-(4-(6+(2+(1-(2-(9+8+(2+(9-(9-(7+(10+1+(5)))-(2-(8+3+(5-(7-(3+(9)+(10+(0+(8-(1-(9)-(0+10-(3+(9-(0-(5-(7-(4-4+1+(7)-(10+(5+(9-(3+(5+(6-(0-(7-(1-(4+(6+(4-2-(4+(9-(6+9-8+1+(5+(7-9+3)+(10-(10+(2+(0-(5-(2+(10-(4-5-(7-(4-(7+(4)+6+10+(2-(7+(2))+(1)+(5-(7)-(10-(5+(7-(6-(2+(1-4)+(10-(5)+(4+(10+(4+(0+(10+(8-(8+(6+5-(1-(6-(1-(2+(4+(9-(3+(1+(10+(4)+(0+(3-(2-(9-(2-(3-(4-(2+(7-(6-(5+(7+(5+(5-(4+(0-(7+(2-(7+(9)-(6-(10)+(7+(2-(9-(9)+(4+(1-(8+(2-0-(2+(2+10)-(7-9-(9+(8-(5-8-(5)+(6+(10-(3-(2-(2+(7-2+(9+(3+(9+(2-(8+(5-(4+(4-(1-(9+(0+(6-(4-(3+(5-(2-(4-(6+(0+(4+3)-(8-(6+(9+(1+(2)-(8-(1+1+(5+(4-(3-(1-(7-4+(6+(9+(1+(4)+(6+(4+(2+(7-(1+(4-(8+(6+(8-(9-(2)-3-(0-(0)+(5+(7-(8)+(8-(2+(1)+1+(3+(6-(10-(2-4-(2-(2)+(8)+(3-(1-(1)+(6+(1+(9+(9+(5)-(4+(9+(10)+(0-(3+(3+0)+(6)-(6+(6)+(4-(8-1-5-(6)-(0))-(3)+(3-(3-(8-(10-(0-(4+(7)+(6-4))+1-(2-(1-(0-(0+(1-(0)-0+(5+(10-(2-(9-(9-10)+(3+(5-(6-(6-9-(5+5))+(7+(0)-(2-(7+2+(7-(2+(7+(4-(10+(4+(10-(3-(0-2+(9+(4-4-(3-(2)+(8+(5)+(1+1-(7+(3+(10+5-(0+(10-(9+(8-(0-(0+(8-(1+(0)+(6+(5+(5+(9)))+(4-(1-(3+(7+(9+(8-(1-8-(8+(0+(1+(1-(1)+(7+(6-(7-(8+(10)+1+(0-(10)+(8+(7+(10+(6+(10+(6)-(2+(2+(10-(8)-(5)))+(9-(1)+(4)+(5)-(6-(9)-(1+(6-(9+(10)+2-(4+(9-(4+1)-(0-(9)-(3)+(0)+(10)))+9)+(6+4+(6))+(5-(9))-(9-(2-(6+(7))-(6-(3+(5+(5-(0)-(5+(6-(5+(9-(2+(9+(1+(0+2+(7)-(3-(5+(2)+(4)+(6+(7-(3-(4)+(10+(4))+(3))-(3-(2)-(2+(2+(10+(3)+(3+(5)-(3-(0+(1)+(6+(4-(4)-(7-(9-(9)+(1)+(4)+(7))-(9))))-(3-(1+5-7-(7))-(4+(3+(7-(9+(8)-(9+(8-(3)+(10-(1)+(5)-(2-(4)+(0-(10-(7-(10+(1)+(1)-(4)-(10)))+(7)+(4-4)+0+9-(6))-(6+(5)))))-(8-(6)-(10+(5-(8)-(10+(3+(0+(6-(9)-(1)))-(0)-(9+(0+(1+(8+2-(4-(9-(4+(3+4)-(10+(1-(5)+(10-(4-(6-(4-(2+(4)-(9)-(4))))-3))))+(9)+(9+(0-(1+(5-(5+(7)-6-(8-(3-(3+(1)-(9-(7-(6)))-(2+(1))-(1+(2+(10))))+(6)+(0+(9-(1)-(10)))+(10-(1-(1)))-(0+(0-(2-(4-(6+(1))+(0)+(5)-(5+(5)-(4+(6)-(5)+(1-(7))))+(8)-(7))-3))-(7+(7+(9+(0+(10)-(7-(0-(2)-(6))-(2+(10)))+(7)+(3))+(8-(8+(10)-(8)+(0+(6-(2)-(1))+(3+(10+(10-(4+(7-(2)-(9-(2+(8))))+(7)-(7+10+(9-(2)+(0))-(6+(1)))+(10)+(2)-(7)-(4)-(10+(3-(6))))+(8-(1))-(10)))+(5+(3-(0-(1-(2+(3-(6-(4)-(1)+(4+(7+(3)-(7)+(4-(9))+(0-(4)+(9+(3-(9)+(4-(10+(6+(4)))+(4))+(10+(0-3-(8+(0-(6))-(5))-(9))-(6))))+2))+6+(6)+(1-(6))-(7-(1))-(8)+(9-(8))+(4)))-(0+7-(1)))-(2))+(0)))+(4-(7))-(5)-(8)-4+(1-(3-(8+(2+0)+(7)))))))-(4-(2))+(9))))+(7)-(2-(10+(4)-(8+(7)+(5-(4)-(6+6))-(2+(6)-(2+(4-(2-(8-(4)-(7+(5)-(10-(7)))))-(10+(9+(8)-(10)+(3-(7+(4+(2+(5)-(10+7+(2-(10)-(10+(3))+(0-(10+(8+(4+(7-(2)+(3+9))))+(7-(6+(2)-(2)+7+(5+(7+(10+(5-(4)-2+(5)+(1))+(0))))-(9))-5-(8)-(9-(4)-(10))-(8-(5)-(10)-7)+(5))-(4)))))+6+3+(3+(6+(9)))-10+(6)+(0)))))+(7)))+(1-(5)+(3-(3+6))+(5)+(7)-(9-(1))+(4+(1))+(2)))-(3))-(10)+(1)))))))))+(3)+2+(8-(4)))-(1))+(6-(8-(0)-(8-(0))-(2-(4+2)))-(9+1)))-(8-(8+(1-8-(7))))+7-(5+(5+(6+(10)+(8)))))))-(4))))-(4)-(6)+(10)-(5)))+(0+(2+(4))-(4-(2)+(0-(10-(4))))))+3-(10)))-(9+(9-(8-(7)-4))))+(6))-(4-(9))))-(1))+(10))))-(0+(9+7-(1)))))-(7)-(4)))-(9))))-7))))+(9))+(10))-(8-(9)))+(8))-(6)-(4)-(8)))))))))))))-(7)))))+(2-(6)-(0))))-(0)-(5+(9)+(9))+(3-(9))))+(8))))))))-(0-(0))+(7-(2))))))))-(6))-(8+(9))-(9+(2))-(2)+(9))-(4))+(7)-(1)-(6))-(2-0)))))))-(0)))))-(8+(0-(5))))+(9)-(1-(0)-(3)))-(3)-(0)))+(4)+(6))))-(5)+(1-(5)))))+(10))))-(5)+(0))))))-(6)))))))+(1))))))))-(5)))))))))+(8))))))))))))))))))-(7)+(10)))))))))))))-(4))))))-(10)-(4))+(1)+(3))-(1))))+(9))))))))+(2-(7-(4-(3+(0))))-(10)))))+0))))+(10)))))+(4)))))))))))+(3)))))))-(5)))))+(3)))))))))))))-(7)-(5-(2+(9))-(0))+(4)))+(10)))))-(1)))-(0))+(1))-(8+(10))))))-(10)-(10+(9)+(2))))-(1)))-(2))))+(4+(5))))))+(8))))))))))))))))))))))-(7)))-(3)))))))+(1))))-(7)-(3)+(4))))))-(6)))))))-(9-(3)))))))))))+(8))))))))))+(6))))))))))))))))))))))))))))))))))+(5))+(7))))))))))))))))))))))))-(10))))))+9)))))))'));