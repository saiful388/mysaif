// ইউজার লগইন আছে কি না চেক করা
function checkAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const path = window.location.pathname;

    // যদি লগইন না থাকে এবং ইউজার হোমপেজে যাওয়ার চেষ্টা করে
    if (!isLoggedIn && !path.includes('login.html') && !path.includes('signup.html')) {
        window.location.href = 'login.html';
    }
}

// সাইনআপ ফাংশন
function signup(e) {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;

    if (user === "" || pass === "") {
        alert("দয়া করে নাম ও পাসওয়ার্ড দিন");
        return;
    }

    localStorage.setItem('userData', JSON.stringify({ user, pass }));
    alert("আপনার অ্যাকাউন্ট তৈরি হয়েছে! এখন লগইন করুন।");
    window.location.href = 'login.html';
}

// লগইন ফাংশন
function login(e) {
    e.preventDefault();
    const user = document.getElementById('user').value;
    const pass = document.getElementById('pass').value;
    
    const storedData = localStorage.getItem('userData');

    if (!storedData) {
        alert("কোনো অ্যাকাউন্ট পাওয়া যায়নি! আগে সাইনআপ করুন।");
        window.location.href = 'signup.html';
        return;
    }

    const data = JSON.parse(storedData);

    if (data.user === user && data.pass === pass) {
        localStorage.setItem('isLoggedIn', 'true');
        alert("লগইন সফল হয়েছে!");
        window.location.href = 'index.html';
    } else {
        alert("ভুল নাম অথবা পাসওয়ার্ড! আবার চেষ্টা করুন।");
    }
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'login.html';
}