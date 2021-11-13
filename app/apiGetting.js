function sendMessage (message){
    var myHeaders = new Headers();
    myHeaders.append("content-type", "application/x-www-form-urlencoded");
    myHeaders.append("x-rapidapi-host", "waifu-ai.p.rapidapi.com");
    myHeaders.append("x-rapidapi-key", "9d2cfc39c7msh3f991e24c5ae59cp1d1a91jsn16e4ec494996");

    var urlencoded = new URLSearchParams();
    urlencoded.append("message", message);
    urlencoded.append("user_id", "9fa832g79fh2398h");
    urlencoded.append("from_name", "hinari");
    urlencoded.append("to_name", "shinobu");
    urlencoded.append("situation", "Girl loves Boy.");
    urlencoded.append("preset_mode", "waifu");
    urlencoded.append("translate_from", "auto");

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
    };

    fetch("https://waifu-ai.p.rapidapi.com/path", requestOptions)
    .then(response => response.text())
    .then(result => setBubbleChat(result,'send'))
    .catch(error => console.log('error', error));
}


export {sendMessage }