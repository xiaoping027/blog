/**
 * @param {string[]} deadends
 * @param {string} target
 * @return {number}
 */

let deadends = ["8887", "8889", "8878", "8898", "8788", "8988", "7888", "9888"],
  target = "8888";

var openLock = function(deadends, target) {
  if (target == null || target == "0000") return -1;
  let start = "0000";
  if (deadends.includes(target) || deadends.includes(start)) return -1;
  let queue = [];
  let visited = new Set(deadends);
  let step = 0;
  queue.push(start);
  visited.add(start);
  while (queue.length > 0) {
    for (let i = queue.length; i > 0; i--) {
      let cur = queue.shift();
      if (target === cur) {
        // 找到了目标返回步骤数
        return step;
      }
      // console.log(queue);
      let nexts = getNexts(cur);
      for (let str of nexts) {
        if (!deadends.includes(str) && !visited.has(str)) {
          visited.add(str);
          queue.push(str);
        }
      }
    }
    step++;
  }
  return -1;
};

function getNexts(cur) {
  let list = [];
  for (let i = 0; i < 4; i++) {
    let curArr = cur.split("");
    let modChar = Number(cur.charAt(i));
    console.log(modChar);
    curArr[i] = modChar == "0" ? "9" : modChar - 1;
    console.log(curArr[i]);
    list.push(curArr.join(""));
    curArr[i] = modChar == "9" ? "0" : modChar + 1;
    console.log(curArr[i]);
    list.push(curArr.join(""));
  }
  console.log(list);
  return list;
}
console.log(openLock(deadends, target));

var numSquares = function(n) {
  let step = 1;
  const q = [0];
  const visited = new Map();
  visited.set(0, true);
  while (q.length) {
    for (let i = q.length; i > 0; i--) {
      const cur = q.shift();
      console.log(q);
      for (let j = 1; ; j++) {
        let next = j * j + cur;
        if (next > n) break;
        if (next === n) return step;
        if (!visited.get(next)) {
          q.push(next);
          visited.set(next, true);
        }
      }
    }
    step++;
  }
};

numSquares(12);
