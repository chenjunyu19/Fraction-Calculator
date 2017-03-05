/**
 * 取两个数的最大公因数
 * @param {Number} n1 数1
 * @param {Number} n2 数2
 */
function getMaxCommonFactor(n1, n2) {
  var tmp;
  while (n2 != 0) {
    tmp = n1 % n2;
    n1 = n2;
    n2 = tmp;
  }
  return n1;
}

/**
 * 取两个数的最小公倍数
 * @param {Number} n1 数1
 * @param {Number} n2 数2
 * @returns {Number}
 */
function getMinCommonMultiple(n1, n2) {
  var tmp = n1;
  while (tmp % n2 != 0) {
    tmp += n1;
  }
  return tmp;
}

/**
 * 判断一个分数是否有意义
 * @param {Object} f 要判断的分数
 */
function isMeaningful(f) {
  if (f.denominator != 0) {
    return true;
  } else {
    return false;
  }
}

/**
 * 将一个分数分母里的负号移动至分子
 * @param {Object} f 要处理的分数
 */
function moveMinusToNumerator(f) {
  if (f.denominator < 0) {
    f.numerator = -f.numerator;
    f.denominator = -f.denominator;
  }
  return f;
}

/**
 * 对一个分数进行约分
 * @param {Object} f 要处理的分数
 */
function reductionofAFraction(f) {
  f = moveMinusToNumerator(f);
  var maxCommonFactor = getMaxCommonFactor(Math.abs(f.numerator), Math.abs(f.denominator));
  f.numerator /= maxCommonFactor;
  f.denominator /= maxCommonFactor;
  return f;
}

/**
 * 对两个分数进行通分
 * @param {Object} f1 分数1
 * @param {Object} f2 分数2
 */
function reductionofFractionstoACommonDenominator(f1, f2) {
  var f = [];
  f1 = reductionofAFraction(f1);
  f2 = reductionofAFraction(f2);
  var minCommonMultiple = getMinCommonMultiple(Math.abs(f1.denominator), Math.abs(f2.denominator));
  f[0] = { numerator: f1.numerator, denominator: minCommonMultiple };
  f[1] = { numerator: f2.numerator, denominator: minCommonMultiple };
  f[0].denominator = f[1].denominator = minCommonMultiple;
  f[0].numerator = f[0].numerator * minCommonMultiple / f1.denominator;
  f[1].numerator = f[1].numerator * minCommonMultiple / f2.denominator;
  f[0] = moveMinusToNumerator(f[0]);
  f[1] = moveMinusToNumerator(f[1]);
  return f;
}

/**
 * 将两个分数相加
 * @param {Object} f1 分数1
 * @param {Object} f2 分数2
 */
function addition(f1, f2) {
  if (!isMeaningful(f1) || !isMeaningful(f2)) {
    return { numerator: 0, denominator: 0 };
  }
  var f = reductionofFractionstoACommonDenominator(f1, f2);
  return reductionofAFraction({ numerator: f[0].numerator + f[1].numerator, denominator: f[0].denominator });
}

/**
 * 将两个分数相减
 * @param {Object} f1 分数1
 * @param {Object} f2 分数2
 */
function subaddition(f1, f2) {
  if (!isMeaningful(f1) || !isMeaningful(f2)) {
    return { numerator: 0, denominator: 0 };
  }
  var f = reductionofFractionstoACommonDenominator(f1, f2);
  return reductionofAFraction({ numerator: f[0].numerator - f[1].numerator, denominator: f[0].denominator });
}

/**
 * 将两个分数相乘
 * @param {Object} f1 分数1
 * @param {Object} f2 分数2
 */
function multiplication(f1, f2) {
  if (!isMeaningful(f1) || !isMeaningful(f2)) {
    return { numerator: 0, denominator: 0 };
  }
  return reductionofAFraction({ numerator: f1.numerator * f2.numerator, denominator: f1.denominator * f2.denominator });
}

/**
 * 将两个分数相除
 * @param {Object} f1 分数1
 * @param {Object} f2 分数2
 */
function division(f1, f2) {
  if (!isMeaningful(f1) || !isMeaningful(f2)) {
    return { numerator: 0, denominator: 0 };
  }
  return reductionofAFraction({ numerator: f1.numerator * f2.denominator, denominator: f1.denominator * f2.numerator });
}