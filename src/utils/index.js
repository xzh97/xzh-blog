const util = {
    formatDate(date,format = 'yyyy-MM-dd'){
        if(!date) return '';
        let d = new Date(date);
        if(d.toString() === 'Invalid Date'){
            if(typeof date === 'string'){
                d = new Date(date.replace('/-/g','/'))
            }
            else{
                return '请输入合法日期'
            }
        }
        let year,month,day,hour,min,second;
        year = d.getFullYear();
        month = d.getMonth() + 1;
        day = d.getDate();
        hour = d.getHours();
        min = d.getMinutes();
        second = d.getSeconds();

        let newTime = format.replace(/yyyy/g,year).
        replace(/MM/g,addZero(month)).
        replace(/dd/g,addZero(day)).
        replace(/hh/g,addZero(hour)).
        replace(/mm/g,addZero(min)).
        replace(/ss/g,addZero(second))

        return newTime;
        
        function addZero(num){
            return num < 10 ? `0${num}` : num;
        }
    }
}
export default util;