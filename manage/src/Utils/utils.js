/**
 * 
 */


export default {

    formateDate(date,rule){
        let fmt = rule || 'yyyy-MM-dd hh:mm:ss'

        // if(/(y+)/.test(fmt)) {
        //     const r = new RegExp('y+');
        //     const t = r.exec(fmt)[1];

     
        //     fmt = fmt.replace(t,fmt.getFullYear());
        // }
        const o ={
            'y+': date.getFullYear(),
            'M+':date.getMonth() + 1,
            'd+':date.getDate(),
            'h+': date.getHours(),
            'm+':date.getMinutes(),
            's+': date.getSeconds()
        }
        for(let k in o){
            if(new RegExp(`${k}`).test(fmt)){
                const val = o[k] +'';
                const regx = new RegExp("(" + k + ")");

                if (regx.test(fmt)) {
                    const t = regx.exec(fmt)[1];
                    fmt = fmt.replace(
                        t,
                        t.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
                    );
                }
            }
        }
        return fmt;
    }


}