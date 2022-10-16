import { CronJob } from 'cron';
import RabbitmqServer from '../rabbitmq-server';

class Consumer {
    cronJob: CronJob;

    constructor() {
      this.cronJob = new CronJob('0 * * * * *', async () => {
        try {
          await consumer();
        } catch (e) {
          console.error(e);
        }
      });
      
      // Start job
      if (!this.cronJob.running) {
        this.cronJob.start();
      }
    }

}

async function consumer() {
    const server = new RabbitmqServer('amqp://admin:admin@rabbitmq:5672');
    await server.start();
    await server.consume('nest', (message)=> console.log(message.content.toString()));
}
export default Consumer;