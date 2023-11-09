// captureDeploymentDate.js
const fs = require('fs');

// Get the current date
const currentDate = new Date();

// Save the formatted date to an environment variable file (.env)
fs.writeFileSync('.env', `REACT_APP_DEPLOYMENT_DATE=${currentDate}`);
