module.exports = {  
 // 基本路径  
	baseUrl: '',
	devServer: {
		proxy: {
			'/api': {
				target: 'http://132.232.58.25:8080/shop-app-pc/',
				// target: 'http://localhost:3000/',
				changeOrigin: true,
				ws: true,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	}
}  