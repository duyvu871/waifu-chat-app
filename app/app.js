import {sendMessage} from './apiGetting.js';
import {cookie} from './setCookie.js'
import {setBubbleChat,$,$$,createElement,getParent,setEvent,getUser,setStyle,DELAY_RELOAD} from './global.js'
import {isEqual} from './index.js';
(($,$$,createElement,getParent)=>{
    $('.middle .waiting').remove()
    let cookies = cookie();
    //
    let userLogin = cookies.read('userLogin') 
                            ? cookies.decode(cookies.read('userLogin')) 
                            : undefined;
    //
    let userChat = userLogin ? userLogin.chat : undefined;
    //
    let userStatus = userLogin ? userLogin.status : undefined;
    //
    let colorCode = ['#79c7c5','#fff','#e283d6','#0084ff'];
    let setColorPrimary = color => $(':root').style.setProperty('--primary-color',color);
    let primaryColor = userLogin ? userLogin.color : colorCode[0];
    //
    let shadowData = {
        login:userLogin ? userLogin.login : undefined ,
        color:primaryColor,
        status:userStatus,
        chat:userChat
    };
    //
    function pickMessage () {
        let postStatus = true ;
        let inputValue = document.querySelector('.chat input').value;
        if(inputValue != '' && inputValue.toLowerCase().trim() !== 'logout') {
            setBubbleChat(inputValue,'post')
            if (postStatus) {
                $('.chat input').value = ''
                sendMessage(inputValue)
            }
        }else if(inputValue.toLowerCase().trim() === 'logout') {
            //
            shadowData.status = "off";
            shadowData.chat = getUser().message;
            location.reload();
            
        }
    }
    if (userLogin && userStatus === 'on') {
        [...$('.login-html').children].forEach(v=>{ v.style.display = "none" })
        $('.user').style.display = 'flex' 
        $('.user-name').textContent = userLogin.login.user
        $('.user-option').appendChild(createElement(`
            <div class="user-option-pick" value="color">
                ${colorCode.map(element => `
                        <label class="b-contain">
                            <span value="${element}">${element}</span>
                            <input type="radio" name="radio1">
                            <div class="b-input"></div>
                        </label>
                    `).join('')} 
            <div>`
        ));

        userChat.forEach(element=>setBubbleChat(element.message, element.status));
        [...$$('input[name="radio1"]')].forEach(element=> {
            let color = getParent(element,'.b-contain').querySelector('span').textContent;
            if (color === userLogin.color) element.checked = true
        })
    } else {
        setEvent('.group .signin',true,'click',(e)=>{
            let checked = [];
            let userInfo = getUser().login;
            
            for (const key in userInfo) {
                //
                if (userInfo[key] == '' ) checked.concat([userInfo[key]])
            }

            if (!checked.includes('')) {
                //
                let checkDuplicate = userLogin 
                                    && userStatus === 'off' 
                                    && isEqual(userInfo,userLogin.login)
                                    && shadowData.color === userLogin.color;
     
                if(checkDuplicate) {
                    shadowData.status = 'on'
                  // t???i ????y n???u nh?? user ????ng nh???p l???i t??i kho???n ???? ????ng su???t th?? s??? quay l???i
                }else if(!checkDuplicate && getUser().message.length === 0){
                    //
                    shadowData.login = userInfo;
                    shadowData.color = primaryColor;
                    shadowData.status = 'on';
                    shadowData.chat = getUser().message;
                }
                setTimeout(()=>{ location.reload() },DELAY_RELOAD)
            }
        })
    };

    setColorPrimary(primaryColor);

    setEvent('.chat button',true,'click',pickMessage);
    setEvent('.chat input',true,'keypress',(e)=>{
        if(e.which === 13){
            pickMessage()
        }
    })
    setEvent('input[name="radio1"]',false,'input',(event)=>{
        let color = getParent(event.target,'.b-contain')
                            .querySelector('span')
                            .textContent;
        if(event.target.checked){
            setColorPrimary(color)
            primaryColor = color;
        }
    });

    window.addEventListener("beforeunload", (event) => {
        //

            let message = getUser().message;



            let data = {
                login:shadowData.login,
                color:shadowData.color,
                status:shadowData.status,

                chat:message.length > 0 ? message : shadowData.chat,
            };
            console.log(data.chat);


            cookies.create('userLogin',JSON.stringify(data),Date.UTC(2024,12,2))
        // event.returnValue = "There are unsaved changes. Leave now?";
      });

})($,$$,createElement,getParent)     
