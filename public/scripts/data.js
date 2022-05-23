const socket = io.connect();

function onPageLoaded()
{
    var contractName = new URLSearchParams(window.location.search).get("contract");
    var name = new URLSearchParams(window.location.search).get("name");
    console.log(contractName)
    autoCompleteSearch();
    socket.emit("getContractData", contractName, name);
}

socket.on("gotOpenSeaData", (link)=>{
    console.log(link)
    document.getElementById("nftImage").setAttribute("src", link)
})

socket.on("gotMongoData", (data)=>{
    console.log(data)
})

