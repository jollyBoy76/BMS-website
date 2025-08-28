// Banking Management System JavaScript
// Data storage (in a real app, this would be a backend API)
let users = [
    {id: 1, username: "Sachin Kumar", email: "sachin.sy1441@gmail.com", phone: "8678812457", address: "RPS more, Danapur, PATNA", dob: "16/04/2005", password: "Mdth1441@"},
    {id: 2, username: "Sahil Kumar", email: "sahil123@gmail.com", phone: "9308759374", address: "Saguna more, Danapur, PATNA", dob: "25/08/2005", password: "Sahil123$"},
    {id: 3, username: "bilal", email: "bilal@gmail.com", phone: "2345678910", address: "RPS more, Danapur, PATNA", dob: "07/08/2006", password: "1@Password"}
];

let accounts = [
    {id: 2025080001, userID: 1, type: "Current", balance: 10400, history: ["Deposited Rs.50.00 on 11:01 PM, 26 August 2025", "Withdrawed Rs.150.00 on 11:01 PM, 26 August 2025", "Withdrawed Rs.1000.00 on 11:01 PM, 26 August 2025", "Deposited Rs.10000.00 on 11:01 PM, 26 August 2025"]},
    {id: 2025080002, userID: 1, type: "Saving", balance: 8500, history: ["Deposited Rs.15000.00 on 11:18 PM, 26 August 2025", "Withdrawed Rs.7000.00 on 11:18 PM, 26 August 2025", "Withdrawed Rs.500.00 on 11:18 PM, 26 August 2025", "Deposited Rs.1000.00 on 11:18 PM, 26 August 2025"]},
    {id: 2025080003, userID: 2, type: "Current", balance: 1200, history: ["Deposited Rs.1500.00 on 11:22 PM, 26 August 2025", "Withdrawed Rs.300.00 on 11:23 PM, 26 August 2025"]},
    {id: 2025080004, userID: 3, type: "Saving", balance: 5000, history: ["Deposited Rs.5000.00 on 01:14 AM, 27 August 2025"]}
];

let currentUser = null;
let currentAccount = null;
let nextUserId = 4;
let nextAccountId = 2025080005;

/**
 * Shows a specific screen by hiding all others and displaying the target screen
 * @param {string} screenId - The ID of the screen to show
 */
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById(screenId).classList.add('active');
}

/**
 * Displays a temporary message to the user
 * @param {string} message - The message to display
 * @param {string} type - The type of message ('success' or 'error')
 */
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
    messageDiv.textContent = message;
    
    const currentScreen = document.querySelector('.screen.active');
    currentScreen.insertBefore(messageDiv, currentScreen.firstChild);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

/**
 * Validates email format using regex
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateEmail(email) {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * Validates password strength requirements
 * @param {string} password - Password to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validatePassword(password) {
    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecial = /[^A-Za-z0-9]/.test(password);
    const minLength = password.length >= 8;
    
    return hasLower && hasUpper && hasDigit && hasSpecial && minLength;
}

/**
 * Validates phone number format (10 digits)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validatePhone(phone) {
    return /^\d{10}$/.test(phone);
}

/**
 * Registers a new user with validation
 */
function registerUser() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const phone = document.getElementById('reg-phone').value.trim();
    const address = document.getElementById('reg-address').value.trim();
    const dob = document.getElementById('reg-dob').value;
    const password = document.getElementById('reg-password').value;

    // Validate all fields are filled
    if (!name || !email || !phone || !address || !dob || !password) {
        showMessage('Please fill all fields!', 'error');
        return;
    }

    // Check if username already exists
    if (users.find(user => user.username === name)) {
        showMessage('Username not available! Try again.', 'error');
        return;
    }

    // Validate email format
    if (!validateEmail(email)) {
        showMessage('Invalid email format!', 'error');
        return;
    }

    // Validate phone number
    if (!validatePhone(phone)) {
        showMessage('Phone number must be exactly 10 digits!', 'error');
        return;
    }

    // Validate password strength
    if (!validatePassword(password)) {
        showMessage('Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 digit, and 1 special character!', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: nextUserId++,
        username: name,
        email: email,
        phone: phone,
        address: address,
        dob: dob,
        password: password
    };

    users.push(newUser);
    showMessage('Registration successful! You can now login.', 'success');
    
    // Clear form
    document.getElementById('reg-name').value = '';
    document.getElementById('reg-email').value = '';
    document.getElementById('reg-phone').value = '';
    document.getElementById('reg-address').value = '';
    document.getElementById('reg-dob').value = '';
    document.getElementById('reg-password').value = '';
    
    setTimeout(() => {
        showScreen('login');
    }, 2000);
}

