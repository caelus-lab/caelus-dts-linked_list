import LinkedList from "../index.ts";

describe('LinkedList Test', () => {
    const list = new LinkedList([0]);
    beforeEach(() => {
        list.clear();
    })
    test('should initialize the class without error', () => {
        expect(list).toBeDefined();
        expect(list.size).toBe(0);
    })
    test('should add elements', () => {
        list.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        expect(list.size).toBe(10);
    })
    test('should support spread operator', () => {
        list.push(1, 2, 3);
        const newList = [...list];
        expect(newList).toEqual(expect.arrayContaining([1, 2, 3]));
    })
    test('should support toArray', () => {
        list.push(1, 2, 3);
        const newList = list.toArray();
        expect(newList).toEqual(expect.arrayContaining([1, 2, 3]));
    })
    test('should remove the first element from the list', () => {
        list.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        const first = list.shift();
        expect(list.size).toBe(9);
        expect(first).toEqual(1);
    })
    test('should remove the last element from the list', () => {
        list.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        const last = list.pop();
        expect(list.size).toBe(9);
        expect(last).toEqual(10);
    })
    test('should remove specific element from the list', () => {
        list.push(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
        list.remove(list.indexOf(6));
        const newList = [...list];
        expect(newList.includes(6)).toBeFalsy();
    })
    test('should get first item from the list', () => {
        list.push(1, 2, 3)
        const first = list.first
        expect(first).toEqual(1)
    })
    test('should get last item from the list', () => {
        list.push(1, 2, 3)
        const last = list.last
        expect(last).toEqual(3)
    })
    test('should insert at the start of the list', () => {
        list.push(1, 2, 3)
        list.unshift(101, 99, 130)
        const first = list.first
        expect(list.size).toBe(6);
        expect(first).toEqual(130)
    })
    test('should insert item at specific index', () => {
        list.push(1, 2, 3)
        list.insert(1, 101)
        const newList = [...list]
        expect(newList).toEqual(expect.arrayContaining([1, 101, 2, 3]))
    })
    test('should get item at specific index ', () => {
        list.push(1, 2, 3)
        expect(list.get(1)).toEqual(2)
    })
    test('should check if item exist in the list', () => {
        list.push(1, 2, 3, 4, 99, 5)
        expect(list.contains(99)).toBeTruthy()
    })
    test('should count the occurrences of an item', () => {
        list.push(1, 2, 3, 4, 99, 5, 99)
        expect(list.count(99)).toBe(2)
    })
})