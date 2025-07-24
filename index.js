var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var productImage = document.getElementById("productImage");
var searchInput = document.getElementById('searchForm');
var productsContainer = []

if(localStorage.getItem('product') !== null){
    productsContainer = JSON.parse(localStorage.getItem('product'));
    displayProducts()
}

function addProduct(){
    var product = {
        code : productName.value ,
        price : productPrice.value ,
        category : productCategory.value ,
        Description : productDescription.value ,
        image : productImage.files[0]?.name ? `images/${productImage.files[0]?.name }` : `images/mobile.png`
    }
    productsContainer.push(product);
    localStorage.setItem("product" , JSON.stringify(productsContainer));
    cleanInputs();   
    displayProducts();
    productName.classList.remove('is-valid');
    productName.classList.remove('is-invalid');
    productPrice.classList.remove('is-valid');
    productPrice.classList.remove('is-invalid');
    productCategory.classList.remove('is-valid');
    productCategory.classList.remove('is-invalid');

}
function cleanInputs(){
    productName.value = null;
    productPrice.value = null;
    productCategory.value = null;
    productDescription.value = null;
}
function displayProducts(){
    var box =''
    for(i = 0 ; i < productsContainer.length ; i++){
        box += `
            <div class="col-md-2 col-sm-4">
                <div class="inner text-center">
                    <img src="${productsContainer[i].image}" alt="" class="w-100">
                    <h1 class="h6 text-muted"><span class="h5 text-dark">Name:</span> ${productsContainer[i].code }</h1>
                    <h2 class="h6 text-muted"><span class="h5 text-dark">Price:</span> ${productsContainer[i].price}</h2>
                    <h2 class="h6 text-muted"><span class="h5 text-dark">Category:</span> ${productsContainer[i].category}</h2>
                    <p class="h6 text-muted "><span class="h5"></span> ${productsContainer[i].Description ? productsContainer[i].Description : "nothing"}</p>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100 btn-sm mt-3">Delete Product</button>
                    <button  onclick="setFormUpdate(${i})" class="btn btn-outline-warning w-100 btn-sm mt-2">Update Product</button>
                </div>
            </div>
        `
    }
    document.getElementById('display').innerHTML = box ;
    localStorage.getItem("product")
}
function deleteProduct(deleteIndex){
    productsContainer.splice(deleteIndex,1);
    localStorage.setItem("product" , JSON.stringify(productsContainer));
    displayProducts()
}
function searchProduct(){
    var term = searchInput.value;
    var box =``
    for(i=0 ; i<productsContainer.length ; i++){
        if( productsContainer[i].code.toLowerCase().includes(term.toLowerCase())== true){
            box += `
            <div class="col-md-2 col-sm-4 ">
                <div class="inner text-center">
                    <img src="${productsContainer[i].image}" alt="" class="w-100">
                    <h1 class="h6 text-muted"><span class="h5 text-dark">Name:</span> ${productsContainer[i].code}</h1>
                    <h2 class="h6 text-muted"><span class="h5 text-dark">Price:</span> ${productsContainer[i].price}</h2>
                    <h2 class="h6 text-muted"><span class="h5 text-dark">Category:</span> ${productsContainer[i].category}</h2>
                    <p class="h6 text-muted "><span class="h5"></span> ${productsContainer[i].Description ? productsContainer[i].Description : "nothing"}</p>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger w-100 btn-sm mt-3">Delete Product</button>
                    <button class="btn btn-outline-warning w-100 btn-sm mt-2">Update Product</button>
                </div>
            </div>
        `
        }
            document.getElementById('display').innerHTML = box ;
    }
}
var updateIndex;
function setFormUpdate(i){
    updateIndex = i ;
    productName.value = productsContainer[updateIndex].code;
    productPrice.value = productsContainer[updateIndex].price;
    productCategory.value = productsContainer[updateIndex].category;
    productDescription.value = productsContainer[updateIndex].Description;
    document.getElementById('addBtn').classList.add('d-none');
    document.getElementById('updateBtn').classList.remove('d-none');
}
function updateProduct(){
    document.getElementById('addBtn').classList.remove('d-none');
    document.getElementById('updateBtn').classList.add('d-none');
    productsContainer[updateIndex].code = productName.value;
    productsContainer[updateIndex].price = productPrice.value;
    productsContainer[updateIndex].category = productCategory.value;
    productsContainer[updateIndex].Description = productDescription.value;
    localStorage.setItem("product" , JSON.stringify(productsContainer));
    displayProducts();
    cleanInputs();
}
function validationName(){
    var regex = /^(?=[A-Za-z0-9\-]{3,14}$)(?=(?:[^0-9]*[0-9]){0,3}[^0-9]*$)(?=(?:[^A-Za-z]*[A-Za-z]){3,}[^A-Za-z]*$)[A-Za-z0-9\-]+$/
    var namee = productName.value ;
    if(regex.test(namee) == true){
        productName.classList.add('is-valid');
        productName.classList.remove('is-invalid');
        document.getElementById('addBtn').disabled = false;
        document.getElementById('updateBtn').disabled = false;
        document.getElementById('alertMsg').classList.add('d-none');
    }
    else{
        productName.classList.remove('is-valid');
        productName.classList.add('is-invalid');
        document.getElementById('addBtn').disabled = true;
        document.getElementById('updateBtn').disabled = true;
        document.getElementById('alertMsg').classList.remove('d-none');
    }
}
function validatePrice() {
    var regex = /^(2000|[2-9][0-9]{3}|[1-7][0-9]{4}|80000)$/;
    var price = productPrice.value;
    if (regex.test(price)) {
        productPrice.classList.add('is-valid');
        productPrice.classList.remove('is-invalid');
        document.getElementById('addBtn').disabled = false;
        document.getElementById('updateBtn').disabled = false;
        document.getElementById('priceAlert').classList.add('d-none');
    } else {
        productPrice.classList.remove('is-valid');
        productPrice.classList.add('is-invalid');
                document.getElementById('addBtn').disabled = true;
                document.getElementById('updateBtn').disabled = true;
        document.getElementById('priceAlert').classList.remove('d-none');
}
}
function validateCategory() {
    var regex = /^(mobile|screens|tv|electronics|laptop)$/i;
    var category = productCategory.value.trim();
    if (regex.test(category)) {
        productCategory.classList.add('is-valid');
        productCategory.classList.remove('is-invalid');
        document.getElementById('addBtn').disabled = false;
        document.getElementById('updateBtn').disabled = false;
        document.getElementById('categoryAlert').classList.add('d-none');
    } else {
        productCategory.classList.remove('is-valid');
        productCategory.classList.add('is-invalid');
        document.getElementById('addBtn').disabled = true;
        document.getElementById('updateBtn').disabled = true;
        document.getElementById('categoryAlert').classList.remove('d-none');
    }
}

// chatgpt code
document.getElementById('addBtn').disabled = true;
document.getElementById('updateBtn').disabled = true;
function checkFormValidityOnce() {
    const nameIsValid = productName.classList.contains('is-valid');
    const priceIsValid = productPrice.classList.contains('is-valid');
    const categoryIsValid = productCategory.classList.contains('is-valid');
    const isValid = nameIsValid && priceIsValid && categoryIsValid && descFilled;
    document.getElementById('addBtn').disabled = !isValid;
    document.getElementById('updateBtn').disabled = !isValid;
}
productName.addEventListener('input', checkFormValidityOnce);
productPrice.addEventListener('input', checkFormValidityOnce);
productCategory.addEventListener('input', checkFormValidityOnce);
//