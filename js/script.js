// function generateToken() {
//     const timestamp = Date.now(); // Current time in milliseconds
//     const randomValue = Math.random().toString(36).substring(2); // Random string
//     const token = btoa(timestamp.toString() + randomValue); // Combine and encode
//     console.log(token);
//     return token;
// }


// function generateSecureToken() {
//     const array = new Uint8Array(16); // Create a 16-byte array
//     window.crypto.getRandomValues(array); // Fill the array with cryptographically secure random values
//     const token1 = btoa(String.fromCharCode.apply(null, array)); // Convert to a string and encode
//     console.log(token1);
//     return token1;
// }


// Simulate a function to generate a token with expiration
function generateTokenWithExpiration() {
    const token = btoa(Date.now().toString() + Math.random().toString(36).substring(2));
    // combining current timestamp with random string and them encoding it using base64
    //substring(2) remnoves first 2 characters of the string cuz math.random().tostring(36) starts with 0
    // btoa() this function encodes a string using Base64 encoding. Base64 is a method of encoding binary diary into an ACII string,
    const expirationTime = Date.now() + 5 * 1000; //currently 10 seconds
    localStorage.setItem('token', JSON.stringify({ token, expirationTime })); //stores as json string
    return token;
}

function bruh(profile) {
    const token = generateTokenWithExpiration();
    window.location.href = `${profile}.html?token=${token}`;
}

function validateToken() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    const storedTokenData = localStorage.getItem('token');
    if (storedTokenData) {
        const { token: storedToken, expirationTime } = JSON.parse(storedTokenData); //parse json converts the json string back to a javascript object
        // stores values from the json object in storedToken and expirationTime
        if (token === storedToken && Date.now() < expirationTime) {
            console.log('Access granted.');
            return true;
        }
    }

    alert('Access denied. Invalid or expired token.');
    window.location.href = 'index.html';
    return false;
}

if (window.location.pathname.includes('profile1.html') || window.location.pathname.includes('profile2.html')) {
    validateToken();
}