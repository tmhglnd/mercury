"use strict";

/**
 * Predicate finder function
 *
 * @template T
 * @callback Predicate<T>
 * @param {T} value Current value
 * @param {number} index Current index
 * @param {T[]} obj The array that `find` was called on
 * @returns {boolean} Whether the predicate is true
 * @package
 */

/**
 * Own find into array implementation
 *
 * @template T
 * @param {Array<T>} arr Array
 * @param {Predicate<T>} predicate Finder function
 * @returns {T | undefined} Find result
 * @see Array.find
 */
function find(arr, predicate) {
  // For each element
  for (var i = 0; i < arr.length; ++i) {
    var elem = arr[i];

    // Return the element if predicate is true
    if (predicate(elem, i, arr)) {
      return elem;
    }
  }

  // Undefined if element is not found
  return undefined;
}


/**
 * Util helpers functions
 *
 * @module cowsay/lib/utils
 */
module.exports = {
  find: find
};
