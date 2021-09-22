// const button = document.querySelector('button');
// button.addEventListener('click', (event) => {
//     const input = document.querySelector('.go');
//     input.style.left='400px';
//     input.style.background = "#123"
// })

function makeEaseOut (timing) {
  return function (timeFraction) {
    return 1 - timing(1 - timeFraction)
  }
}

function bounce (timeFraction) {
  for (let a = 0, b = 1, result; 1; a += b, b /= 2) {
    if (timeFraction >= (7 - 4 * a) / 11) {
      return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
    }
  }
}

let bounceEaseOut = makeEaseOut(bounce)

gooo.onclick = function () {
  animate({
    duration: 2000,
    timing: bounceEaseOut,
    draw: function (progress) {
      inpt.style.left = progress * 500 + 'px'
    }
  })
}
