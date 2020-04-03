let obj = { name: "sss", age: "dddd", fe: [1, 2, 3, 4] };

function getName(obj) {
  var ojb1 = obj;
  ojb1.name = "11111";
  console.log(ojb1);
}
console.log(obj);
getName(obj);
console.log(obj);
