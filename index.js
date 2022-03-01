const express = require('express');
const app = express();
const serv = require('http').createServer(app);

const fetch = require('node-fetch');
const sdk = require('api')('@opensea/v1.0#p10gwr4l02q167c');



const mongoose = require('mongoose');
const URI = "mongodb+srv://Neeraj-Dev:d3qL4zaKfk9p3xPR@cluster0.nudjq.mongodb.net/TestDB?retryWrites=true&w=majority"

const TestDBschema = require('./testDBschema')



app.get('/', (req, res) =>
{
    //res.sendFile(__dirname + '/index.html');
});



app.use(express.static(__dirname + '/public'));

serv.listen(process.env.PORT || 3000, async()=>{
    console.log("server running");
    try{
        await mongoose.connect(
            URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true },
            function(err){
                if (err){
                    console.log(err)
                    return
                }
                console.log("db connected");
                //addData();
                test();
            });
    }
    catch(e){
        console.log(e);
    }
}); 

async function addData()
{
    let nft_data = {};
    nft_data.name = "testNFTName";
    nft_data.icon_link = "test icon link"
    let userModel = new TestDBschema(nft_data);
    await userModel.save();
}

function test()
{
//     var test = "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb";
//     fetch(`https://api.opensea.io/api/v1/asset/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/1/?include_orders=true`)
//     .then(res => console.log(res))//res.json())
//   .then(data => console.log(data));


sdk['retrieving-a-single-asset']({
    include_orders: 'true',
    asset_contract_address: '0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb',
    token_id: '1'
  })
    .then(res => console.log(res))
    .catch(err => console.error(err));
}