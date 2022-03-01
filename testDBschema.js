const mongoose = require('mongoose')

const nft_data = new mongoose.Schema({
    name:{
        type:String
    },
    icon_link:{
        type:String
    }
});



module.exports = NFT_data = mongoose.model('NFT_data', nft_data, 'nft_datas');