/**
 * Authenticates user login
 */
function loginUser() {
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    if (!username || !password) {
        showMessage('Please enter both username and password!', 'error');
        return;
    }

    const user = users.find(u => u.username === username);
    if (!user) {
        showMessage('User doesn\'t exist!', 'error');
        return;
    }

    if (user.password !== password) {
        showMessage('Wrong password!', 'error');
        return;
    }

    currentUser = user;
    document.getElementById('user-name-display').textContent = user.username;
    displayUserInfo();
    showMessage('Login successful!', 'success');
    
    setTimeout(() => {
        showScreen('user-dashboard');
    }, 1500);
}

/**
 * Displays current user's information in the dashboard
 */
function displayUserInfo() {
    const userInfoDiv = document.getElementById('user-info-display');
    userInfoDiv.innerHTML = `
        <h3> Your Information</h3>
        <p><strong> Email:</strong> ${currentUser.email}</p>
        <p><strong> Phone:</strong> ${currentUser.phone}</p>
        <p><strong> Address:</strong> ${currentUser.address}</p>
        <p><strong> DOB:</strong> ${currentUser.dob}</p>
    `;
}

/**
 * Creates a new bank account for the current user
 */
function createAccount() {
    const type = document.getElementById('account-type').value;
    
    // Check if user already has this type of account
    const existingAccount = accounts.find(acc => acc.userID === currentUser.id && acc.type === type);
    if (existingAccount) {
        showMessage(`You already have a ${type} account!`, 'error');
        return;
    }

    const newAccount = {
        id: nextAccountId++,
        userID: currentUser.id,
        type: type,
        balance: 0.00,
        history: []
    };

    accounts.push(newAccount);
    showMessage(`${type} Account Created! Account ID: ${newAccount.id}`, 'success');
    
    setTimeout(() => {
        showScreen('user-dashboard');
    }, 2000);
}

/**
 * Loads and displays all accounts for the current user
 */
function loadAccounts() {
    const userAccounts = accounts.filter(acc => acc.userID === currentUser.id);
    const accountsList = document.getElementById('accounts-list');
    
    if (userAccounts.length === 0) {
        accountsList.innerHTML = '<p>You don\'t have any accounts yet. Please create one first.</p>';
        return;
    }
    
    accountsList.innerHTML = '';
    userAccounts.forEach(account => {
        const accountDiv = document.createElement('div');
        accountDiv.className = 'account-card';
        accountDiv.innerHTML = `
            <h4>${account.type} Account</h4>
            <p><strong>Account ID:</strong> ${account.id}</p>
            <p><strong>Balance:</strong> Rs.${account.balance.toFixed(2)}</p>
            <button class="menu-btn" onclick="selectAccount(${account.id})">Select Account</button>
        `;
        accountsList.appendChild(accountDiv);
    });
}

/**
 * Selects an account for transactions
 * @param {number} accountId - ID of the account to select
 */
function selectAccount(accountId) {
    currentAccount = accounts.find(acc => acc.id === accountId);
    document.getElementById('account-info').textContent = `${currentAccount.type} Account (ID: ${currentAccount.id})`;
    updateBalanceDisplays();
    showScreen('account-dashboard');
}

/**
 * Updates balance displays across all screens
 */
function updateBalanceDisplays() {
    document.getElementById('balance-display').textContent = currentAccount.balance.toFixed(2);
    document.getElementById('current-balance-deposit').textContent = currentAccount.balance.toFixed(2);
    document.getElementById('current-balance-withdraw').textContent = currentAccount.balance.toFixed(2);
}

/**
 * Performs a deposit transaction
 */
function performDeposit() {
    const amount = parseFloat(document.getElementById('deposit-amount').value);
    
    if (!amount || amount <= 0) {
        showMessage('Please enter a valid amount!', 'error');
        return;
    }

    currentAccount.balance += amount;
    const timestamp = new Date().toLocaleString();
    const historyEntry = `Deposited Rs.${amount.toFixed(2)} on ${timestamp}`;
    currentAccount.history.push(historyEntry);
    
    showMessage('Deposit successful!', 'success');
    document.getElementById('deposit-amount').value = '';
    updateBalanceDisplays();
    
    setTimeout(() => {
        showScreen('account-dashboard');
    }, 2000);
}

