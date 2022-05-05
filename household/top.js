
fetch('http://localhost:8000/totals/list/2022-04', {
    mode: 'cors'
})
.then(response => response.json())
.then(res => console.log(res));
