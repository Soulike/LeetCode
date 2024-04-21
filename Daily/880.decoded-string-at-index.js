/*
 * @lc app=leetcode id=880 lang=javascript
 *
 * [880] Decoded String at Index
 */

// @lc code=start
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var decodeAtIndex = function (s, k) {
  let decodedLength = 0; // Total length of the decoded string

  let decodeEndIndex = 0;

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (isDigit(char)) {
      // If the character is a digit, update the decoded length accordingly
      decodedLength *= Number.parseInt(char);
    } else {
      // If the character is a letter, increment the decoded length
      decodedLength++;
    }

    // stop if length is enough
    if (decodedLength >= k) {
      decodeEndIndex = i;
      break;
    }
  }

  // Traverse the input string in reverse to decode and find the kth character
  for (let i = decodeEndIndex; i >= 0; i--) {
    const currentChar = s[i];

    if (isDigit(currentChar)) {
      // If the character is a digit, adjust the length and k accordingly
      decodedLength /= Number.parseInt(currentChar);
      k %= decodedLength;
    } else {
      // If the character is a letter, check if it's the kth character
      if (k === 0 || decodedLength === k) {
        return currentChar; // Return the kth character as a string
      }
      decodedLength--;
    }
  }

  return ''; // Return an empty string if no character is found
};

/**
 * @param {string} char
 * @returns {boolean}
 */
function isDigit(char) {
  return !Number.isNaN(Number.parseInt(char));
}
// @lc code=end

decodeAtIndex(
  'jb8dis8msunncn92o7o45iq7jrkkmx8q24vesm6i4jdtweq6gxccrb7p2fhxsqke7njwcul4y9cd3rpmrhq3ve6prifmt7aa89tt',
  731963130,
);
