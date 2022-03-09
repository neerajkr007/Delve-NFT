var hostName = ""


function documentLoaded()
{
    hostName = window.location.hostname;
    if(window.location.hostname == "localhost")
    {
        hostName += ":3000"
        hostName = "http://"+hostName
    }
    else
    {
        hostName = "https://"+hostName
    }
    console.log(hostName)
    autoCompleteSearch()
}


function autoCompleteSearch()
{
    console.log("changed");
    $("#NFTInputField").autocomplete({
        source: async function(req, res){
            
            let data = await fetch(`${hostName}/search?term=${req.term}`)
            .then(results => results.json())
            .then(results => results.map(result =>{
                return {label: result.name, value:result.name, id: result._id};
            }));
            res(data.slice(0, 5));
        },
        minLeangth: 1,
        select : function(event, ui)
        {
            console.log(ui.item);
        }
    })
}


function tryLogin()
{
    if(!window.ethereum)
    {
        alert("MetaMask Not Installed !");
        return;
    }
    loginWithMetaMask()
}

async function loginWithMetaMask()
{
    console.log(window.ethereum.selectedAddress)
    const accounts = await window.ethereum.request({method: 'eth_requestAccounts'})
    .catch((e) =>{
        console.log(e.message)
        return
    })
    if(!accounts)
    {
        return
    }
    console.log(" wallet address = " + accounts[0])
    
}