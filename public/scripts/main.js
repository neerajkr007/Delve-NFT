
function autoCompleteSearch()
{
    console.log("changed");
    $("#NFTInputField").autocomplete({
        source: async function(req, res){
            console.log(window.location.hostname);
            let data = await fetch(`https://${window.location.hostname}/search?term=${req.term}`)
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
