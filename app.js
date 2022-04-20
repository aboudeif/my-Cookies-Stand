let hoursOfWork=['6am ','7am ','8am ','9am ','10am ','11am ','12am ','1pm ','2pm ','3pm ','4pm ','5pm ','6pm','7pm'];
let stores=[];
const table= document.getElementById('table');
const addForm=document.getElementById('myForm');

// tableheader

const tableHeader= () =>{
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
    thead.appendChild(row)
    table.appendChild(thead)
    }
    
    tableHeader()

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

    storeSales.prototype.render = function(){
    let tbody= document.createElement('tbody')
    let row = document.createElement('tr')
    let col = document.createElement('td')
    col.textContent = this.name
    row.appendChild(col)
    for(let i = 0 ; i<this.cookiesPerHour.length;i++){
        col = document.createElement('td')
        col.textContent = this.cookiesPerHour[i]
    row.appendChild(col)
    }
    tbody.appendChild(row)
    table.appendChild(tbody)
    }

    const seatle = new storeSales('Seatle',65,23,6.3);
    const tokyo = new storeSales('Tokyo',24,3,1.2);
    const dubai = new storeSales('Dubi',38,11,3.7);
    const paris = new storeSales('Paris',38,20,2.3);
    const lima = new storeSales('lima',16,2,4.6);

    stores.forEach(store => {
        store.getHourlySales()
        store.render()
    })