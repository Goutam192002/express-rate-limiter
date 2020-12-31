# express-rate-limiter
A simple middleware implementation which rate limits the number of requests coming from an IP Address
Uses redis..which stores key-value pair of `ip-address` and `hits`.

Example Usage:

Do not allow more than 10 requests per minute
```javascript
const limiter = require('./middleware/rate-limiter');

app.use(limiter({
  expiry: 60, 
  limit: 10
});
```
