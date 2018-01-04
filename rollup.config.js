import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve' // 外部加载的文件
import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'
import server from 'rollup-plugin-server'
import vue from 'rollup-plugin-vue2'
import buble from 'rollup-plugin-buble'
import replace from 'rollup-plugin-replace'
import image from 'rollup-plugin-image'
// import cleanup from 'rollup-plugin-cleanup'
import postcss from 'rollup-plugin-postcss';

// 新增 postcss plugins
import simplevars from 'postcss-simple-vars';
import nested from 'postcss-nested';
import cssnext from 'postcss-cssnext';
import cssnano from 'cssnano';

export default {
	entry: 'src/main.js',
	format:'es',
	dest: 'dist/bundle.js',
	sourceMap: true,
	plugins: [
		// cleanup(),
		vue({
			compileTemplate: true
		}),
		image(),
		postcss({
			extensions:['.css'],
			plugins: [
				simplevars(),
		        nested(),
		        cssnext({ warnForDuplicates: false, }),
		        cssnano()
			]
		}),
		buble(),
		resolve({
			customResolveOption:{
				moduleDirectory: 'node_module'
			}
		}),
		babel({
			exclude: 'node_module/**'
		}),
		json(),
		replace({
			'process.env.NODE_ENV' : JSON.stringify('development')
		}),
		(process.env.NODE_ENV === 'production' && uglify()),
		server({
			open: true, // 是否打开浏览器
		    contentBase: './', // 入口html的文件位置
		    historyApiFallback: true, // Set to true to return index.html instead of 404
		    host: 'localhost',
		    port: 10001
		})
	]
}