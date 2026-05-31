/*
 * @lc app=leetcode id=2126 lang=cpp
 *
 * [2126] Destroying Asteroids
 */

#include <algorithm>
#include <vector>

// @lc code=start
class Solution {
 public:
  bool asteroidsDestroyed(int planet_mass, std::vector<int>& asteroids) {
    std::ranges::sort(asteroids);
    const int max_asteroid_mass = asteroids.back();
    if (planet_mass >= max_asteroid_mass) {
      return true;
    }

    for (const int asteroid_mass : asteroids) {
      if (asteroid_mass <= planet_mass) {
        planet_mass += asteroid_mass;
        if (planet_mass >= max_asteroid_mass) {
          return true;
        }
      } else {
        return false;
      }
    }
    return true;
  }
};
// @lc code=end

int main() {
  Solution sol;
  std::vector<int> asteroids = {3, 9, 19, 5, 21};
  sol.asteroidsDestroyed(10, asteroids);
}
