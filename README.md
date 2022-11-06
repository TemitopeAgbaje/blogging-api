# Blogging-api
Altschool assessment in blog api

--

### Try the api.
-----

- [x] create a new user (POST, /signup)
```json
{
   "first_name": "Khan",
   "last_name": "Tir",
   "email": "TirKhan@yummy.ng",
   "password": "Kh@ntir123"
}
```
- [x] Log into the application (POST, /login)

```json
{
  "email": "TirKhan@yummy.ng",
  "password": "Kh@ntir123"
}
```
** Remember to add the - Authorization: Bearer {token} 

- [x] Add blog (POST, /blog/post)

```json
{
    "title": "My day",
    "description": "My day in a few words",
    "author": "Khan Tir",
    "tags": ["day", "Lorem"],
    "body":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus architecto enim cum tempore autem at, porro ad et nisi vel delectus aliquid! Ipsam odit saepe eaque sed fugiat dolores expedita perspiciatis ipsum tempore, iusto tenetur repellendus ratione esse blanditiis rerum voluptas officia adipisci alias enim ad dicta illo? Porro, non."
 }
 
```
- [x] Get blog posts (GET, /blog/posts)

##Response
```json
{
    "status": "New Post",
    "blogPost": {
        "title": "My day",
        "description": "My day in a few words",
        "author": "Khan Tir",
        "state": "draft",
        "read_count": 1,
        "reading_time": "1 mins",
        "tags": [
            "day",
            "Lorem"
        ],
        "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus architecto enim cum tempore autem at, porro ad et nisi vel delectus aliquid! Ipsam odit saepe eaque sed fugiat dolores expedita perspiciatis ipsum tempore, iusto tenetur repellendus ratione esse blanditiis rerum voluptas officia adipisci alias enim ad dicta illo? Porro, non.",
        "timestamp": "2022-11-06T23:37:43.273Z",
        "_id": "63684547a7cd0b68f27debb9",
        "__v": 0
    }
}
  
```
    
- [x] Update the blog (PUT, /blog/post/:id)

```json
{
  "state": "published"
}
```

