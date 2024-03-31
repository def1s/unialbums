declare module '*.scss' { // декларация для css modules на импорт
	type IClassNames = Record<string, string>
	const classNames: IClassNames;
	export = classNames
}

declare const __IS_DEV__: boolean;

declare module '*.svg' {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.gif';
