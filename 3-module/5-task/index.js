function getMinMax(str) {
  // ваш код...
	let arr = str.split(' ')
		.filter(n => isFinite(n))
		.sort((a, b) => a - b)
	return {
		min: +arr[0],
		max: +arr[arr.length - 1]
	}
}
