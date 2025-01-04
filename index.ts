import {IterableElement} from "@caelus-dts/iterable";

/**
 * Function type for comparing elements.
 */
export type CompareFunc<T, R = boolean> = (a: T, b: T) => R;

/**
 * Represents a single node in a doubly linked list.
 * Each node holds a value and references to the next and previous nodes.
 */
export class ListNode<T> {
    /**
     * The next node in the linked list.
     */
    public next: ListNode<T> | null;
    /**
     * The previous node in the linked list.
     */
    public prev: ListNode<T> | null;

    /**
     * @param value - The value stored in the node.
     */
    constructor(public value: T) {
        this.next = null;
        this.prev = null;
    }
}

/**
 * The SentinelListNode inherits from the ListNode class and provides
 * a specialized node implementation with an uninitialized or null
 * data value.
 */
export class SentinelListNode<T> extends ListNode<T> {
    constructor() {
        super(null as T);
    }
}

/**
 * Checks if the given value is either `null` or `undefined`.
 *
 * @param v - The value to check.
 * @return Returns `true` if the value is `null` or `undefined`, otherwise `false`.
 */
export function isNullableBasic(v: unknown): v is null | undefined {
    return v === null || v === undefined;
}

/**
 * Reverses the sign of a given number.
 *
 * @param {number} n - The number whose sign is to be flipped.
 * @return The number with its sign flipped. If the input is positive, returns negative; if negative, returns positive.
 */
export function flipNumSign(n: number) {
    if (n < 0) return Math.abs(n);
    return 0 - n;
}

const DEF_VAL = {
    compare_function: <T>(a: T, b: T) => a === b,
}

/**
 * Represents a doubly linked list data structure that supports various operations such as insertion,
 * deletion, traversal, and more. The linked list maintains an order of elements while allowing dynamic
 * resizing.
 *
 * @template T - The type of elements to store in the linked list
 */
export default class LinkedList<T> extends IterableElement<T> {
    protected _head: ListNode<T>;
    protected _tail: ListNode<T>;

    /**
     * Constructs a new instance of the LinkedList class.
     *
     * @param [values=null] - Initial values to populate the linked list
     * @param [compareFunc=Function] - The comparison function used to compare elements in the list
     */
    constructor(
        values: Iterable<T> | null = null,
        protected compareFunc: CompareFunc<T> = DEF_VAL.compare_function,
    ) {
        super();
        this._head = new SentinelListNode();
        this._tail = new SentinelListNode();
        this._head.next = this._tail;
        this._tail.prev = this._head;
        this._size = 0;
        if (!isNullableBasic(values)) {
            for (const value of values) this.push(value);
        }
    }

    protected _size: number;
    /**
     * The number of elements in the linked list
     */
    public get size() {
        return this._size;
    }

    /**
     * Checks if the linked list is empty
     */
    public get isEmpty() {
        return this.size === 0;
    }

    /**
     * The node at the front of the linked list
     */
    public get front() {
        if (this.isEmpty) return undefined;
        return this._head.next;
    }

    /**
     * The node at the back of the linked list
     */
    public get back() {
        if (this.isEmpty) return undefined;
        return this._tail.prev;
    }

    /**
     * Retrieves the value of the first element in the linked list
     */
    public get first() {
        const front = this.front
        return (isNullableBasic(front)) ? undefined : front.value;
    }

    /**
     * Retrieves the value of the last element in the linked list
     */
    public get last() {
        const back = this.back
        return (isNullableBasic(back)) ? undefined : back.value;
    }

    protected get iterator() {
        let currentNode = this.front;
        return {
            next: () => {
                if (isNullableBasic(currentNode)) return {done: true, value: undefined};
                const value = currentNode.value;
                currentNode = currentNode.next;
                return {
                    done: false,
                    value,
                };
            },
            return: () => {
                currentNode = this.front;
                return {
                    done: false,
                    value: undefined,
                };
            },
        } as IterableIterator<T>;
    }

    /**
     * Adds one or more elements to the end of the linked list
     *
     * @param elements - The elements to add to the end of the linked list
     *
     * @returns The new size of the linked list after the elements are added
     */
    public push(...elements: T[]) {
        for (const element of elements) {
            const newNode = new ListNode(element);
            const node = this._tail.prev;
            if (!isNullableBasic(node)) {
                newNode.prev = node;
                newNode.next = this._tail;
                node.next = newNode;
                this._tail.prev = newNode;
                this._size += 1;
            }
        }
        return this.size;
    }


    /**
     * Adds one or more elements to the beginning of the list and updates the list's size.
     *
     * **Note:** If multiple elements are provided, the insertion is processed in left-to-right (LTR) order. This means the last element in the input array becomes the first one in the linked list
     *
     * @param elements - The elements to add to the beginning of the linked list
     *
     * @return The new size of the linked list after the elements are added
     */
    public unshift(...elements: T[]): number {
        if (elements.length === 0) return this.size;
        let lastInsertedNode: ListNode<T> | null = null;
        for (const element of elements) {
            const newNode = new ListNode<T>(element);
            newNode.next = lastInsertedNode ?? this.front ?? null;
            if (lastInsertedNode) lastInsertedNode.prev = newNode;
            lastInsertedNode = newNode;
        }
        if (lastInsertedNode) {
            const firstInsertedNode = lastInsertedNode;
            const currentFirst = this.front;
            firstInsertedNode.prev = this._head;
            this._head.next = lastInsertedNode;
            if (currentFirst) currentFirst.prev = lastInsertedNode;
        }
        this._size += elements.length;
        return this.size;
    }

