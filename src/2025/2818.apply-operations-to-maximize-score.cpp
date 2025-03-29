/*
 * @lc app=leetcode id=2818 lang=cpp
 *
 * [2818] Apply Operations to Maximize Score
 */

#include <queue>
#include <stack>
#include <vector>

// @lc code=start
size_t GetTheNumberOfDistinctPrimeNumberFactors(std::uintmax_t number);

class Solution {
 public:
  int maximumScore(const std::vector<int>& nums, int k) {
    std::vector<int> prime_score(nums.size(), -1);
    for (int i = 0; i < nums.size(); i++) {
      prime_score[i] =
          static_cast<int>(GetTheNumberOfDistinctPrimeNumberFactors(nums[i]));
    }

    std::vector<int> prev_higher_equal_prime_score_index(nums.size(), -1);
    std::vector<int> next_higher_prime_score_index(
        nums.size(), static_cast<int>(nums.size()));

    std::stack<int> non_increasing_stack;

    for (int i = 0; i < nums.size(); i++) {
      if (non_increasing_stack.empty()) {
        non_increasing_stack.push(i);
        continue;
      }

      while (!non_increasing_stack.empty() &&
             prime_score[non_increasing_stack.top()] < prime_score[i]) {
        next_higher_prime_score_index[non_increasing_stack.top()] = i;
        non_increasing_stack.pop();
      }

      if (!non_increasing_stack.empty()) {
        prev_higher_equal_prime_score_index[i] = non_increasing_stack.top();
      }
      non_increasing_stack.push(i);
    }

    const auto prime_score_info_comp = [&](const PrimeScoreInfo& info1,
                                           const PrimeScoreInfo& info2) {
      return nums[info1.index_] < nums[info2.index_];
    };

    std::priority_queue<PrimeScoreInfo, std::vector<PrimeScoreInfo>,
                        decltype(prime_score_info_comp)>
        prime_score_info_priority_queue(prime_score_info_comp);
    for (int i = 0; i < prime_score.size(); i++) {
      prime_score_info_priority_queue.push({i, prime_score[i]});
    }
    std::uintmax_t score = 1;
    static constexpr int kMod = 1e9 + 7;

    while (!prime_score_info_priority_queue.empty() && k > 0) {
      const auto [index_, prime_score_] = prime_score_info_priority_queue.top();
      prime_score_info_priority_queue.pop();
      const int num = nums[index_];
      const std::uintmax_t sub_array_choices =
          static_cast<std::uintmax_t>(
              (next_higher_prime_score_index[index_] - index_)) *
          static_cast<std::uintmax_t>(
              index_ - prev_higher_equal_prime_score_index[index_]);

      score =
          score *
          PowMod(num,
                 std::min(static_cast<std::uintmax_t>(k), sub_array_choices),
                 kMod) %
          kMod;
      k -= sub_array_choices;
    }

    return static_cast<int>(score);
  }

 private:
  class PrimeScoreInfo {
   public:
    int index_;
    int prime_score_;
  };

  static std::uintmax_t PowMod(std::uintmax_t base,
                               std::uintmax_t exponent,
                               const int mod) {
    std::uintmax_t result = 1;

    while (exponent > 0) {
      if (exponent % 2 == 1) {
        result = ((result * base) % mod);
      }

      base = (base * base) % mod;
      exponent /= 2;
    }

    return result;
  }
};

size_t GetTheNumberOfDistinctPrimeNumberFactors(const std::uintmax_t number) {
  size_t number_of_factors = 0;
  auto current_number = number;
  auto number_square_root = std::sqrt(number);
  for (std::uintmax_t i = 2;
       i <= static_cast<std::uintmax_t>(number_square_root); i++) {
    if (current_number % i == 0) {
      // `i` must be a prime here.
      // Because if `i` is not a prime, its factors should have been divided
      // before.
      // For example, if `i` is 6, then 2 and 3 must have been divided before
      // when `i` was 2 and 3. So it is impossible for `current_number` to be
      // still able to be divided by 6.
      number_of_factors++;
      while (current_number % i == 0) {
        current_number /= i;
      }
    }
  }

  if (current_number >= 2) {
    number_of_factors += 1;
  }
  return number_of_factors;
}
// @lc code=end

int main() {
  Solution sol;
  sol.maximumScore({19, 12, 14, 6, 10, 18}, 3);
}
