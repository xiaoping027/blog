// 实现一个算法，来完成字符串相加，比如 "111" + ”2222“ = ”2333“。(高精度算法)

function add(a, b) {
  let sa = a.split("");
  let sb = b.split("");

  if (sb.length > sa.length) {
    [sa, sb] = [sb, sa];
  }
  while (sa.length !== sb.length) {
    sb.unshift("0");
  }
  let res = [];
  let carry = 0;
  for (let i = sa.length - 1; i > -1; i--) {
    let sum = parseInt(sa[i]) + parseInt(sb[i]) + carry;
    carry = sum > 9 ? 1 : 0;
    res.unshift(sum % 10);
  }
  if (carry) {
    res.unshift(carry);
  }
  return;
}
