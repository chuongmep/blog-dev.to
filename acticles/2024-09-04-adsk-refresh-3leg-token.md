
## Introduction

The reason I write this post is that I have seen many people asking how to refresh a 3-legged token, especially when working with Autodesk Forge APIs. Recently, I have been receiving a lot of questions about this topic.

With [aps-toolkit](https://github.com/chuongmep/aps-toolkit) library relate to topic [Autodesk Platform Services Toolkit Published](https://chuongmep.com/posts/2024-02-26-Autodesk-Platform-Services-Toolkit-Published.html#autodesk-platform-services-toolkit-published), refreshing a 3-legged token is a simple task. This post shows how to do it in Python. I fogot to mention that you need to install the library first. 

1. You can do it by running the following command:

```bash
pip install aps-toolkit --upgrade
```

2. You need make sure that you have setting environment variables for `APS_CLIENT_ID`, `APS_CLIENT_SECRET`,`APS_CALLBACK_URL`, and `APS_REFRESH_TOKEN`. It can more easy to use command line with macos or linux:

```bash
export APS_CLIENT_ID=your_client_id
export APS_CLIENT_SECRET=your_client_secret
export APS_CALLBACK_URL=your_callback_url
export APS_REFRESH_TOKEN=your_refresh_token
```
In case you are using Windows, you can use the following command:

```bash
set APS_CLIENT_ID=your_client_id
set APS_CLIENT_SECRET=your_client_secret
set APS_CALLBACK_URL=your_callback_url
set APS_REFRESH_TOKEN=your_refresh_token
```

3. Login and Refresh 3-legged token, use code below to automate the process:

```python
import os
from aps_toolkit import Auth, Token
refresh_token = os.getenv('APS_REFRESH_TOKEN')
token = Token(refresh_token=refresh_token)
if refresh_token is not None:
    # try to login automation 
    try:
        client_id = os.getenv('APS_CLIENT_ID')
        client_secret = os.getenv('APS_CLIENT_SECRET')
        token.refresh(client_id,client_secret)
        token.set_env()
        print('Token refreshed')        
    except Exception as e:
        print('Token refresh failed, trying 3leg auth')
        auth = Auth()
        token = auth.auth3leg()
        token.set_env()
```

The above code allows you to easily refresh a 3-legged token, don't need so much worries about token can expire in `60 minutes`. However, keep in mind that you'll need to repeat the login process after `15` days due to refresh token expiration.

## What is changed recently?

I changed the result of token relate to expire time, it will be `timestamp` with `float` type. It will be more easy to compare with current time to check if token is expired or not. Example code below:

```python
import os
from aps_toolkit import Auth, Token
refresh_token = os.getenv('APS_REFRESH_TOKEN')
token = Auth().auth3leg()
expire_time = token.expires_in
print(expire_time)
```

The code above will print out the expire time of the token in seconds before with result is 3600, but with new version of `aps-toolkit` it will be `timestamp` with `float` type, you can compare with current time to check if token is expired or not.

```python
def is_expired(self, buffer_minutes=0) -> bool:
        """
        Check if the token is expired
        :return: True if the token is expired, False otherwise
        """
        time_stamp_now = time.time()
        if self.expires_in is None:
            return False
        if time_stamp_now + buffer_minutes * 60 >= self.expires_in:
            return True
        return False
```

May be you use function [is_expired](https://github.com/chuongmep/aps-toolkit/blob/9b0e2a781f2d678147a89a3689a11fa6723f62c0/APSToolkitPython/src/aps_toolkit/Token.py#L64-L74) added in [Token](https://github.com/chuongmep/aps-toolkit/blob/dev/APSToolkitPython/src/aps_toolkit/Token.py) class to check if token is expired or not. 

```python
from aps_toolkit import Auth, Token
refresh_token = os.getenv('APS_REFRESH_TOKEN')
token = Auth().auth3leg()
is_expired = token.is_expired()
```

## Conclusion

I hope this post has been helpful. If you have any questions, please don't hesitate to ask—I'm more than happy to assist!

## Resources

- [aps-toolkit](https://github.com/chuongmep/aps-toolkit)

- [et a 3-Legged Token with Authorization Code Grant](https://aps.autodesk.com/en/docs/oauth/v2/tutorials/get-3-legged-token/)