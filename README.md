# InvSee

InvSee is a mod which allows users to view inventories of the players along the server on the [webpage]()! Not only inventory but also AE2 and RS network. Mod also has support for curios slots

## Installation

You can install mod via [Curseforge](https://www.curseforge.com/) and [Modrinth](https://modrinth.com/) !



## Api Calls

If you want to use data from your server on your own Webpage you can use our api for that. Jus simply search for server id and thats it

### Javascript
```javascript
fetch(`http://invsee.com/api/?api_key=${CLIENT_SECRET}&server_ip=${YOUR_SERVER_IP}`)
```
### Python
```python
import requests
requests.get(f'http://invsee.com/api/?api_key={CLIENT_SECRET}&server_ip={YOUR_SERVER_IP}')
```
### Java
```java
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import okhttp3.ResponseBody;

// in class

OkHttpClient client = new OkHttpClient();
String url = "http://invsee.com/api/?api_key=" +  CLIENT_SECRET + "&server_ip=" YOUR_SERVER_IP;

Request request = new Request.Builder().url(url).build();
Response response = client.newCall(request).execute();

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change

Please make sure to update tests as appropriate.

## License