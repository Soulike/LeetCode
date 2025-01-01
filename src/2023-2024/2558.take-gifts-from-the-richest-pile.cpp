/*
 * @lc app=leetcode id=2558 lang=cpp
 *
 * [2558] Take Gifts From the Richest Pile
 */
#include <cmath>
#include <numeric>
#include <queue>
#include <vector>

// @lc code=start
class Solution {
 public:
  long long pickGifts(std::vector<int>& gifts, int k) {
    std::priority_queue<int> giftPq(gifts.cbegin(), gifts.cend());
    long long giftSum =
        std::accumulate(gifts.cbegin(), gifts.cend(), 0ll,
                        [](const auto a, const auto b) { return a + b; });
    for (int i = 0; i < k; i++) {
      const int mostGift = giftPq.top();
      giftPq.pop();
      const int mostGiftSquareRoot = static_cast<int>(std::sqrt(mostGift));
      giftPq.push(mostGiftSquareRoot);
      giftSum = giftSum + (mostGiftSquareRoot - mostGift);
    }

    return giftSum;
  }
};

// @lc code=end
