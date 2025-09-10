/*
 * @lc app=leetcode id=1733 lang=cpp
 *
 * [1733] Minimum Number of People to Teach
 */

#include <algorithm>
#include <unordered_set>
#include <vector>

// @lc code=start
class Solution {
 public:
  int minimumTeachings(const int n,
                       const std::vector<std::vector<int>>& languages,
                       const std::vector<std::vector<int>>& friendships) {
    std::vector<std::unordered_set<int>> people_to_languages(languages.size() +
                                                             1);
    for (int i = 0; i < languages.size(); i++) {
      people_to_languages[i + 1] = {languages[i].cbegin(), languages[i].cend()};
    }

    std::vector<std::vector<int>> no_common_language_friendships;
    std::ranges::copy_if(
        friendships, std::back_inserter(no_common_language_friendships),
        [&](const std::vector<int>& friendship) {
          const int people1 = friendship[0];
          const int people2 = friendship[1];
          const std::unordered_set<int>& people1_languages =
              people_to_languages[people1];
          const std::unordered_set<int>& people2_languages =
              people_to_languages[people2];

          return !HasIntersection(people1_languages, people2_languages);
        });

    int min_teach_count = INT_MAX;

    for (int i = 1; i <= n; i++) {
      std::unordered_set<int> teach_people;

      for (const std::vector<int>& friendship :
           no_common_language_friendships) {
        const int people1 = friendship[0];
        const int people2 = friendship[1];
        const std::unordered_set<int>& people1_languages =
            people_to_languages[people1];
        const std::unordered_set<int>& people2_languages =
            people_to_languages[people2];
        if (!people1_languages.contains(i)) {
          teach_people.insert(people1);
        }
        if (!people2_languages.contains(i)) {
          teach_people.insert(people2);
        }
      }

      min_teach_count =
          std::min(min_teach_count, static_cast<int>(teach_people.size()));
    }

    return min_teach_count;
  }

 private:
  static bool HasIntersection(const std::unordered_set<int>& set1,
                              const std::unordered_set<int>& set2) {
    return std::ranges::any_of(
        set1, [&](const int num) { return set2.contains(num); });
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.minimumTeachings(2, {{1}, {2}, {1, 2}}, {{1, 2}, {1, 3}, {2, 3}});
}
