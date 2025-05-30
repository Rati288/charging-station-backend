const express = require('express');
const router = express.Router();

router.post('/register', (req, res) => {
  // Your registration logic here
  res.send('Register route works');
});

module.exports = router;
