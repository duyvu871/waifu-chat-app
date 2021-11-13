import {sendMessage} from './apiGetting.js';
import {cookie} from './setCookie.js'
import {setBubbleChat,$,$$,createElement,getParent,setEvent,getUser,setStyle} from './global.js'
(($,$$,createElement,getParent)=>{
    $('.middle .waiting').remove()
    let cookies = cookie()
    let userLogin = cookies.read('userLogin') ? cookies.decode(cookies.read('userLogin')) : null
    let userChat = userLogin ? userLogin.chat : undefined
    let setColorPrimary = color => $(':root').style.setProperty('--primary-color',color) 
    let primaryColor = userLogin ? userLogin.color : undefined
    let colorCode = ['#79c7c5','#fff','#e283d6','#0084ff']
    // console.log(userLogin);
    if (userLogin) {
        [...$('.login-html').children].forEach(v=>{ v.style.display = "none" })
        $('.login-html').appendChild(createElement(`
           <div class="user">
                <div class="user-avatar">
                    <i class="fas fa-user"></i>
                </div>
                <div class="user-name">${userLogin.login.user}</div>
                <div class="user-option soft-ui">
                    <p class="user-option-content">Pick color</p>
                    <div class="user-option-pick" value="color">
                       ${
                        colorCode.map(element => `
                            <label class="b-contain">
                                <span value="${element}">${element}</span>
                                <input type="radio" name="radio1">
                                <div class="b-input"></div>
                            </label>
                        `)
                       }
                    </div>
                </div>
           </div>
        `));
        userChat.forEach(element=>setBubbleChat(element.message, element.status));
        [...$$('input[name="radio1"]')].forEach(element=> {
            let color = getParent(element,'.b-contain').querySelector('span').textContent
            if (color === userLogin.color) element.checked = true
        })
    } else {
        setEvent('.group .signin',true,'click',(e)=>{
            let checked = []
            let userInfo = getUser().login
            let data = {
                login:userInfo,
                color:primaryColor,
                chat:[],
            }
            for (const key in userInfo) {
                if (userInfo[key] == '' ) checked.concat([userInfo[key]])
            }
            if (!checked.includes('')) {
                cookies.create('userLogin',JSON.stringify(data),Date.UTC(2024,12,21))
            }
        })
    }
    setColorPrimary(primaryColor)
    setEvent('.chat button',true,'click',(e)=>{
        let postStatus = true
        let inputValue = getParent(e.target,'.chat').querySelector('input').value
        if(inputValue != '') {
            setBubbleChat(inputValue,'post')
            if (postStatus) {
                $('.chat input').value = ''
                sendMessage(inputValue)
            }
        }else {}
    })
    setEvent('input[name="radio1"]',false,'input',(event)=>{
        let color = getParent(event.target,'.b-contain').querySelector('span').textContent
        if(event.target.checked){
            $(':root').style.setProperty('--primary-color',color)
            primaryColor = color
        }
    })
    window.addEventListener("beforeunload", (event) => {
        let messages = getUser().message
        let data = {
            login:userLogin.login,
            color:primaryColor,
            chat:messages.length > 50 ? [] : messages,
        }
        cookies.create('userLogin',JSON.stringify(data),Date.UTC(2024,12,2))
        event.returnValue = "There are unsaved changes. Leave now?";
      });
})($,$$,createElement,getParent)     
