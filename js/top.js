

const getYearMonth = function(dt) {
    var year = dt.getFullYear();
    var month = ('00' + (dt.getMonth()+1)).slice(-2);

    return (year + '-' + month)
}

getTotal();



async function getTotal(){
    thisMonth = getYearMonth(new Date())
    const res = await fetch(`https://sp-kakeibo.herokuapp.com/totals/list/${thisMonth}`)
    // const res = await fetch(`http://localhost:8000/totals/list/${thisMonth}`)
    .then(response => response.json());
    await insertValues(res)
    await createGraph(res)
}

async function insertValues(res){
    let table = document.getElementById("list-table")
    for(let row of table.rows) {
        row.cells[2].innerText = res[row.cells[1].id]
    }
}

async function createGraph(res){
    
    delete res.income
    delete res.spending
    delete res.balance

    console.log(Object.keys(res))
    console.log(Object.values(res))
    

    const ctx = document.getElementById("myChart").getContext('2d');
    const myCHart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(res),
            datasets: [{
                data: Object.values(res)
            }]
        },
        options: {
            plugins: {
                colorschemes: {
                    scheme: 'brewer.Paired12'
                }
            }
        }
    });
}

const ThisMonth = new Vue(        
    {
        el: '#sub-title',
        data: {
            thisMonth: getYearMonth(new Date()) + 'の家計簿'
        }
    }
)
