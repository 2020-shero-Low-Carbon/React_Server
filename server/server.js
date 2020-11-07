const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.use('/calgwp', require('./routes/calgwp'));
app.use('/map', require('./routes/map'));

app.get('/data',(req,res)=>{
    const data = {
        lastname : '',
        firstname : ''
    };
    data.lastname = 'low'
    data.firstname = 'carbon'
    res.json(data);
})
 
app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})
