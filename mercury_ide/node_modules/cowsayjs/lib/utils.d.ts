/**
 * Predicate finder function
 *
 * @param value Current value
 * @param index Current index
 * @param obj The array that `find` was called on
 * @return Whether the predicate is true
 */
declare type Predicate<T> = (value: T, index: number, obj: T[]) => boolean;

/**
 * Own find into array implementation
 *
 * @template T
 * @param arr Array
 * @param predicate Finder function
 * @returns Find result
 * @see Array.find
 */
export declare function find<T>(arr: Array<T>, predicate: Predicate<T>): T;
