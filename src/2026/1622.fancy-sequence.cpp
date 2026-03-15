/*
 * @lc app=leetcode id=1622 lang=cpp
 *
 * [1622] Fancy Sequence
 */

#include <unordered_map>
#include <vector>

// @lc code=start
class Fancy {
 public:
  Fancy() {}

  void append(const int val) { nums_.push_back(val); }

  void addAll(const int inc) {
    if (nums_.empty()) {
      return;
    }

    mutates_.push_back(
        {MutateType::kAdd, inc, static_cast<int>(nums_.size()) - 1});
  }

  void multAll(const int m) {
    if (nums_.empty()) {
      return;
    }

    mutates_.push_back(
        {MutateType::kMultiply, m, static_cast<int>(nums_.size()) - 1});
  }

  int getIndex(const int idx) {
    if (idx >= nums_.size()) {
      return -1;
    }

    int first_mutate_index = -1;
    std::intmax_t num = nums_[idx];

    if (!nums_index_to_cache_.contains(idx)) {
      first_mutate_index = GetFirstMutateIndex(idx);
    } else {
      const ResultCache& cache = nums_index_to_cache_.at(idx);
      first_mutate_index = cache.last_mutate_index + 1;
      num = cache.value;
    }

    for (int i = first_mutate_index; i < mutates_.size(); i++) {
      const Mutate& mutate = mutates_[i];
      if (mutate.type == MutateType::kAdd) {
        num += mutate.value;
      } else if (mutate.type == MutateType::kMultiply) {
        num *= mutate.value;
      }
      num %= kMod;
    }
    nums_index_to_cache_[idx] = {static_cast<int>(num),
                                 static_cast<int>(mutates_.size()) - 1};
    return static_cast<int>(num);
  }

 private:
  static constexpr int kMod = 1e9 + 7;

  enum class MutateType {
    kAdd,
    kMultiply,
  };

  struct Mutate {
    MutateType type;
    int value;
    int last_num_index;
  };

  struct ResultCache {
    int value;
    int last_mutate_index;
  };

  [[nodiscard]] int GetFirstMutateIndex(const int nums_index) const {
    int left = 0;
    int right = mutates_.size();

    while (left < right) {
      const int mid = (right - left) / 2 + left;
      if (mutates_[mid].last_num_index < nums_index) {
        left = mid + 1;
      } else {
        right = mid;
      }
    }

    return left;
  }

  std::vector<int> nums_;
  std::vector<Mutate> mutates_;

  std::unordered_map<int, ResultCache> nums_index_to_cache_;
};

/**
 * Your Fancy object will be instantiated and called as such:
 * Fancy* obj = new Fancy();
 * obj->append(val);
 * obj->addAll(inc);
 * obj->multAll(m);
 * int param_4 = obj->getIndex(idx);
 */
// @lc code=end
