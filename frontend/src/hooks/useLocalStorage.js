import React, { useEffect, useState } from 'react';

// const PREFIX = 'darkapp-'

export default function useLocalStorage(key, initialValue) {
	const prefixedKey = key;
	const [value, setValue] = useState(() => {
		const jsonValue = localStorage.getItem(prefixedKey);
		if(jsonValue !== null) return jsonValue;
		if(typeof initialValue === 'function') return initialValue();
		else return initialValue; 
	});

	useEffect(() => {
		localStorage.setItem(prefixedKey, JSON.stringify(value))
	}, [prefixedKey, value]);

	return [value, setValue];
}
