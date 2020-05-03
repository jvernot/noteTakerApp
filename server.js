const express = require('express');

const app = express();

const PORT = process.env.PORT || 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

//Port Listener
app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});