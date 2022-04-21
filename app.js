const table= document.getElementById('table');
const addForm=document.getElementById('myForm');
const charBox = document.getElementById('char-container')
let hoursOfWork=['6am ','7am ','8am ','9am ','10am ','11am ','12am ','1pm ','2pm ','3pm ','4pm ','5pm ','6pm','7pm'];
let stores= localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales')):[];
buildTableHeader();
if(stores) fillStores();
    const labels = hoursOfWork
    let data = {
    labels: labels,
    datasets: [{
      label: 'My First dataset',
      backgroundColor: 'rgb(237, 37, 37)',
      borderColor: 'rgb(237, 37, 37)',
      data: [0, 10, 5, 2, 20, 30, 45],
    }]
  };


// tableheader

function buildTableHeader(){
    let thead= document.createElement('thead')
    let row = document.createElement('tr')
    let col = document.createElement('th')
    col.textContent = 'location'
    row.appendChild(col)
    for(let i = 0 ; i<hoursOfWork.length;i++){
        col = document.createElement('th')
        col.textContent = hoursOfWork[i]
    row.appendChild(col)
    }
    col = document.createElement('th')
    col.textContent = 'total'
    row.appendChild(col)
    col = document.createElement('th')
    col.textContent = 'action'
    row.appendChild(col)
    thead.appendChild(row)
    table.appendChild(thead)
    }

    function storeSales(name,maxcus,mincus,avgsales){
        this.name = name
        this.maxcus = maxcus
        this.mincus = mincus
        this.avgsales = avgsales
        this.cookiesPerHour = []
        stores.push(this)
    }

    storeSales.prototype.getRandomCustomers = function(){
        return this.maxcus - (Math.random() * (this.maxcus - this.mincus) + this.mincus)
    }

    storeSales.prototype.getHourlySales = function(){
        for(let i=0; i<hoursOfWork.length;i++)
            this.cookiesPerHour.push(Math.floor(this.avgsales * this.getRandomCustomers()))
    }

    function render(store){
    let tbody= document.createElement('tbody')
    let row = document.createElement('tr')
    let col = document.createElement('td')
    let total = 0
    row.setAttribute('class','store')
    row.setAttribute('data',stores.indexOf(store))
    col.textContent = store.name
    row.appendChild(col)
    for(let i = 0 ; i<store.cookiesPerHour.length;i++){
        col = document.createElement('td')
        col.textContent = store.cookiesPerHour[i]
        total += store.cookiesPerHour[i]
    row.appendChild(col)
    }
    col = document.createElement('td')
    col.textContent = total
    row.appendChild(col)
    col = document.createElement('td')
    let button = document.createElement('button')
    button.textContent = 'delete'
    button.addEventListener('click',function(){
        stores.splice(stores.indexOf(store),1)
        localStorage.setItem('sales',JSON.stringify(stores))
        tbody.removeChild(row)
    })
    col.appendChild(button)
    row.appendChild(col)
    tbody.appendChild(row)
    table.appendChild(tbody)
    showChart(row)
    }

    function fillStores(){
        stores.forEach(store => {
            render(store)
        });}

    addForm.addEventListener('submit', e =>{
        e.preventDefault()
        const name = e.target.branchName.value
        const max = e.target.maxCus.value
        const min = e.target.minCus.value
        const avg = e.target.avgCookies.value
        const newStore = new  storeSales(name,max,min,avg)
        newStore.getHourlySales()
        render(newStore)
        localStorage.setItem('sales',JSON.stringify(stores))
        addForm.reset()
    })

   
    document.addEventListener("mousemove",function(e){
        let x = e.clientX
        let y = e.clientY
        charBox.style.left = x + 20 + "px"
        charBox.style.top = y + 40 + "px"
    })
    
    let tableRow = document.getElementsByClassName('store')

    function showChart(element){
    
        element.addEventListener("mouseover",function(){
            console.log(stores[element.getAttribute('data')].name)
            console.log(data.datasets[0].label)
            data.datasets[0].label = stores[element.getAttribute('data')].name
            data.datasets[0].data =  stores[element.getAttribute('data')].cookiesPerHour.slice(0,14)
              /* =================================================================================== */
            document.getElementById('myChart').remove()
            let canvas = document.createElement('canvas')
            canvas.setAttribute('id','myChart')
            charBox.appendChild(canvas)
            let myChart = new Chart(
                document.getElementById('myChart'),
                config
            );
            charBox.style.display = "block"
    })
    element.addEventListener("mouseout",function(){
        charBox.style.display = "none"
    })
}
   
  const config = {
    type: 'line',
    data: data,
    options: {}
  };

  