# Generic REST API with Persistence

This project contains a basic REST API featuring a router and file-system persistance. You can access the API by making an HTTP request to one of the endpoints listed below.

## Resources
The following resources are available for storage and retrieval:

Note: ids are automatically generated.

```js
function Contact() {
  id: '6c5036a6-913d-4475-91b0-084e4115e61b'
  firstName: 'Abraham'
  lastName: 'Lincoln'
  email: 'abraham@lincoln.com'
  phone: '1-800-ABRAHAM'
}
```
```js
function Note() {
  id: '6c5036a6-913d-4475-91b0-084e4115e61b'
  name: 'TPS Reports'
  content: 'Did you get the memo?'
}
```

## Contact Endpoints

### GET `/api/contact?id=`
Gets a JSON representation of a Contact with the specified id.

### PUT `/api/contact?id=`
Updates a Contact with the specified id. The body of the request should be a serialized JSON object containing the updated property values.

### POST `/api/contact`
Creates a Contact object. The body of the request should be a serialized JSON object. \containing the Contact's property values.

### DELETE `/api/contact?id=`
Deletes a Contact object with the specified id.

## Note Endpoints

### GET `/api/note?id=`
Gets a JSON representation of a Contact with the specified id.

### PUT `/api/note`
Updates a Note with the specified id. The body of the request should be a serialized JSON object containing the updated property values.

### POST `/api/note?id=`
Creates a Note object. The body of the request should be a serialized JSON object. \containing the Note's property values.

### DELETE `/api/note?id=`
Deletes a Contact with the specified id.
