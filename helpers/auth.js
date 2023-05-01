const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

function createJWT(user) {
    return jwt.sign(
        // data payload
        { user },
        process.env.SECRET,
        { expiresIn: '24h' }
    );
}

async function isValidPassword(myPlaintextPassword, hash){
    const match = await bcrypt.compare(myPlaintextPassword, hash);

    return match
}


module.exports = {
    createJWT,
    isValidPassword
}