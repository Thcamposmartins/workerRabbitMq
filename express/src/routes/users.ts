import express from 'express';
const router = express.Router();

router.get('/', (req, res) =>{
    res.send('respond express user');
});

export default router;