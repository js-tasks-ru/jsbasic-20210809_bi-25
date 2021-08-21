function showSalary(users, age) {
  // ваш код...
	let arr = users
		.filter(n => n.age <= age)
		.map(n => `${n.name}, ${n.balance}`)
		.join('\n');
	return arr
}
