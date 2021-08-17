function isEmpty(obj) {
  // ваш код...
	for (let p in obj)
		return false
	return true
}
