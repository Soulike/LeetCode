/*
 * @lc app=leetcode id=1344 lang=cpp
 *
 * [1344] Angle Between Hands of a Clock
 */

#include <algorithm>
#include <cmath>

// @lc code=start
class Solution {
 public:
  double angleClock(const int hour, const int minutes) {
    static constexpr double kCircleDegree = 360;
    static constexpr double kDegreePerHour = kCircleDegree / 12;
    static constexpr double kDegreePerMinute = kCircleDegree / 60;
    static constexpr double kMinutePerHour = 60;

    const double hour_angle =
        (hour + minutes / kMinutePerHour) * kDegreePerHour;
    const double minute_angle = minutes * kDegreePerMinute;
    const double angle_diff = std::abs(hour_angle - minute_angle);
    return std::min(angle_diff, kCircleDegree - angle_diff);
  }
};
// @lc code=end

int main() {
  Solution sol;
  sol.angleClock(3, 15);
}
