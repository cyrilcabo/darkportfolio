const path = require('path');

module.exports = {	
	webpack: (config, options) => {
	    config.module.rules.push({
	      test: /\.(png|jpe?g|gif)$/i,
	      use: [
	        options.defaultLoaders.babel,
	        {
	          loader: 'file-loader',
	          options: {
	          	publicPath: (url, resource, context) => {
	          		const relative = path.relative(context, resource);
	          		return `${relative}`;
	          	},
	          	name: '[path][name].[ext]',
	          },
	        },
	      ],
	    });
	    return config;
	}	
}