/**
 * Performs a withdrawal transaction
 */
function performWithdraw() {
    const amount = parseFloat(document.getElementById('withdraw-amount').value);
    
    if (!amount || amount <= 0) {
        showMessage('Please enter a valid amount!', 'error');
        return;
    }

    if (amount > currentAccount.balance) {
        showMessage('Insufficient funds!', 'error');
        return;
    }

    currentAccount.balance -= amount;
    const timestamp = new Date().toLocaleString();
    const historyEntry = `Withdrew Rs.${amount.toFixed(2)} on ${timestamp}`;
    currentAccount.history.push(historyEntry);
    
    showMessage('Withdrawal successful!', 'success');
    document.getElementById('withdraw-amount').value = '';
    updateBalanceDisplays();
    
    setTimeout(() => {
        showScreen('account-dashboard');
    }, 2000);
}

/**
 * Displays transaction history for the current account
 */
function displayHistory() {
    const historyList = document.getElementById('history-list');
    
    if (currentAccount.history.length === 0) {
        historyList.innerHTML = '<p>No transaction history available.</p>';
        return;
    }
    
    historyList.innerHTML = '';
    currentAccount.history.forEach((entry, index) => {
        const historyDiv = document.createElement('div');
        historyDiv.className = 'history-item';
        historyDiv.innerHTML = `<strong>${index + 1}.</strong> ${entry}`;
        historyList.appendChild(historyDiv);
    });
}

/**
 * Logs out the current user and resets the session
 */
function logout() {
    currentUser = null;
    currentAccount = null;
    document.getElementById('login-username').value = '';
    document.getElementById('login-password').value = '';
    showScreen('main-menu');
    showMessage('Logged out successfully!', 'success');
}


/**
 * Exits the application with confirmation
 * Note: window.close() only works for popup windows in modern browsers
 */
// function exitApp() {
//     if (confirm('Are you sure you want to exit?')) {
//         alert('Thank you for using Banking Management System!');
        
//         // Option 1: Try to close (works only for popup windows)
//         try {
//             window.close();
//         } catch (e) {
//             // If close fails, redirect or show message
//             console.log('Cannot close window programmatically');
//         }
        
//         // Option 2: Redirect to a blank page or homepage
//         // window.location.href = 'about:blank';
        
//         // Option 3: Clear the page content
//         document.body.innerHTML = `
//             <div style="display: flex; justify-content: center; align-items: center; height: 100vh; 
//                         background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
//                         font-family: 'Segoe UI', sans-serif; text-align: center; color: white;">
//                 <div style="background: rgba(255,255,255,0.1); padding: 40px; border-radius: 20px; 
//                            backdrop-filter: blur(10px);">
//                     <h1 style="margin-bottom: 20px;">🏦 Banking System</h1>
//                     <p style="font-size: 1.2em; margin-bottom: 20px;">Session Ended</p>
//                     <p>Thank you for using our Banking Management System!</p>
//                     <button onclick="location.reload()" 
//                             style="margin-top: 20px; padding: 12px 24px; background: #3498db; 
//                                    color: white; border: none; border-radius: 8px; cursor: pointer; 
//                                    font-size: 1em;">
//                         🔄 Restart Application
//                     </button>
//                 </div>
//             </div>
//         `;
//     }
// }

// Event listeners and initialization
document.addEventListener('DOMContentLoaded', function() {
    // Event listener for Enter key
    document.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const activeScreen = document.querySelector('.screen.active');
            if (activeScreen.id === 'login') {
                loginUser();
            } else if (activeScreen.id === 'register') {
                registerUser();
            }
        }
    });

    // Initialize load accounts screen when shown
    const loadAccountScreen = document.getElementById('load-account');
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (loadAccountScreen.classList.contains('active')) {
                    loadAccounts();
                }
            }
        });
    });
    observer.observe(loadAccountScreen, { attributes: true });

    // Initialize history screen when shown
    const historyScreen = document.getElementById('history');
    const historyObserver = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (historyScreen.classList.contains('active')) {
                    displayHistory();
                }
            }
        });
    });
    historyObserver.observe(historyScreen, { attributes: true });
});

// Export functions for module usage (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        showScreen,
        showMessage,
        validateEmail,
        validatePassword,
        validatePhone,
        registerUser,
        loginUser,
        createAccount,
        performDeposit,
        performWithdraw,
        logout,
        showHelp,
        exitApp
    };
}