declare module '*.scss' { // декларация для css modules на импорт
	type IClassNames = Record<string, string>
	const classNames: IClassNames;
	export = classNames
}

declare const __IS_DEV__: boolean;
declare const __API_URL__: string;
declare const __MINIO_URL__: string;

declare module '*.svg' {
	const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
	export default content;
}

declare module '*.png';
declare module '*.jpeg';
declare module '*.jpg';
declare module '*.gif';

type DeepPartial<T> = T extends object ? {
	[P in keyof T]?: DeepPartial<T[P]>;
} : T;
