import express from 'express';
import RabbitmqServer from '../rabbitmq-server';
const router = express.Router();

router.post('/express', async function (req, res){
    const server = new RabbitmqServer('amqp://admin:admin@rabbitmq:5672');
    await server.start();
    await server.publishInQueue('nest', JSON.stringify(req.body));
    await server.publishInExchange('amq.direct', 'rota', JSON.stringify(req.body));
    res.send(req.body);
});

router.get('/consumer', async (req, res) =>{
    const server = new RabbitmqServer('amqp://admin:admin@rabbitmq:5672');
    await server.start();
    await server.consume('nest', (message)=> res.send(message.content.toString()));
})

export default router;