var f1n = document.getElementById('f1n');
var f1d = document.getElementById('f1d');
var f2n = document.getElementById('f2n');
var f2d = document.getElementById('f2d');

/**
 * 发送一个通知
 * @param {String} message 要发送的通知
 */
function sendNotification(message) {
  var notification = document.querySelector('.mdl-js-snackbar');
  notification.MaterialSnackbar.showSnackbar(
    {
      message: message
    }
  );
}

/**
 * 进行运算
 * @param {Number} algorithm 运算法则：1 为加，2 为减，3 为乘，4 为除
 */
function calc(algorithm) {
  var result;
  switch (algorithm) {
    case 1:
      result = addition({ numerator: f1n.value, denominator: f1d.value }, { numerator: f2n.value, denominator: f2d.value });
      break;
    case 2:
      result = subaddition({ numerator: f1n.value, denominator: f1d.value }, { numerator: f2n.value, denominator: f2d.value });
      break;
    case 3:
      result = multiplication({ numerator: f1n.value, denominator: f1d.value }, { numerator: f2n.value, denominator: f2d.value });
      break;
    case 4:
      result = division({ numerator: f1n.value, denominator: f1d.value }, { numerator: f2n.value, denominator: f2d.value });
      break;
  }
  if (result.denominator == 0) {
    sendNotification('结果无意义');
  } else if (result.numerator == 0) {
    sendNotification('结果为 0');
  } else if (result.numerator == result.denominator) {
    sendNotification('结果为 1');
  } else if (result.denominator == 1) {
    sendNotification('结果为 ' + result.numerator);
  } else {
    sendNotification('结果为 ' + result.denominator + ' 分之 ' + result.numerator);
  }
}