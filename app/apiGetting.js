import {setBubbleChat} from './global.js'
function sendMessage (message){
    var headerParams = {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        "expires": "0",
        "pragma": "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
        "sec-gpc": "1",
        "usequerystring": "true",
        "x-rapidapi-host": "waifu.p.rapidapi.com",
        "x-rapidapi-key": "9d2cfc39c7msh3f991e24c5ae59cp1d1a91jsn16e4ec494996",
        "x-rapidapi-ua": "RapidAPI-Playground"
    }

    var myHeaders = new Headers();
    
    for (var index in headerParams) {
        myHeaders.append(index,headerParams[index])
    }


    var urlencoded = new URLSearchParams();
    urlencoded.append("message", message);
    urlencoded.append("user_id", "sample_user_id");
    urlencoded.append("from_name", "hinari");
    urlencoded.append("to_name", "shinobu");
    urlencoded.append("situation", "Boy loves Girl.");
    urlencoded.append("preset_mode", "waifu");
    urlencoded.append("translate_from", "auto");

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
    };

    fetch("https://waifu.p.rapidapi.com/path", requestOptions)
    .then(response => response.text())
    .then(result => setBubbleChat(result,'send'))
    .catch(error => console.log('error', error));
}


export {sendMessage }