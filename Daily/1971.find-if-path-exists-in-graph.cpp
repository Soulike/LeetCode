/*
 * @lc app=leetcode id=1971 lang=cpp
 *
 * [1971] Find if Path Exists in Graph
 */
#include <vector>

using std::vector;

// @lc code=start
class union_find_set {
 private:
  using member_type = unsigned long long;
  using size_type = unsigned long long;

  size_type _set_count;
  const size_type _size;
  member_type* const parent;

 public:
  union_find_set(size_type n) : _size(n), parent(new member_type[n]) {
    for (int i = 0; i < n; i++) {
      parent[i] = i;
    }
    _set_count = n;
  }

  ~union_find_set() { delete[] parent; }

  size_type size() const { return _size; }

  size_type set_count() const { return _set_count; }

  void do_union(member_type a, member_type b) {
    member_type aSet = find(a);
    member_type bSet = find(b);
    if (aSet != bSet) {
      _set_count--;
      parent[bSet] = aSet;
    }
  }

  member_type find(member_type m) {
    if (parent[m] == m)
      return m;
    parent[m] = find(parent[m]);
    return parent[m];
  }
};

class Solution {
 public:
  bool validPath(int n,
                 vector<vector<int>>& edges,
                 int source,
                 int destination) {
    union_find_set unionFindSet(n);
    for (auto& edge : edges) {
      unionFindSet.do_union(edge[0], edge[1]);
    }

    return unionFindSet.find(source) == unionFindSet.find(destination);
  }
};
// @lc code=end
