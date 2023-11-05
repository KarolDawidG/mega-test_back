module.exports = {
  apps: [
    {
      name: "Authentication_backend",
      script: "app.js",
      autorestart: true,
      max_memory_restart: "2G",
      exec_mode: "cluster",
      instances: -1,
    },
  ],
};
