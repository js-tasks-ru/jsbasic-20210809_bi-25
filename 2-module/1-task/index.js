function sumSalary(salaries) {
  // ваш код...
	let sum = 0;
	for (let key in salaries) {
		if (salaries[key] < Infinity && salaries[key] > -Infinity)
			sum += salaries[key]
	}
	return sum
}
