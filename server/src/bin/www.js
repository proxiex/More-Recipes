import * as http from 'http';
import app from '../app';


import 'dotenv';
 
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

console.log('Server is up @ '+port);