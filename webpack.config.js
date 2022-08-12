const path = require('path');
const pkg = require('./package.json');
const { DefinePlugin } = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const meta = require('./meta.json');
const constants = require('./constants.json');

const modifyWebManifest = (buffer) => {
    let manifest = JSON.parse(buffer.toString());
    manifest['version'] = pkg.version;
    manifest['name'] = meta.name;
    manifest['short_name'] = meta.short_name;
    manifest['author'] = meta.author;
    manifest['theme_color'] = meta.color;
    manifest['background_color'] = meta.background;

    return JSON.stringify(manifest, null, 2);
};
const modifyEnv = (buffer, env) => {
    const envFile = JSON.parse(buffer.toString());
    envFile.version = pkg.version;
    envFile['environment'] = env;
    envFile['timestamp'] = Math.round(new Date().getTime()/1000);
    envFile['debug'] = env !== 'prod';
    envFile['_meta'] = meta;
    envFile['_constants'] = constants;

    return JSON.stringify(envFile, null, 2);
};

const conf = {
    source: constants.ENV.src.folder,
    target: {
        development: constants.ENV.dev.folder,
        test: constants.ENV.test.folder,
        production: constants.ENV.prod.folder,
    },
    assets: {
        composer: '**/vendor/*',
        php: '**/*.php',
        txt: '**/*.txt',
        htaccess: '**/.htaccess',
        manifestJson: `${constants.APP.web.folder}/www/manifest.json`,
    },
    config: {
        env: `${constants.APP.config}/env.json`,
        global: `${constants.APP.config}/global.json`,
        environmental: `${constants.APP.config}/environmental.json`,
        locales: `${constants.APP.config}/locales.json`,
        options: `${constants.APP.config}/options.json`,
    },
    entries: {
        admin: `${constants.APP.admin.folder}/${constants.APP.admin.scripts}/index`,
        web: `${constants.APP.web.folder}/${constants.APP.web.scripts}/index`,
    },
    styles: {
        web: `${constants.APP.web.folder}/${constants.APP.web.styles}/index`,
    },
};
const stylesExtensions = [
	'.scss',
	'.css',
];
const extensions = [
	'.js',
    '.jpg',
    '.jpeg',
    '.svg',
    '.png',
    '.gif',
    '.webp',
    '.json',
];

module.exports = (env) => {
    const mode = env.env === constants.ENV.test.key ? constants.ENV.prod.key : env.env;
    const destination = conf.target[env.env];
    const moduleBase = {
        mode,
        watch: env.watch,
        watchOptions: {
            ignored: '/node_modules/',
            stdin: true,
        },
        context: path.join(__dirname, conf.source),
        devtool: 'inline-source-map',
        optimization: {
            minimize: env.env === constants.ENV.dev.key,
        },
        stats: 'minimal',
		performance: {
			hints: false,
		},
    };
    const resolveModules = [ path.join(__dirname, 'node_modules') ];
    const configTarget = `../${destination}/${constants.APP.config}`;
	const extraBundleEnv = {
		BUNDLE_ENVIRONMENT: JSON.stringify(mode),
		BUNDLE_DEBUG: env.env === constants.ENV.dev.key,
	};

    return [
			{
				/* React (admin) */
				...moduleBase,
				mode: 'production', // Temporary fix for loose-envify error message in console, keep mode in production, but mode constant keep as it is
				entry: `./${conf.entries.admin}.tsx`,
				plugins: [
					new CopyWebpackPlugin({
						patterns: [
							{ from: conf.assets.composer },
							{ from: conf.assets.php },
							{ from: conf.assets.txt },
							{ from: conf.assets.htaccess },
							{
								from: conf.config.global,
								to: configTarget,
							},
							{
								from: conf.config.locales,
								to: configTarget,
							},
							{
								from: conf.config.options,
								to: configTarget,
							},
							{
								from: conf.config.environmental,
								to: configTarget,
							},
							{
								from: conf.config.env,
								to: configTarget,
								transform(content) {
									return modifyEnv(content, env.env);
								},
							},
							{
								from: conf.assets.manifestJson,
								to: `../${destination}/${constants.APP.web.folder}/www`,
								transform(content) {
									return modifyWebManifest(content);
								},
							}
						],
					}),
					new NodePolyfillPlugin(),
					new CleanWebpackPlugin({
						/*
						Cleaning emitted webpack files in root destination folder
						*/
						dry: false,
						dangerouslyAllowCleanPatternsOutsideProject: true,
						cleanOnceBeforeBuildPatterns: [],
						cleanAfterEveryBuildPatterns: [
							`../${destination}/main.js`,
							`../${destination}/main.js.LICENSE.txt`,
						],
					}),
					new DefinePlugin({
						'process.env': extraBundleEnv
					}),
				],
				output: {
					path: path.resolve(__dirname, destination),
					filename: `${conf.entries.admin}.js`,
				},
				resolve: {
					extensions: [
						...extensions,
						...stylesExtensions,
						'.ts',
						'.tsx',
						'.jsx',
					],
					modules: resolveModules,
				},
				module: {
					rules: [
						{
							test: /\.(js|jsx|ts|tsx)?$/,
							use: 'ts-loader',
							exclude: /node_modules/,
						},
						{
							test: /\.(jp(e*)g|svg|png|gif|webp)$/,
							use: 'url-loader',
						},
						{
							test: /\.(sa|sc|c)ss$/,
							use: ['style-loader', 'css-loader', 'sass-loader'],
						},
					],
				},
			},
			{
				/* Vue (web) */
				...moduleBase,
				entry: `./${conf.entries.web}.js`,
				plugins: [
					new DefinePlugin({
						__VUE_OPTIONS_API__: true,
						__VUE_PROD_DEVTOOLS__: env.env === constants.ENV.dev.key,
					}),
					new VueLoaderPlugin(),
					new DefinePlugin({
						'process.env': extraBundleEnv
					}),
				],
				output: {
					path: path.resolve(__dirname, destination),
					filename: `${conf.entries.web}.js`,
				},
				resolve: {
					extensions: [...extensions, ...stylesExtensions, '.vue'],
					modules: resolveModules,
					alias: {
						vue: 'vue/dist/vue.esm-bundler.js',
					},
				},
				module: {
					rules: [
						{
							test: /\.(jp(e*)g|svg|png|gif|webp)$/,
							use: 'url-loader',
						},
						{
							test: /\.vue$/,
							loader: 'vue-loader',
						},
						{
							test: /\.(sa|sc|c)ss$/,
							use: [
								'vue-style-loader',
								'style-loader',
								'css-loader',
								'sass-loader',
							],
						},
						{
							test: /\.js$/,
							loader: 'babel-loader',
							exclude: /node_modules/,
						},
					],
				},
			},
			{
				/* SCSS (web) */
				...moduleBase,
				entry: `./${conf.styles.web}.scss`,
				plugins: [
					new MiniCssExtractPlugin({
						filename: `${conf.styles.web}.css`,
					}),
				],
				output: {
					path: path.resolve(__dirname, destination),
					// filename: `${conf.styles.web}.css`,
				},
				resolve: {
					extensions: stylesExtensions,
					modules: resolveModules,
				},
				module: {
					rules: [
						{
							test: /\.(sa|sc|c)ss$/,
							use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
						},
					],
				},
			},
		];
};
