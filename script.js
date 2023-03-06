// const produtc = {
//   id: 1,
//   title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
//   price: 109.95,
//   description:
//     "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
//   category: "men's clothing",
//   image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
//   rating: { rate: 3.9, count: 120 },
// };
setTimeout(()=>{
  location.reload()
},2000)


var data = JSON.parse(sessionStorage.getItem("data") || "[]");
var cart = JSON.parse(localStorage.getItem("cart") || "[]");

function addToCart(id){
 var test= cart.length && cart.find((data) => data.id == id)


    var results = data.find((obj) => obj.id == id);
    var item = {
      id : results.id,
      image : results.image,
      title: results.title,
      price : results.price
    };
    if (!test) {
      // console.log(item);
      cart.push(item)
    localStorage.setItem("cart",JSON.stringify(cart))
      // window.location.href = "login.html";
    } else {
      console.log("Item Already added to cart");
    }   
  console.log("Add to cart clicked");
}
console.log(cart);

let url = "https://fakestoreapi.com/products";
// To fetch data from an API using .then
fetch(url, {
  method: "GET",
})
  .then((response) => response.json())
  .then((data) => {
    sessionStorage.setItem("data", JSON.stringify(data));
    // sessionStorage.setItem("products", data);
    // fetchProduct(data)
    // console.log(data)
  })
  .catch((error) => console.log(error));

for (var i = 0; i < data.length; i++) {
  data[i].Colours = ["red", "blue", "black", "green", "white"];
  data[i].sizes = ["s", "l", "m", "xl"];
}

console.log(data);
//Render all products by default
fetchProduct(data);

document.getElementById("searchBar").addEventListener("input", searchData);
document.getElementById("allproducts").addEventListener("click", allProducts);
document.getElementById("mensproducts").addEventListener("click", mensPro);
document.getElementById("womenproducts").addEventListener("click", womensPro);
document.getElementById("jewelleryproducts").addEventListener("click", jewellPro);
document.getElementById("electproducts").addEventListener("click", electPro);


function allProducts() {
  makeAct();
  // console.log(data);
  // console.log("clicked");
  fetchProduct(data);
}

function mensPro() {
  makeAct();
  // console.log(data);
  var results = data.filter((obj) => obj.category == "men's clothing");
  fetchProduct(results);
}

function womensPro() {
  makeAct();
  var results = data.filter((obj) => obj.category == "women's clothing");
  fetchProduct(results);
}

function electPro() {
  makeAct();
  var results = data.filter((obj) => obj.category == "electronics");
  fetchProduct(results);
}

function jewellPro() {
  makeAct();
  var results = data.filter((obj) => obj.category == "jewelery");
  fetchProduct(results);
}

function makeAct() {
  var a = document.querySelectorAll(".filter");
  for (var i = 0, length = a.length; i < length; i++) {
    a[i].onclick = function () {
      var b = document.querySelector(".active");
      if (b) b.classList.remove("active");
      this.classList.add("active");
    };
  }
}

function searchData() {

  var input, filter, i;
  var result = [];
  input = document.getElementById("searchBar").value;
  filter = input.toUpperCase();
  
  // ul = document.getElementById("myUL");
  // li = ul.getElementsByTagName("li");
  for (i = 0; i < data.length; i++) {
    let name = data[i].title
    if (!name.toUpperCase().includes(filter)) {
      console.log((false));      
  }
  else {
    // data[i].title.style.display="list-item";       
    result.push(data[i])
  }
  fetchProduct(result)
  }
}


function fetchProduct(data) {
  var products = document.getElementById("test");
  products.innerHTML = "";
  for (var i = 0; i < data.length; i++) {
    var product = `
                      <div class="item">
                        <img src="${data[i].image}" alt="Item" />
                        <div class="info">
                        <div class="price">${data[i].title}</div> <br>
                          <div class="row">
                          
                            <div class="price">$${data[i].price}</div>
                            <div class="sized">${data[i].sizes[0]},${data[i].sizes[1]},${data[i].sizes[2]},${data[i].sizes[3]}</div>
                          </div>
                          <div class="colors">
                            Colors:
                            <div class="row">
                              <div class="circle" style="background-color:  ${data[i].Colours[0]}"></div>
                              <div class="circle" style="background-color: ${data[i].Colours[1]}"></div>
                              <div class="circle" style="background-color: ${data[i].Colours[2]}"></div>
                            </div>
                          </div>
                          <div class="row">Rating: ${data[i].rating.rate}</div>
                        </div>
                        <button id="addBtn" onclick="addToCart(${data[i].id})">Add to Cart</button>
                      `;
    products.innerHTML += product;
  }
}
