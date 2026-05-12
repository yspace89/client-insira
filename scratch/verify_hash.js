const bcrypt = require('bcryptjs');
const password = 'password123';
const hash = '$2b$10$JWCGkUdQGghT3AsyLRS8DOBtMER0on0Mbv3PzFHJh8OCkL30j/hDe';

bcrypt.compare(password, hash, (err, res) => {
    console.log('Password match:', res);
    if (err) console.error(err);
});
