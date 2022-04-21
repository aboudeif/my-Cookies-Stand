const table= document.getElementById('table');
const addForm=document.getElementById('myForm');
let hoursOfWork=['6am ','7am ','8am ','9am ','10am ','11am ','12am ','1pm ','2pm ','3pm ','4pm ','5pm ','6pm','7pm'];
let stores= localStorage.getItem('sales') ? JSON.parse(localStorage.getItem('sales')):[];
buildTableHeader();
if(stores){
    fillStores();
    //console.log(JSON.parse(localStorage.getItem('sales')))
}

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
        console.log(stores)
        stores.splice(stores.indexOf(store),1)
        console.log(stores)
        localStorage.setItem('sales',JSON.stringify(stores))
        tbody.removeChild(row)
    })
    col.appendChild(button)
    row.appendChild(col)
    tbody.appendChild(row)
    table.appendChild(tbody)
    }
    
    // const seatle = new storeSales('Seatle',65,23,6.3);
    // const tokyo = new storeSales('Tokyo',24,3,1.2);
    // const dubai = new storeSales('Dubi',38,11,3.7);
    // const paris = new storeSales('Paris',38,20,2.3);
    // const lima = new storeSales('lima',16,2,4.6);
    
    function fillStores(){
        stores.forEach(store => {
            //stores.push(store)
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

    let charBox = document.getElementById('char-container')
    document.addEventListener("mousemove",function(e){
        let x = e.clientX
        let y = e.clientY
        charBox.style.left = x + 5 + "px"
        charBox.style.top = y + 5 + "px"
    })