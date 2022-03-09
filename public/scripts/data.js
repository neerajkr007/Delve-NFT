
function tryGetDetails()
{
    if(!window.ethereum)
    {
        alert("MetaMask not installed");
        return;
    }
    if(!window.ethereum.selectedAddress)
    {
        alert("please login with metamask to continue");
    }
    location.href = "/details";
}