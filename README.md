# Blogging-api
Altschool assessment in blog api

--

## Try the api.
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

##### Response
** you can query by read_count,state,reading_time,author,title or tags (eg. /blog/posts?read_count=1)

```json
{
    "status": "All Post Loaded",
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
- [x] Get a blog post (GET, /blog/post/:id)

##### Response

```json
{
    "status": "Post Loaded",
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
    
- [x] Update a blog (PUT, /blog/post/:id)

```json
{
  "state": "published"
}

```
##### Response
```json
{
    "status": "Post Loaded",
    "blogPost": {
        "_id": "63625a998ff518e4b496d4a8",
        "title": "My day",
        "state": "published",
        "read_count": 2,
        "reading_time": "1 mins",
        "body": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus architecto enim cum tempore autem at, porro ad et nisi vel delectus aliquid! Ipsam odit saepe eaque sed fugiat dolores expedita perspiciatis ipsum tempore, iusto tenetur repellendus ratione esse blanditiis rerum voluptas officia adipisci alias enim ad dicta illo? Porro, non.",
        "timestamp": "2022-11-02T11:55:05.578Z",
        "__v": 0,
        "author": "Khan Tir",
        "description": "My day in a few words",
        "tags": [
            "day",
            "yes"
        ]
    }
}

```

- [x] Delete the blog (DELETE, /blog/post/:id)

##### Response

```json
{
    "status": "Deleted  successful",
    "blogPost": {
        "acknowledged": true,
        "deletedCount": 1
    }
}
```

