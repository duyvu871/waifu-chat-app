function cookie () {
    return ({
        create : function (key,value,date) {
            const expiration = new Date(date).toUTCString()
            const cookie = escape(key) + '=' + escape(value) +';expires='+expiration+';' 
            document.cookie = cookie
        },
        read : function (name) {
            let key = name + '='
            let cookies = document.cookie.split(';')
            return cookies.reduce((acc,curr) => 
                ({...acc,[curr.split('=')[0].trim()] : curr.split('=')[1]})
            ,{})[name]
        },
        delete : function  (name) {
            return this.create(name,'',-1)
        },
        decode : function (string) {
            return JSON.parse(unescape(string))
        }
    })
}
export {cookie}