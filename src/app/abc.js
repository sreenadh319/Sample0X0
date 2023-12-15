function doesItContainsSequence(pwd){
	let z = Array.from(pwd.toUpperCase());
	let isSequence = false;
	for(let i=0;i<=z.length-3;i++)
	{ 
		let char1 =z[i].charCodeAt(0);
		let char2 =z[i+1].charCodeAt(0);
		let char3 =z[i+2].charCodeAt(0);
		if(char1 == char2-1 && char2 == char3-1)
		{isSequence = true; break;}
		if(i>1000){
			break;
		}
	}
	return isSequence;
}
