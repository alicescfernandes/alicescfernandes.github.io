import { sassPlugin } from 'esbuild-sass-plugin';

import * as esbuild from 'esbuild';

(async () => {
	await esbuild.build({
		entryPoints: ['src/scss/style.scss', 'src/js/main.js'],
		bundle: true,
		write: true,
		minify: true,
		outdir: 'public',
		sourcemap: true,
		plugins: [
			sassPlugin({
				filter: /\.scss$/,
			}),
		],
	});
})();
