export const GET_OTP_OPTIONS = {
    method: 'POST',
    url: 'https://dev--idxzr33.us.auth0.com/passwordless/start',
    headers: {'content-type': 'application/json'},
    data: {
      client_id: 's03BJmMo6nZkhRQuzZsgh2D4iE6iARM6',
      connection: 'sms',
      phone_number: number,
      send: 'code'
    }
}


export const GET_TOKEN_OPTIONS = {
    method: 'POST',
    url: 'https://dev--idxzr33.us.auth0.com/oauth/token',
    headers: {'content-type': 'application/json'},
    data: {
      grant_type: 'http://auth0.com/oauth/grant-type/passwordless/otp',
      client_id: 's03BJmMo6nZkhRQuzZsgh2D4iE6iARM6',
      username: '+48507189848',
      otp: data.otp,
      realm: 'sms',
      audience: 'test-api',
      scope: 'openid profile email'
    }
}

