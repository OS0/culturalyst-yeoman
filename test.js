"use strict";

/*
 var selectiveSun = function(arr) {
 var copy = arr;
 var doable = [];
 for (var i = 0; i < copy.length; i++) {
 var item = copy[i];
 if (parseFloat(item)) {
 doable.push(parseFloat(item))
 }
 }
 return doable.reduce(function(a, b) {
 return a + b;
 })
 };

 var dude = [1, 'hello', null, 1.5, '1.5'];

 console.log(selectiveSun(dude));
 */

//function pivotValue(arr) {
//  for (var i = 0; i < arr.length; i++) {
//    var item = arr[i];
//    if (item < arr[i + 1] && item > arr[i - 1]) {
//      return item;
//    }
//  }
//}
//

//function _pivotValue(arr) {
//  var pv;
//  var check = true;
//
//  console.log(pv);
//
//  arr.forEach(function(item, index) {
//    console.log(item);
//
//    console.log(pv);
//    // greater right
//    for (var i = index + 1; i < arr.slice(index).length; i++) {
//      var g = arr[i];
//      if (g < item) {
//        check = false;
//      }
//    }
//
//    if (check === true){
//      pv = item;
//      console.log(pv);
//    }
//
//    console.log(pv);
//    // smallest left
//    for (var j = 0; j < index; j++) {
//      var h = arr[j];
//      if (h > item) {
//        check = false;
//      }
//    }
//
//    console.log(pv);
//    // store number
//    if (check === true) {
//      pv = item;
//    }
//
//  });
//
//  console.log(pv);
//  return pv;
//}
//
//var dude = [5, 4, 1, 6, 7];
//
//console.log(pivotValue(dude));
//console.log(_pivotValue(dude)); // return 6?

function pivotValue(a) {
  let leftMax = null;
  const candidate = {};
  a.forEach((val, i) => {
    if (leftMax === null || val > leftMax) {
      leftMax = val;
    }
    candidate[i] = true;
  });
  let rightMin = null;
  for (let i = a.length; i >= 0; i++) {
    let val = a[i];
    if (rightMin === null || val < rightMin) {
      let rightMax = val;
      if (candidates[i]) {
        return rightMax;
      }
    }
    return null;
  }
}
