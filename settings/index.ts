export default {
    appName: 'DriverCrawler',
    serviceId: 'drive_crawler',
    serviceToken: process.env.SERVICE_TOKEN || 'tE3v56Ru83',
    port: process.env.PORT || 3050,
    backdoor_secret: 'M@dCreativesAPIBackdoor75',
    drivePath: process.env.DRIVE_PATH || 'G:/Drive partagés',
    mongoUri: process.env.MONGO_URL || 'mongodb://localhost:27017/',
    mongoDbName: process.env.dbName || 'creatives',
    mongoCollectionName: process.env.collectionName || 'creatives',
    services: {
      squirtle_squad_api: {
        url:
          process.env.SQUIRTLE_SQUAD_API_URL ||
          'https://squirtle-squad-api.madbox.io',
      },
      monitoring: {
        active: process.env.MONITORING_ACTIVE === 'false' ? false : true,
        url:
          process.env.MONITORING_API_URL || 'https://monitoring-socket.madbox.io',
      },
    },
  };
  