function autoCompleteSearch()
{
    console.log("changed");
    $("#NFTInputField").autocomplete({
        source: async function(req, res){
            let data = await fetch(`http://localhost:3000/search?term=${req.term}`)
            .then(results => results.json())
            .then(results => results.map(result =>{
                return {label: result.name, value:result.name, id: result._id};
            }));
            res(data);
        },
        minLeangth: 2,
        select : function(event, ui)
        {
            console.log(ui.item);
        }
    })
}