const util = {
    formatDate(date,format){
        let str = '';
        format = format || 'yyyy-MM-dd';
        if(!date) return '';
        d = new Date(date);
        if(d.toString() === 'Invalid Date'){
            if(date){}
        }
        else{
            let year,month,day,hour,min,second,arr1 = [],arr2 = [];
            year = d.getFullYear();
            month = d.getMonth() + 1;
            day = d.getDate();
            hour = d.getHours();
            min = d.getMinutes();
            second = d.getSeconds();

            arr1 = format.split(' ');
            arr2 = [];
            if(arr1.length > 1){ //说明有时秒分
                arr1.map(item => {
                    arr2.push(item.split('/') || item.split(':'));
                })
            }
            console.log(arr2);
        }
    }
}
export default util;