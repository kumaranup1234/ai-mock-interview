const {JWT_EXPIRATION,JWT_SECRET,MONGO_URI} = process.env;

module.exports = {
    JWT_SECRET:JWT_SECRET,
    MONGO_URI:MONGO_URI,
    JWT_EXPIRATION:JWT_EXPIRATION
}