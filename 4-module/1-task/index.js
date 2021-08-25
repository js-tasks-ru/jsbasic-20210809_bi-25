function makeFriendsList(friends) {
  // ваш код...
	let UL = document.createElement('ul')
	for (let it of friends) {
		let LI = document.createElement('li')
		LI.textContent = `${it.firstName} ${it.lastName}`;
		UL.append(LI)
	}
	return UL
}
