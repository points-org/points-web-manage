const {
	defineConfig
} = require('@vue/cli-service')
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, '.', dir)
}
module.exports = defineConfig({
	transpileDependencies: true,
	publicPath: './',
	assetsDir: 'public',
	productionSourceMap: false,
	lintOnSave: false,
	css: {
		loaderOptions: {
			// sass: {
			//   prependData: '@import "src/style/variable.scss";'
			// },
			// postcss: {
			//   plugins: [
			//     // 补全css前缀(解决兼容性)
			//     require('autoprefixer')(),
			//     // 把px单位换算成rem单位
			//     require('postcss-pxtorem')({
			//       rootValue: 16,
			//       exclude: /node_modules/i,
			//       propList: ['*'], // 可以从px更改为rem的属性。
			//       minPixelValue: 10 // 设置要替换的最小像素值。
			//     })
			//   ]
			// }
		}
	},
	chainWebpack: config => {
		config.resolve.symlinks(true)
		config.module.rules.delete("svg"); // 重点:删除默认配置中处理svg,
		config.module
			.rule('svg-sprite-loader')
			.test(/\.svg$/)
			.include
			.add(resolve('src/assets/icons')) // 处理svg目录
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]'
			})
	}, // 热更新配置
	devServer: {
		open: true,
		// 跨域
		proxy: {
			'/api': {
				target: process.env.VUE_APP_SERVER_URL,
				changeOrigin: true,
				pathRewrite: {
					'^/api': process.env.VUE_APP_SERVER_URL
				} // 这里重写路径
			}
		}
	}

})
