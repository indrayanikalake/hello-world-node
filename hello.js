console.log('hello world');
const obj1 = { 'key1': 1, 'key2': 2 };

const obj2 = { ...obj1, key1: 1000 };

console.log(obj1);
console.log(obj2);
const ob1 = {'key1': 1, "key2": 2, "key3": 1000}

const { key1, key3} = { ...ob1}



console.log(key1, key3)
const arr1 = ['value1', 'value2']

const [ val1, val2 ] = arr1



console.log(val1)

console.log(val2)

