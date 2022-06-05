

const getTodaysDate = function(dt) {
    var year = dt.getFullYear();
    var month = ('00' + (dt.getMonth()+1)).slice(-2);
    var day = ('00' + (dt.getDate())).slice(-2);
    return (year + '-' + month + '-' + day)
}


const addCategory = new Vue({
    el:'#formContents',
    data:{
        dateName: "date",
        isChecked: true,
        category: "変動費",
        list: ["食費", "外食費", "生活用品", "生活家電", "生活家具", "収入"],
        today: getTodaysDate(new Date()),
        categoryName: "variable_name",
        nameType: "text"
    },
    methods: {
        changeCategory(isChecked){
            if(isChecked){
                this.dateName = "date";
                this.category = "変動費";
                this.list = ["食費", "外食費", "生活用品", "生活家電", "生活家具", "収入"];
                this.categoryName = "variable_name",
                this.nameType = "text";
            } else {
                this.dateName = "year_month";
                this.category = "固定費";
                this.list = ["家賃", "水道代", "電気代","ガス代", "WiFi代"];
                this.categoryName = "fixed_name",
                this.nameType = "hidden";
            }
        }
    }
})


const form = document.getElementById('submitForm');

async function submitData(){
    
    const obj = await createBody()
    const requestPath = await createPath()
    const param = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify(obj)
    }

    const res = await fetch(requestPath, param)
    return res.json()

}

async function createBody(){
    obj = {}
    const items = new FormData(form)
    for (item of items){
        obj[item[0]] = item[1]
    }

    if('year_month' in obj){
        obj.year_month = obj.year_month.slice(0,7);
        delete obj.name;
    }

    return obj
}

async function createPath(){
    const flag = document.getElementById("categoryFlag").checked;
    const category = document.getElementById('categorySelect').value;

    let query = '';
    if(flag){
        query = `variable/?variable_name=${category}`;
    } else {
        query = `fixed/?fixed_name=${category}`;
    }
    path = encodeURI(`https://sp-kakeibo.herokuapp.com/${query}`)
    // path = encodeURI(`http://localhost:8000/${query}`)
    
    return path
}
