import { sassPlugin } from 'esbuild-sass-plugin';

import * as esbuild from 'esbuild';

(async () => {
	await esbuild.build({
		entryPoints: ['src/scss/style.scss'],
		bundle: true,
		write: true,
		minify: true,
		outdir: 'css',
		plugins: [
			sassPlugin({
				filter: /\.scss$/,
			}),
		],
	});
})();
