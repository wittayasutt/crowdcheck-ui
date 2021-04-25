const path = require('path');
require('dotenv').config();

module.exports = {
	env: {
		ENVIRONMENT: process.env.NODE_ENV,
		PORT: process.env.PORT,
		MONGO_URI: process.env.MONGO_URI,
		SECRET: process.env.SECRET,
		JWT_LIFE_TIME_MINUTE: process.env.JWT_LIFE_TIME_MINUTE,
		GCS_BUCKET: process.env.GCS_BUCKET,
		GCLOUD_PROJECT: process.env.GCLOUD_PROJECT,
		GCS_KEYFILE: process.env.GCS_KEYFILE,
		SUGGESTION_DISTANCE_M: process.env.SUGGESTION_DISTANCE_M,
		API_BASE_URL: process.env.API_BASE_URL,
	},

	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},

	i18n: {
		locales: ['en', 'th'],
		defaultLocale: 'th',
	},
};
