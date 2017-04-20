module.exports = (process) => {
  return {
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  };
}
