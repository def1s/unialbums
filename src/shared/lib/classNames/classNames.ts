type Mods = Record<string, boolean | string | undefined>

export function classNames(
	cls: string,
	mods: Mods = {},
	additional: Array<string | undefined> = []
): string {
	return [
		cls,
		...additional.filter(Boolean),
		...Object.entries(mods)
			// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
			.filter(([_, value]) => Boolean(value))
			.map(([className]) => className),
	]
		.join(' ');
}
