const { Clerk } = require("@clerk/clerk-sdk-node");

require("dotenv").config();

const clerk = new Clerk({
    apiKey: process.env.CLERK_PUBLISHABLE_KEY,
    apiSecret: process.env.CLERK_SECRET_KEY
});

module.exports = {
    clerkInstance: clerk,
    clerkAuthMiddleware: require("@clerk/clerk-sdk-node").ClerkExpressWithAuth()
};
