#!/bin/bash

if [ -z "$1" ]
then
      echo "ERROR: 'App name should be specified as parameter'";
      exit 1;
fi


mkdir $1
cd $1

npm init -y
npm install express ejs nodemon dotenv body-parser mongoose --save

touch app.js
echo "const express = require('express');
const bodyparser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.get('/', (req, res)=>{
    res.send('Hello');
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(\`Server started on port \${port}\`)
});" > app.js 
mkdir views
touch views/index.js
echo "<h1>Welcome to the Express App</h1>" > views/index.js
mkdir config
touch config/config.env
echo "PORT=3000" > config/config.env
mkdir public
mkdir public/css
touch public/css/main.css
node app.js

