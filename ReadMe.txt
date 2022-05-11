//1
In this project first we created an empty array (of objects) to act as local DBs for

//2
we can check the contents of DB /array from this end point "/users" [get method]
now we add data into our array by going into this end point "/users" [post method]..
content type should be application/json and structure should be 
{
    "name" : "abc",
    "password" : "xyz"
}
we can add as many user as we want by going and going into this end point with POST method and given JSON structure


//3
now the third step comes where we actually compares any  visitor's username and password with the password and name stored in the database few time ago
a) first we will check if the name does not present in DB, its discontinue.
b)then we proceed if we find the name, then we check the hashed password with the requested password from user..
  decoding/encoding of password during comparison will be taken care by bcrypt
c) here we are not taking into consideration that if 2 person have same name then what should happen...it will still go for the first person it will find and start processing its data