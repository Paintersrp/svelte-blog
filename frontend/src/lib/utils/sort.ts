const arr = [8, 1, 3, 19, 2];
const arr2 = [7, 3, 24, 9, 82];
const arr3 = ['Ryan', 'Matt', 'Tom', 'Amber', 'Bree'];
const arr4 = ['Ryan', 'Matt', 'Tom', 'Amber', 'Bree'];

type ArrayType = (string | number)[];
type Direction = 'asc' | 'desc';

const sort = (arr: ArrayType, dir: Direction) => {
  const length = arr.length;

  for (let curr = 1; curr < length; curr++) {
    const value = arr[curr];
    let prev = curr - 1;

    if (dir === 'asc') {
      while (prev >= 0 && arr[prev] > value) {
        arr[prev + 1] = arr[prev];
        prev--;
      }
    } else {
      while (prev >= 0 && arr[prev] < value) {
        arr[prev + 1] = arr[prev];
        prev--;
      }
    }

    arr[prev + 1] = value;
  }

  return arr;
};

const ascArr = sort(arr, 'asc');
const descArr = sort(arr2, 'desc');
const ascArrString = sort(arr3, 'asc');
const descArrString = sort(arr4, 'desc');

console.log(ascArr, 'asc');
console.log(descArr, 'desc');
console.log(ascArrString, 'asc');
console.log(descArrString, 'desc');
