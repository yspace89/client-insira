const bcrypt = require('bcryptjs');
const pass = 'YSpaceSecure2026!';
const hash = bcrypt.hashSync(pass, 10);
console.log('Hash for YSpaceSecure2026! is:', hash);

const isValid = bcrypt.compareSync(pass, hash);
console.log('Is valid:', isValid);
