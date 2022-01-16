import {setBubbleChat} from './global.js'
function sendMessage (message){

    fetch(
        `https://waifu.p.rapidapi.com/path?user_id=sample_user_id&message=${message}&from_name=Boy&to_name=Girl&situation=Girl+loves+Boy.&translate_from=auto&translate_to=auto`, 
        {
        "headers": {
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
        },
        "referrer": "https://rapidapi.com/",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": "{}",
        "method": "POST",
        "mode": "cors",
        "credentials": "omit"
    }).then(res => res.text())
        .then(res => setBubbleChat(res,'send'))
        .catch(err => {
            console.log(err)
        })
}


export {sendMessage }