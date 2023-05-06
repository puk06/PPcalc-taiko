function OdScaled(od, mods)  {
	if (mods.includes("EZ")) {
		od /= 2;
	}
	if (mods.includes("HR")) {
		od *= 1.4;
	}
	od = Math.max(Math.min(od, 10), 0);
	return od;
}

function hitWindow(od, mods){
	od = OdScaled(od, mods);
	let hitWindow = 35;

	if (od < 5) {
		hitWindow += ((20 - 35) * (od - 5)) / 5;
	} else {
		hitWindow -= ((35 - 50) * (5 - od)) / 5;
	}
	if (mods.includes("DT") || mods.includes("NC")) {
		hitWindow /= 1.5;
	} else if (mods.includes("HT")) {
		hitWindow /= 0.75;
	}
	return Math.round(hitWindow * 100) / 100;
}


module.exports.ppcalc = (sr, maxcombo, od, misses, acc, mods) =>{
	const effectiveMissCount =
		Math.max(1.0, 1000.0 / (maxcombo - misses)) * misses;
	let strainValue =
		Math.pow(5 * Math.max(1.0, sr / 0.115) - 4.0, 2.25) / 1150.0;

	const OD300 = hitWindow(od, mods);
	const accLengthBonus = Math.min(1.15, Math.pow(maxcombo / 1500.0, 0.3));
	const strainLengthBonus = 1 + 0.1 * Math.min(1.0, maxcombo / 1500.0);

	strainValue *= strainLengthBonus;
	strainValue *= Math.pow(0.986, effectiveMissCount);
	strainValue *= Math.pow(acc / 100, 2.0);

	let accValue = Math.pow(60.0 / OD300, 1.1) * Math.pow(acc / 100, 8.0) * Math.pow(sr, 0.4) * 27.0;
	accValue *= Math.min(Math.pow(maxcombo / 1500, 0.3), 1.15);
	if (mods.includes("HD") && mods.includes("FL")) {
		accValue *= Math.max(1.05, 1.075 * accLengthBonus);
	}

	let globalMultiplier = 1.13;
	if (mods.includes("HD")) {
		globalMultiplier *= 1.075;
		strainValue *= 1.025;
	}
	if (mods.includes("EZ")) {
		globalMultiplier *= 0.975;
		strainValue *= 0.985;
	}
	if (mods.includes("FL")) {
		strainValue *= 1.05 * strainLengthBonus;
	}
	if (mods.includes("HR")) {
		strainValue *= 1.05;
	}

	let totalValue = Math.pow(Math.pow(strainValue, 1.1) + Math.pow(accValue, 1.1),1.0 / 1.1) * globalMultiplier;

	return parseFloat(totalValue.toFixed(2));
}
module.exports.calcAccuracy = (good, ok, miss) =>{
	const accuracy =
		((parseInt(good) + parseInt(ok) * 0.5) /
			(parseInt(good) + parseInt(ok) + parseInt(miss))) *
		100;
	return parseFloat(accuracy.toFixed(2));
}
