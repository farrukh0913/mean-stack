const express = require('express');
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Listen on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
