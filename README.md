## Project install steps: ##
* install nodejs runtime , mongodb and any http client(for testing purpose) in your localhost
* git clone Markup : https://github.com/akshaybhuradia2020/library_management_system.git or git@github.com:akshaybhuradia2020/library_management_system.git
* cd <proj dir>
* npm init -y
* npm i
* npm install pm2@latest -g <this is run server as background service>
* pm2 start main.js


## RestAPI Endpoints: ##

#### Endpoint : http://127.0.0.1:3000/api/users ####
#### Method : POST ####
#### Body : { "username": "vikas", "email": "vikas@gmail.com", "password": "12345678"} ####
#### Response : {"message": "USER IS REGISTERED","userreg": true} ####

#### Endpoint : http://127.0.0.1:3000/api/users/login?username=akshay&passwd=12345678 ####
#### Method : GET ####
#### PARAM : username=akshay&passwd=12345678 ####
#### Response : {"message": "CORRECT CREDENTIALS","uservalid": true,"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9**", "userid": "65c4dbe6c8a06f33c571d36c"} ####

#### Endpoint : http://127.0.0.1:3000/api/books ####
#### Method : POST ####
#### Body : { "title":"xy1z", "author": "x1yz", "isbn": "xy1z", "quantity":7 }
#### Headers : Authorization: token value from login api ####
#### Response : { "message": "Book is added" } ####


#### Endpoint : http://127.0.0.1:3000/api/books ####
#### Method : GET ####
#### Headers : Authorization: token value from login api ####
#### Response : { "results": {"_id": "65c518db2780dff66047807b","title": "xyz","author": "xyz","isbn": "xyz","quantity": 9,"__v": 0} } ####


#### Endpoint : http://127.0.0.1:3000/api/books/65c5c68fbdebdf9d9cc79c45 ####
#### Method : GET ####
#### Headers : Authorization: token value from login api ####
#### Response : { "results": {"_id": "65c518db2780dff66047807b","title": "xyz","author": "xyz","isbn": "xyz","quantity": 9,"__v": 0} } ####


#### Endpoint : http://127.0.0.1:3000/api/borrow/65c518db2780dff66047807b/65c4dbe6c8a06f33c571d36c ####
#### Method : POST ####
#### Headers : Authorization: token value from login api ####
#### Response : { "message": "book is borrowed" } ####


#### Endpoint : http://127.0.0.1:3000/api/return/65c518db2780dff66047807b/65c4dbe6c8a06f33c571d36c ####
#### Method : POST ####
#### Headers : Authorization: token value from login api ####
#### Response : { "message": "book is returned" } ####

#### Endpoint : http://127.0.0.1:3000/api/users/65c4dbe6c8a06f33c571d36c/books ####
#### Method : GET ####
#### Headers : Authorization: token value from login api ####
#### Response : {"results": [{"_id": "65c54d6431c6283ac974335e","bookid": "65c518db2780dff66047807b"}]} ####