    /**
     * Removes and returns the first element from the linked list
     *
     * @returns The removed element, or undefined if the list is empty
     */
    public shift() {
        if (this.isEmpty) return undefined;
        const node = this.front;
        const newNode = node?.next;
        if (!isNullableBasic(node) && !isNullableBasic(newNode)) {
            this._head.next = newNode;
            newNode.prev = this._head;
            node.next = null;
            node.prev = null;
            this._size -= 1;
            return node.value;
        }
        return undefined;
    }

    /**
     * Removes and returns the last element from the linked list
     *
     * @returns The removed element, or undefined if the list is empty
     */
    public pop() {
        if (this.isEmpty) return undefined;
        const node = this.back;
        const newNode = node?.prev;
        if (!isNullableBasic(node) && !isNullableBasic(newNode)) {
            this._tail.prev = newNode;
            newNode.next = this._tail;
            node.next = null;
            node.prev = null;
            this._size -= 1;
            return node.value;
        }
        return undefined;
    }

    /**
     * Returns an array containing all elements in the linked list
     *
     * @returns An array containing all elements in the linked list
     */
    public toArray() {
        const array: T[] = [];
        let node = this._head.next;
        while (!isNullableBasic(node)) {
            array.push(node.value);
            node = node.next;
        }
        return array;
    }

    /**
     * Removes all elements from the linked list
     */
    public clear() {
        this._head = new SentinelListNode();
        this._tail = new SentinelListNode();
        this._head.next = this._tail;
        this._tail.prev = this._head;
        this._size = 0;
    }

    /**
     * Inserts an element at a specified index in the linked list
     *
     * @param index - The index at which to insert the value
     * @param value - The value to insert into the linked list
     *
     * @returns The new size of the linked list if successful, otherwise returns the current size
     */
    public insert(index: number, value: T) {
        const node = this._traverse(index, true);
        const newNode = new ListNode(value);
        const prevNode = node?.prev;
        if (!isNullableBasic(node) && !isNullableBasic(prevNode)) {
            prevNode.next = newNode;
            newNode.prev = prevNode;
            node.prev = newNode;
            newNode.next = node;
            this._size += 1;
        }
        return this.size;
    }

    /**
     * Removes an element at a specified index from the linked list
     *
     * @param index - The index of the element to remove
     *
     * @returns Boolean that indicates if the removal was successful or not
     */
    public remove(index: number) {
        const node = this._traverse(index);
        if (isNullableBasic(node)) return false;
        const prevNode = node.prev;
        const nextNode = node.next;
        if (!isNullableBasic(prevNode) && !isNullableBasic(nextNode)) {
            prevNode.next = nextNode;
            nextNode.prev = prevNode;
            node.next = null;
            node.prev = null;
            this._size -= 1;
            return true;
        }
        return false;
    }

    /**
     * Gets the value at the specified index in the linked list
     *
     * @param index - The index of the value to retrieve
     *
     * @returns The value at the specified index, or `undefined` if the index is out of bounds
     */
    public get(index: number) {
        const node = this._traverse(index);
        if (isNullableBasic(node)) return undefined;
        return node.value;
    }

    /**
     * Finds the index of the first occurrence of a value in the linked list
     *
     * @param value - The value to search for in the linked list
     *
     * @returns The index of the first occurrence of the value, or `-1` if not found
     */
    public indexOf(value: T) {
        let index = 0;
        let node = this._head!.next;
        while (!isNullableBasic(node)) {
            if (this.compareFunc(node.value, value)) return index;
            index += 1;
            node = node.next;
        }
        return -1;
    }

    /**
     * Checks if the linked list contains a specific value
     *
     * @param value - The value to check for in the linked list
     *
     * @returns Boolean that indicates if the value exists in the linked list or not
     */
    public contains(value: T) {
        return this.indexOf(value) > -1;
    }

    /**
     * Counts the occurrences of a specific value in the linked list
     *
     * @param value - The value to count occurrences of in the linked list
     *
     * @returns The count of occurrences of the specified value
     */
    public count(value: T) {
        let count = 0;
        let node = this._head!.next;
        while (!isNullableBasic(node)) {
            if (this.compareFunc(node.value, value)) count += 1;
            node = node.next;
        }
        return count;
    }

    private _traverse(index: number, allowExceed = false) {
        if (!allowExceed && (index >= this.size || index < flipNumSign(this.size)))
            return undefined;
        if (this.isEmpty) return this._tail;
        if (index >= 0) {
            let node = this._head.next;
            let counter = 0;
            while (!isNullableBasic(node) && index > counter && this.size > counter) {
                node = node.next;
                counter += 1;
            }
            return node;
        }
        let node = this._tail.prev;
        let counter = 0;
        index = Math.abs(index) - 1;
        while (!isNullableBasic(node) && index > counter && this.size > counter) {
            node = node.prev;
            counter += 1;
        }
        return node;
    }
}