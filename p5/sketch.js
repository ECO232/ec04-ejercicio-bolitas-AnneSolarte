// Item creation
const canvas = document.getElementById('myCanvas');
const context = canvas.getContext('2d');

class Item{
    constructor(x, y, r, g, b){
      this.x = x;
      this.y = y;
      this.r = r;
      this.g = g;
      this.b = b;
    }

    show(){
      fill(this.r, this.g, this.b);
      ellipse(this.x, this.y, 20, 20);
    }
}


//Endpoints
const apiUrlForGet = "http://localhost:3000/items";
const apiUrlForPost = "http://localhost:3000/items";
const apiUrlForClear = "http://localhost:3000/clear"
  

async function fetchItems() {
    try {
      const response = await fetch(apiUrlForGet);    
      if (!response.ok) {
        throw new Error(`HTTP error : Status: ${response.status}`);
      }    
      const items = await response.json();
      return items;
    } catch (error) {
      console.error('Error fetching items:', error);
      return [];
    }
  }
  
  let items = []

function setup() {
    createCanvas(400, 400);

    fetchItems().then(onServerItems => {
      console.log('Fetched items:', onServerItems.items);
      onServerItems.items.forEach(eachItem => {
        const {x,y,r,g,b} = eachItem;
        items.push(new Item(x, y, r, g, b))
      });
    }).catch(error => {
      console.error('Error:', error);
    });
  }
  

function draw() {
  background(220);
  items.forEach(item=>{
    item.show();
  });
}

function mousePressed(){
  const newItem = new Item(mouseX, mouseY, random(255),random(255),random(255))
  items.push(newItem);

  postNewItem(newItem).then(responseData => {
    if (responseData) {
      console.log('Item posted successfully:', responseData);
    }
  }).catch(error => {
    console.error('Error:', error);
  }); 

}

async function postNewItem(data) {
  try {
    // Request for posting on server
    const response = await fetch( apiUrlForPost, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error : Status : ${response.status}`);
    }

    const responseData = await response.json();    
    
    return responseData;

  } catch (error) {
    console.error('Error posting item:', error);
    return null;
  }
}

async function clearCanvas() {
  try {
    const response = await fetch(apiUrlForClear, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error: Status: ${response.status}`);
    }

    items = [];
    context.clearRect(0, 0, canvas.width, canvas.height);

  } catch (error) {
    console.error('Error clearing items:', error);
  }
}


