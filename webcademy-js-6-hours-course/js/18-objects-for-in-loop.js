// ================= 10. Объекты обход циклом for in (не путать с for of) ================
// В отличие от for ... of  - for .. in может обходить неитерируемые объекты и возвращает ключи.

for (let key in person) {
	console.log(key, ':', person[key]);
}