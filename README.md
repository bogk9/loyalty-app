
# Loyalty APP

Starbucks-inspired application dedicated to small businesses that allows users to earn points that can later be redeemed for rewards.

The package consists of a functional client with implemented Auth0 SMS OTP authentication and a mock server created with Node, Express.js serving user data after successful verification of the access token. 

 

## Screenshots

![App Screenshot](https://i.postimg.cc/RCY0pZGY/points-app-main.png)

## Tech description

A simple Express server was created for the client application, which returns a JSON object from the Atlas MongoDB database on requests, for example:

```{"_id":"6297a57490be37346cc0af37","username":"+48507489848","joined":"2022-06-01T18:04:33.471Z","points":"0"}```

The data is returned after the ```access_token``` included in the Authorization header is validated.

Redux logic is divided into two reducers: ```userReducer``` and ```dataReducer```. User reducer is responsible for authentication: it checks if token exists in memory, performs login and logout of the user. Data reducer is responsible for fetching data from the server.


When the user opens the application, the splash screen is displayed and ```checkToken()``` thunk is called.

The token check thunk checks to see if there is an ```access_token``` stored in async_storage. If so, its expiration date is verified. If the token is valid, a ``CHECK_SUCCESS`` action is sent that sets the ``access_token`` state property. 

If the token is not in memory, a ```CHECK_NO_TOKEN``` action is sent. The user must then log in manually. After successful login, in login thunk, ```access_token``` and ```refresh_token``` are written to async storage and finally ```SIGNIN_SUCCESS``` action is dispatched.

If the token is about to expire, the renew API is called with ```refresh_token``` (from asynchronous storage). If successful, a ```CHECK_RENEW_TOKEN``` action is dispatched with a new access token.

Note: For the thunk responsible for logging in to work correctly, the access_token after decoding JWT must contain a username field containing the phone number from which the OTP code was requested. To do this, you need to set a custom rule in auth0 panel - see auth0 documentation and line 41 of server.js in /mock-server.


## Tech Stack

**Client:** React Native with Expo SDK, Auth0 API.

**Server:** Node, Express, MongoDB


## License

[cc0-1.0](https://choosealicense.com/licenses/)

