# @caelus-dts/linked-list

## Overview
The `LinkedList` class provides a robust implementation of a **doubly linked list** data structure in TypeScript. It allows dynamic resizing and offers a comprehensive set of methods for managing and manipulating the list's elements. This structure is particularly efficient for scenarios requiring frequent insertions and deletions.

## Features

- **Doubly Linked:** Elements are linked in both directions, enabling efficient traversal in both forward and reverse order.
- **Dynamic Resizing:** The list grows and shrinks as needed, accommodating varying numbers of elements.
- **Type-Safe:** Built using TypeScript generics, ensuring type safety and preventing common errors.
- **Comprehensive API:** Provides a wide range of methods for adding, removing, searching, and accessing elements.
- **Iterable:** Supports JavaScript's iterable protocol, allowing easy traversal using loops and other iterable methods.

## Installation

1) Using `npm`
```shell
npm install @caelus-dts/linked-list
```
2) Using `yarn`
```shell
yarn add @caelus-dts/linked-list
```
3) Using `pnpm`
```shell
pnpm add @caelus-dts/linked-list
```

## Usage

```ts
import LinkedList from '@caelus-dts/linked-list';

const list = new LinkedList<number>(); // Create a new linked list of numbers

list.push(10, 20, 30); // Add elements to the end
list.unshift(5, 0);    // Add elements to the beginning

console.log(list.first); // Output: 0
console.log(list.last);  // Output: 30

list.remove(2);         // Remove the element at index 2
console.log(list.toArray()); // Output: [0, 5, 20, 30]

list.clear(); // Clear the list


const customCompareList = new LinkedList<string>(null, (a, b) => a.toLowerCase() === b.toLowerCase()); //Case insensitive comparison

customCompareList.push("apple", "Banana", "ORANGE");
console.log(customCompareList.contains("Orange")); // Output: true (because of the custom compare function)


for (const value of list) {
    console.log(value); // Iterate over the list
}
```

## API Documentation

### `constructor(values?: Iterable<T> | null, compareFunc?: CompareFunc<T>)`
Creates a new `LinkedList`.
- `values`: Optional initial values to populate the list. Can be any iterable.
- `compareFunc`: Optional custom comparison function for methods like `contains`, `indexOf`, and `count`. Defaults to strict equality.
### `size: number`
Gets the number of elements in the list.
### `isEmpty: boolean`
Checks if the list is empty.
### `front: ListNode<T> | undefined`
Gets the first node in the list.
### `back: ListNode<T> | undefined`
Gets the last node in the list.
### `first: T | undefined`
Gets the value of the first element.
### `last: T | undefined`
Gets the value of the last element.
### `push(...elements: T[]): number`
Adds elements to the end of the list.
### `unshift(...elements: T[]): number`
Adds elements to the beginning of the list.
### `shift(): T | undefined`
Removes and returns the first element.
### `pop(): T | undefined`
Removes and returns the last element.
### `toArray(): T[]`
Converts the list to an array.
### `clear(): void`
Removes all elements from the list.
### `insert(index: number, value: T): number`
Inserts an element at the specified index.
### `remove(index: number): boolean`
Removes the element at the specified index.
### `get(index: number): T | undefined`
Gets the element at the specified index.
### `indexOf(value: T): number`
Finds the first index of a value.
### `contains(value: T): boolean`
Checks if the list contains a value.
### `count(value: T): number`
Counts the occurrences of a value

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request.

## License
[MIT License](LICENSE)