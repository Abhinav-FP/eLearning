module.exports = {
    apps: [
      {
        watch: true,
        name: "ELearning", // Name of your app
        script: "npm", // We are using npm to start the app
        args: "run dev", // Command to run your Next.js app in development mode
        env: {
          PORT: 3000, // Set the port to 3000
          NODE_ENV: "development" // Set the environment to development
        },
        env_production: {
          PORT: 3000, // Set the port to 3000 for production as well
          NODE_ENV: "production" // Set the environment to production
        }
      }
    ]
  };