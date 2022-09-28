const boxes = ["make", "me", "big"]


function checkValue(array) {
  for (i = 0; i < array.length; i++) {
    if (array[i] === "big") {
      console.log(array[i], i)
    }
  }
}

checkValue(boxes)

// const boxes = [1,2,3,4,5]

// function logPairs(array){
//   for (i=0; i < array.length; i++){
//     for (let idx = 0; idx < array.length; idx++) {
//       console.log([array[i], array[idx]])
//     }
//   }
// }

// logPairs(boxes)