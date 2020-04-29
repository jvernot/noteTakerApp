const express = require('express');

const app = express();

const PORT = process.env.PORT || 1738;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());