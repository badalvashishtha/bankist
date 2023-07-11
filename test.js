function sum(a, b, ...nums) {
  let val = a + b;
  nums.forEach(num => { val += num });
  return val
}

function max(...nums) {
  let val = -Infinity;
  nums.forEach(num => {
    if (num > val) {
      val = num;
    }
  });
  return val
}

console.log(sum(1, 2, 3, 4, 5, -6))

