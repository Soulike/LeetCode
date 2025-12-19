/*
 * @lc app=leetcode id=2092 lang=cpp
 *
 * [2092] Find All People With Secret
 */

#include <map>
#include <vector>

// @lc code=start
class UFSet {
 public:
  explicit UFSet(const int size) : parents_(size) {
    for (int i = 0; i < parents_.size(); i++) {
      parents_[i] = i;
    }
  }

  void Union(const int element1, const int element2) {
    const int element2_root = Find(element2);
    parents_[element2_root] = Find(element1);
  }

  int Find(int element) const {
    while (parents_[element] != element) {
      parents_[element] = Find(parents_[element]);
      element = parents_[element];
    }
    return element;
  }

  bool InSameSet(const int element1, const int element2) const {
    return Find(element1) == Find(element2);
  }

  void Reset(const int element) { parents_[element] = element; }

 private:
  mutable std::vector<int> parents_;
};

class Solution {
 public:
  std::vector<int> findAllPeople(const int n,
                                 const std::vector<std::vector<int>>& meetings,
                                 const int firstPerson) {
    std::map<int, std::vector<std::vector<int>>> time_to_meetings;
    for (const std::vector<int>& meeting : meetings) {
      const int person1 = meeting[0];
      const int person2 = meeting[1];
      const int time = meeting[2];
      time_to_meetings[time].push_back({person1, person2});
    }

    UFSet uf_set(n);
    uf_set.Union(0, firstPerson);

    for (const auto& [time, meetings] : time_to_meetings) {
      for (const std::vector<int>& meeting : meetings) {
        uf_set.Union(meeting[0], meeting[1]);
      }

      for (const std::vector<int>& meeting : meetings) {
        if (uf_set.InSameSet(0, meeting[0]) ||
            uf_set.InSameSet(0, meeting[1])) {
          continue;
        }
        uf_set.Reset(meeting[0]);
        uf_set.Reset(meeting[1]);
      }
    }

    std::vector<int> all_people;
    for (int i = 0; i < n; i++) {
      if (uf_set.InSameSet(i, 0)) {
        all_people.push_back(i);
      }
    }

    return all_people;
  }
};
// @lc code=end
