const mongoose = require('mongoose')

const nft_data = new mongoose.Schema({
    name:{
        type:String
    },
    price:{
        type:String
    },
    mint:{
        type:String
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    website:{
        type:String
    },
    twitter:{
        type:String
    },
    t_followers:{
        type:String
    },
    discord:{
        type:String
    },
    d_followers:{
        type:String
    },
    opensea_link:{
        type:String
    },
    contract_name:{
        type:String
    },
    subject_matter:{
        type:String
    },
    dimension:{
        type:String
    },
    art_style:{
        type:String
    },
});



module.exports = NFT_data = mongoose.model('NFT_data', nft_data, 'nft_data');