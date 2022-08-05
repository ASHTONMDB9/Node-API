let items = [];
const userContainer = document.getElementById("users");
fetch("http://localhost:6969/users")
  .then((res) => res.json())
  .then((data) => {
    items = data;
    console.log(data);
    showItems(data);
  });
function showItems(users) {
  //   usersContainer.innerHTML = "";
  users.forEach((user) => {
    userContainer.innerHTML += `
    <div id="list" class="card mt-2 mb-2 ms-2 me-2 shadow-lg p-3 rounded d-flex" style="width: 21rem;">
    <div class="card-body">
    <h2 class="card-title">ID: ${user.user_id}</h2>
    <p>Email: ${user.email}</p>
    <p>Password: ************</p>
    <ul id="desc" class="list-group list-group-flush">
      <li class="list-group-item">Full Name: ${user.full_name}</li>
      <li class="list-group-item">Billing Address: ${user.billing_address}</li>
      <li class="list-group-item">Shipping Address: ${user.default_shipping_address}</li>
      <li class="list-group-item">Country: ${user.country}</li>
      </ul>
    <div class="card-footer d-flex mt-3">
    <h4 id="pr">User Type: ${user.user_type}</h4><br>
  </div>
    </div>
    </div>
    </div>
    `;
  });
}




let products = [];
const productContainer = document.getElementById("products");
fetch("http://localhost:6969/products")
  .then((res) => res.json())
  .then((data) => {
    products = data;
    console.log(data);
    showProducts(data);
  });
function showProducts(products) {
  //   usersContainer.innerHTML = "";
  products.forEach((product) => { 
    productContainer.innerHTML += `
    <div id="list" class="card mt-2 mb-2 ms-2 me-2 shadow-lg p-3 rounded d-flex" style="width: 19rem;">
    <img id="prodimg" src="${product.image}" class="card-img-top img-fluid" data-bs-toggle="modal" data-bs-target="#exampleModal" style="height: 18rem; width: 17rem; object-fit: cover;">
    <div class="card-body">
    <h2 class="card-title">ID: ${product.product_id}</h2>
    <p>Name: ${product.name}</p>
    <ul id="desc" class="list-group list-group-flush">
      <li class="list-group-item">Category: ${product.category}</li> 
      <li class="list-group-item">Stock Available: ${product.stock}</li>
      <li class="list-group-item">Weight: ${product.weight}</li>
      <li class="list-group-item">Description: ${product.descriptions}</li>
      </ul>
    <div class="card-footer d-flex mt-3"> 
    <h4 id="pr">Price: ${product.price}</h4><br>
  </div>
    </div>
    </div> 
    </div>
    `;
  });
}


async function Login(e) {
  e.preventDefault();
  const response = await fetch("http://localhost:6969/users/login",{
    method: "POST",
    body:JSON.stringify({
      email: document.querySelector("#email").value,
      password: document.querySelector("#password").value
    }),
    headers: {
      "content-type": "application/json",
    },
  });

  const data = await response.json();

  console.log(data)
  return data
}
