function factorial(n) {
	let result = 1 , i = n ;
	for (; i > 1; i--) {
		result = result * i;
	}
	return result;
}
