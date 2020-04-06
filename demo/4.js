let obj = { name: "sss", age: "dddd", fe: [1, 2, 3, 4] };

function getName(obj) {
  var ojb1 = obj;
  ojb1.name = "11111";
  console.log(ojb1);
}
console.log(obj);
getName(obj);
console.log(obj);

var quickSort = function (arr) {
  if (arr.length <= 1) {
    return arr;
  }

  var pivotIndex = Math.floor(arr.length / 2);

  var pivot = arr.splice(pivotIndex, 1)[0];

  var left = [];

  var right = [];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
};

let arr = [13, 2, 343, 534545, 54, 14, 5, 6, 89, 23432, 67565743, 4543534];

console.log(quickSort(arr));
