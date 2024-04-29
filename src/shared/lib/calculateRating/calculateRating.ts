export const calculateRating = (
	multiplier: number,
	tracksRating: number,
	atmosphereRating: number,
	bitsRating: number,
	textRating: number
) => {
	return Math.floor(+tracksRating * multiplier * 2 + +atmosphereRating * multiplier + +bitsRating + +textRating);
};
