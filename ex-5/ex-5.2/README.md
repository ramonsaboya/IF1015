# REST client

# Running

To run the client:
```
node client.js <method> <path> <response type> <body>
```

In which:
- `method` is either `GET` or `POST`
- `path` the requested path. E.g. "/tvshows/", "/tvshows/1/episodes/", ...
- `response type` is either `json` or `xml`
- `body` is a JSON string (or `""` for empty)
