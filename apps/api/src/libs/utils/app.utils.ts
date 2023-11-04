import otelSDK from '../../instrumentation';
import { INestApplication, Logger } from '@nestjs/common';

export const AppUtils = {
  gracefulShutdown(app: INestApplication, code: string) {
    setTimeout(() => process.exit(1), 5000);
    Logger.verbose(`Signal received with code ${code} ⚡.`);
    Logger.log('❗Closing http server with grace.');
    app
      .close()
      .then(() => {
        Logger.log('✅ Http server closed.');
        process.exit(0);
      })
      .catch((error) => {
        Logger.error(`❌ Http server closed with error: ${error}`);
        process.exit(1);
      });
  },

  processAppWithGrace(app: INestApplication) {
    process.on('SIGINT', () => {
      AppUtils.gracefulShutdown(app, 'SIGINT');
    });

    process.on('SIGTERM', () => {
      otelSDK
        .shutdown()
        .then(
          () => Logger.log('✈️ SDK shut down successfully'),
          (err) => Logger.log('⛔ Error shutting down SDK', err)
        )
        .finally(() => process.exit(0));
    });
  },
};
