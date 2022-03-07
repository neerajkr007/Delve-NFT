const express = require('express');
 const app = express();
 const serv = require('http').createServer(app);
 const serv2 = require('https').createServer(app);
 const mongoose = require('mongoose');
const TestDBschema = require('./testDBschema');

const URI = "mongodb+srv://Neeraj-Dev:d3qL4zaKfk9p3xPR@cluster0.nudjq.mongodb.net/TestDB?retryWrites=true&w=majority"
var collection;
var hostName;

// var DoubleMetaphone = require('doublemetaphone'),
// encoder = new DoubleMetaphone();
// console.log(encoder.doubleMetaphone('gnu'));

// gapi stuff
const { google } = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: "./credentials.json",
    scopes: [
        "https://www.googleapis.com/auth/spreadsheets",
        "https://www.googleapis.com/auth/drive"]
})
const sheetName = "Old Data"
var googleClient
var googleSheets
var googleDrive
var sheetData
var driveFile
const spreadsheetId = "1AjoAOj6KtmvIaVElSh0aRmI-78VSNOKs9GS8CWlhGfs"

async function setUpGoogle()
{
    googleClient = await auth.getClient()

    googleSheets = google.sheets({version : "v4", auth: googleClient})
    googleDrive = google.drive({version:"v3", auth: googleClient})

    var reqParam = 
    {
        'id': "file9",
        'type': "web_hook",
        'address': `https://${hostName}/driveValueChanged`,
    }
    googleDrive.files.watch({fileId:spreadsheetId, requestBody:reqParam}, (err, response) => {
        if (err) {
          console.log(`Drive API returned ${err}`)
        }
        else
        {
            testCallback()
            console.log("watching for changes on file " + spreadsheetId + " at " + reqParam.address);
        }
      })
    


    function testCallback()
    {
        console.log("drive file updated")
    }
    // googleDrive.files.list({
    //         pageSize: 10,
    //         fields: 'nextPageToken, files(id, name, kind, properties)',
    //     }, async (err, res) => {
    //     if (err) return console.log('The API returned an error: ' + err);
    //     //console.log(res)
    //     const files = res.data.files;
    //     if (files.length) 
    //     {
    //       files.forEach(file => {
    //           if(file.id == spreadsheetId)
    //           {
    //               driveFile = file
    //               console.log(driveFile)
    //           }
    //       });
    //     } 
    //     else 
    //     {
    //       console.log('No files found.');
    //     }
    //   });


    //get sheets
    // const getRows = await googleSheets.spreadsheets.values.get({
    //     auth,
    //     spreadsheetId,
    //     range: sheetName
    // })
    // sheetData = getRows.data.values
    // console.log(sheetData)

    console.log("sheets api ready ")

    //writeFromGSheet()
}

setUpGoogle()


async function writeFromGSheet()
{
    await googleSheets.spreadsheets.values.append({
        auth,
        spreadsheetId,
        range: sheetName,
        valueInputOption: "USER_ENTERED",
        resource: {
                values:
                [
                    ["test", "test", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA", "NA"]
                ]
        }
    });
}
// gapi stuff over


app.get('/', (req, res) =>
{
    hostName = req.headers.host;
    console.log(hostName);
    res.sendFile(__dirname + '/home.html');
});

app.post('/driveValueChanged', (req, res)=>{
    console.log("files changed");
    console.log(req.rawHeaders);
});

app.get('/search', async (req, res) =>
{
    try
    {
        let result = await collection.aggregate([
            {
                "$search":{
                    "autocomplete":{
                        "query":`${req.query.term}`,
                        "path":"name",
                        "fuzzy":{
                            "maxEdits": 1,
                            "prefixLength": 1,
                        }
                    }
                }
            }
        ]).toArray();
        res.send(result);
    }
    catch(e)
    {
        console.log(e);
    }
})

app.get('/test', (req, res) =>
{
    console.log("test");
});

app.use(express.static(__dirname + '/public'));

serv.listen(process.env.PORT || 3000, async()=>{
    console.log("server running at ");
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
                collection = mongoose.connection.collections["nft_data"];
                //console.log(collection.aggregate);
                //addData();
                //test();
            });
    }
    catch(e){
        console.log(e);
    }
}); 


async function addData(DataArr, i)
{
    if(i > DataArr.length)
    {
        console.log("data addition completed " + i)
        return;
    }
    let nft = {};
    nft.name = DataArr[i][0];
    nft.price = DataArr[i][1];
    nft.mint = DataArr[i][2];
    nft.date = DataArr[i][3];
    nft.time = DataArr[i][4];
    nft.website = DataArr[i][5];
    nft.twitter = DataArr[i][6];
    nft.t_followers = DataArr[i][7];
    nft.discord = DataArr[i][8];
    nft.d_followers = DataArr[i][9];
    nft.opensea_link = DataArr[i][10];
    nft.contract_name = DataArr[i][11];
    nft.subject_matter = DataArr[i][12];
    nft.dimension = DataArr[i][13];
    nft.art_style = DataArr[i][14];
    let userModel = new TestDBschema(nft);
    await userModel.save();
    console.log("added data with index number " + i)
    i++
    addData(sheetData, i)
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


