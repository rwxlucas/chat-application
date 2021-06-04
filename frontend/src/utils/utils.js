const readFileAsync = (file) => {
	return new Promise((resolve, reject) => {
		if(!file) return;
		let reader = new FileReader();
		reader.onload = () => {
			resolve(reader.result);
		};
		reader.onerror = reject;
		reader.readAsDataURL(file);
	})
}

export const processFile = async (file) => { return await readFileAsync(file) }