export type BuildMode = 'development' | 'production';

export interface BuildPaths {
	entry: string;
	build: string;
	html: string;
	src: string;
}

export interface BuildEnv {
	port: number;
	mode: BuildMode;
	apiUrl: string;
	minioUrl: string;
}

export interface BuildOptions {
	mode: BuildMode;
	paths: BuildPaths;
	port: number;
	isDev: boolean;
	apiUrl: string;
	minioUrl: string;
}
