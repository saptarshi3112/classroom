module.exports.detectSimilarity = (firstString, secondString) => {
	return new Promise((resolve, reject) => {

    let firstString1 = firstString;
    let secondString2 = secondString;

    let size_a = firstString1.length;
    let size_b = secondString2.length;

		let lcsMatrix = Array(secondString2.length+1).fill(0).map(() => Array(firstString1.length+1).fill(0));

		console.log(lcsMatrix);

		resolve(null);

  });
}
