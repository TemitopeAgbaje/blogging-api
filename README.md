# blogging-api
Altschool assessment in blog api

--

## Requirements
1. User should be able to register 
2. User should be able to login with Passport using JWT
3. Implement basic auth
4. User should be able to get orders
5. Users should be able to create orders
6. Users should be able to update and delete orders
7. Test application


### THE ENDPOINTS
-------


| S.no   | route            | Method |  Description  |
| :---   |    :----        | ---:   |   :---        |
| 1      | "/signup"        | POST   |   create a new user |
| 2      | "/login"         | POST   |  log in to the app |
| 3      | "/blog/post"       | POST   |  add a new Blog           |
| 4      | "/blog/posts"      | GET    |    get all blog posts   |
| 5      | "/blog/post/:id"| GET   |   get a blog |
| 8      | "/blog/post/:id"     | DELETE | delete Blog By Id     |
| 9      | "/blog/post/:id"| PUT |updatong a blog post   |
| 10


### Here is a guide to using the application.
-----

- [x] create a new user 
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "username": "JohnDoe",
  "bio": "cool cat",
  "gender": "male",
  "email": "johnny@example.com,
  "password": "myverystrongpassword"
}
```
- [x] Log into the application

```json
{
  "email": "johnny@example.com,
  "password": "myverystrongpassword"
}
```

- [x] Post a new blog

```json
{
    title: "my new blog",
    "description": "Trying out blogging",
    "body": "lorem ipsum lorem ipsum lorem ipsum, lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
    tags: ["first", "lorem", "new"]
 }
```
    
- [x] Update the state of the blog to published

```json
{
  "state": "published"
}
```
Explore the rest of the endpoints
