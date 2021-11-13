const $ = document.querySelector.bind(document),
      $$ = document.querySelectorAll.bind(document),
      createElement = domString => new DOMParser().parseFromString(domString, 'text/html').body.firstChild,
      getParent = (element,selector) => {
          while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement
            }
            element= element.parentElement
        }
     },
     setEvent = (queryName,boolean,event,callback) => {
        let element ;
        if (boolean){ 
           element = document.querySelector(queryName);
           element.addEventListener(event,callback);
        }
        else{ 
           element = document.querySelectorAll(queryName);
           for (let i = 0; i < element.length; i++){
              element[i].addEventListener(event,callback);
           };
        }
     },
     setStyle = (queryName,boolean,styleProperty,value) => {
        let element ;
        if (document.querySelector('*').style.hasOwnProperty(styleProperty)) {
           if(boolean) {
              element = document.querySelector(queryName)
              element.style[styleProperty] = value;
           } 
           else{ 
              element = document.querySelectorAll(queryName);
              [...element].forEach(e => (e.style[styleProperty] = value));
           }
        }
        else throw new Error( `\'${styleProperty}\' does not a property of Element.style`);
     };

function setBubbleChat (message,status ) {
    var today = new Date();
    var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    
    const formMessage = `
    <div>
        <div class="message"> 
            <div class="bubble ">${message}</div>
            <div class="message-info">
                <div class="message-option">
                    >>>
                </div>
                <div class="message-post-time">
                    ${time}
                </div>
            </div>
        </div>
    </div>
    `

    if (status == 'send') {
        const wrapper = `<div class="incoming">${formMessage}</div>`
        $('.middle').appendChild(createElement(wrapper));
        scrollEnd()
        
    } else if(status = 'post'){
        const wrapper = `<div class="outgoing">${formMessage}</div>`
        $('.middle').appendChild(createElement(wrapper))
        scrollEnd()
    }

}

function getUser () {
    return ({
        message: [...$('.middle').children].reduce((acc,curr,i)=>{
            return [
                ...acc,
                {
                    id:i,
                    message:curr.querySelector('.bubble').textContent,
                    status:(curr.classList[0] == 'outgoing') ? 'post' : 'send'
                }
            ]
        },[]),

        login: [...$('.sign-in-htm').children].reduce((acc,curr)=>{
            if ( curr != null) {
                if (curr.querySelector('input').classList[1] != 'signin') {
                    return  ({...acc,
                                [curr.querySelector('input').id]:curr.querySelector('input').value
                            })
                } else {return acc}
            }
        }
        ,{}),

    })
}

function scrollEnd () {
    $('.middle').scrollTop = $('.middle').scrollHeight
}
export {setBubbleChat, $, $$ ,setEvent ,getParent,createElement,getUser,setStyle}

