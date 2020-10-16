const express = require('express');
const app = express();
const PORT = 8000;
const cors = require('cors');

app.use(cors());

app.get('/data',(req,res)=>{
    const data = {
        lastname : "dl",
        firstname : "wlrma"
    };
    res.json(data);
})
 
app.listen(PORT,()=>{
    console.log(`server running on PORT ${PORT}`);
})
