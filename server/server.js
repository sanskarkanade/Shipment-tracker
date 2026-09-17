const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectdb = require('./config/db.js')

dotenv.config();

connectdb();

const app = express()
app.use(cors({origin : "*"}));
app.use(express.json());

app.use('/api/ship', require('./routes/shipmentRoute.js'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
