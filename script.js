// ১. আপনার প্রোডাক্ট লিস্ট (এগুলোই হোমপেজে দেখাবে)
const products = [
    { id: 1, name: "স্মার্ট ওয়াচ", price: 2500, img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500" },
    { id: 2, name: "হেডফোন", price: 1500, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500" },
    { id: 3, name: "স্মার্ট ফোন", price: 25000, img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500" },
    { id: 4, name: "গেমিং মাউস", price: 800, img: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500" },
    { id: 5, name: "চামড়ার ব্যাগ", price: 3200, img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500" },
    { id: 6, name: "জুতো", price: 1800, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500" }
];

// ২. কার্ট লোড করা
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// ৩. হোমপেজে প্রোডাক্ট দেখানোর ফাংশন
function displayProducts() {
    const grid = document.getElementById('product-grid');
    if (grid) {
        grid.innerHTML = products.map(p => `
            <div class="card">
                <img src="${p.img}" alt="${p.name}">
                <h3>${p.name}</h3>
                <p class="price">৳${p.price}</p>
                <button class="btn" onclick="addToCart(${p.id})">Add to Cart</button>
            </div>
        `).join('');
    }
}

// ৪. কার্টে প্রোডাক্ট যোগ করা
function addToCart(id) {
    const product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(product.name + " কার্টে যোগ করা হয়েছে!");
}

// ৫. কার্ট পেজে লিস্ট দেখানো
function displayCart() {
    const cartList = document.getElementById('cart-items');
    const totalEl = document.getElementById('total-price');
    if (cartList) {
        if (cart.length === 0) {
            cartList.innerHTML = "<p>আপনার কার্ট খালি।</p>";
            if(totalEl) totalEl.innerText = "0";
            return;
        }

        let total = 0;
        cartList.innerHTML = cart.map((item, index) => {
            total += item.price;
            return `
                <div style="background:white; padding:15px; margin-bottom:10px; border-radius:5px; display:flex; justify-content:space-between; align-items:center; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
                    <div>
                        <h4 style="margin:0;">${item.name}</h4>
                        <p style="margin:0; color:#2563eb;">৳${item.price}</p>
                    </div>
                    <button onclick="removeFromCart(${index})" style="background:#ef4444; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;">মুছে ফেলুন</button>
                </div>
            `;
        }).join('');
        if(totalEl) totalEl.innerText = total;
    }
}

// ৬. কার্ট থেকে প্রোডাক্ট মোছা
function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
}

// ৭. হোয়াটসঅ্যাপে অর্ডার পাঠানোর ফাংশন (আপডেটেড)
function sendToWhatsApp(e) {
    e.preventDefault();

    const name = document.getElementById('cus_name').value;
    const phone = document.getElementById('cus_phone').value;
    const address = document.getElementById('cus_address').value;
    const payment = document.getElementById('payment_method').value;

    if (cart.length === 0) {
        alert("আপনার কার্ট খালি!");
        return;
    }

    let productList = "";
    let total = 0;
    cart.forEach((item, index) => {
        productList += (index + 1) + ". " + item.name + " - " + item.price + " TK%0A";
        total += item.price;
    });

    // এখানে আপনার ৮৮ সহ নম্বরটি দিন (যেমন: 88017XXXXXXXX)
    const myNumber = "8801317515963"; 

    const message = "নতুন অর্ডার!%0A" + 
                    "নাম: " + name + "%0A" + 
                    "ফোন: " + phone + "%0A" + 
                    "ঠিকানা: " + address + "%0A" + 
                    "পেমেন্ট: " + payment + "%0A%0A" + 
                    "প্রোডাক্টস:%0A" + productList + 
                    "মোট দাম: " + total + " TK";

    const url = "https://api.whatsapp.com/send?phone=" + myNumber + "&text=" + message;
    
    window.location.href = url;
    localStorage.removeItem('cart');
}

// ৮. পেজ লোড হলে সব শুরু করা
document.addEventListener('DOMContentLoaded', () => {
    displayProducts();
    displayCart();
});