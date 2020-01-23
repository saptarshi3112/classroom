const getMinimum = (x, y, z) => {
  if (x <= y && x <= z) 
    return x; 
  if (y <= x && y <= z) 
      return y; 
  else
    return z; 
};

const getMin = (x, y) => {
  if (x <= y) {
    return x;
  } else {
    return y;
  }
}

const getMax = (x, y) => {
  if (x >= y) {
    return x;
  } else {
    return y;
  }
}

const editDistance = (str1, str2, n1, n2) => {
  if (n1 === 0) {
    return n2;
  } if (n2 === 0) {
    return n1;
  } if (str1.charAt[n1-1] === str2.charAt[n2-1]) {
    return editDistance(str1, str2, n1-1, n2-1);
  } else {
    return getMinimum(editDistance(str1, str2, n1-1, n2), editDistance(str1, str2, n1, n2-1), editDistance(str1, str2, n1-1, n2-1));
  }
}

const fillMatrix = (size_a, size_b) => {

  let lcsMatrix = Array(size_a+1).fill(0).map(() => Array(size_b+1).fill(0));

  for (let i = 0; i <= size_a.length; i++) {
    lcsMatrix[i][0] = i;
  }

  for (let j = 0; j <= size_b.length; j++) {
    lcsMatrix[0][j] = j;
  }

  return lcsMatrix;
}

module.exports.detectSimilarity = (firstString, secondString) => {
	return new Promise((resolve, reject) => {

    let size_a = firstString.length, size_b = secondString.length;
    let lcsMatrix = fillMatrix(size_a, size_b);
    
    for (let i = 1; i <= size_a; i++) {
      for (let j = 1; j <= size_b; j++) {
        if (i === 0) {
          lcsMatrix[i][j] = j;
        } else if (j === 0) {
          lcsMatrix[i][j] = i;
        } else if (firstString.charAt(i-1) === secondString.charAt(j-1)) {
          lcsMatrix[i][j] = lcsMatrix[i-1][j-1];
        } else {
          lcsMatrix[i][j] = 1+getMinimum(lcsMatrix[i-1][j], lcsMatrix[i][j-1], lcsMatrix[i-1][j-1]);
        }
      }
    }

    let difference = lcsMatrix[size_a][size_b];
    let comp = getMax(size_b, size_a);

    let val = 1-(difference/comp);

		resolve(Math.floor(val*100));

  });
}
