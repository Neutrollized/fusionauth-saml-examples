# Python 3 example
Taken from [Tim Heap's GitHub](https://github.com/timheap/flask-saml2) (who also happens to be [flask_saml2](https://pypi.org/project/flask-saml2/)'s maintainer).

### Requirements
- python3-pip 
- flask-saml2

I set this up on Ubuntu 18.04: `sudo apt-get install python3-pip` to install `pip3` and followed by `pip3 install flask-saml2=0.3.0`

### Create certs
You'll need 3 certs/keys:
- public and private key for our app/SP.  You can generate this with `openssl req -x509 -newkey rsa:4096 -keyout keys/sp_key.pem -out keys/sp_cert.pem -nodes -days 900` -- it doesn't matter what you fill in really, just put something in.  Our SAML request will be encrypted with our private key and we'll have to provide our public key to the IdP so they can decrypt said request
- public key/cert of the IdP.  The IdP will encrypt their response with their private key, which is why we'll need their public key to decrypt it 

### Populate [sp.py](./sp.py)
- replace `[NODE PUBLIC IP]` with the public IP of your server
- replace the `[SAML v2 ____ URL]`s with the appropriate URLs from your FusionAuth Application's settings (you can find all of this by viewing your application's settings and then scrolling to the **SAML v2 Integration details** section)

### But where's the ISSUER?
There's no **issuer** field in the SAML2 options, so instead what you have to do here is put this SP's metadata URL (i.e. `http://[NODE PUBLIC IP]:9000/saml/metadata.xml`) in the **Issuer** field in FusionAuth

### Run it!
`./sp.py` or if you want it running in the background: `nohup ./sp.py &`

Go to: **http://[NODE PUBLIC IP]:9000**

## Known issues 
- the logut button works and does log you out, but doesn't redirect you back to the login page
- when given the prompt, to login from the FusionAuth IdP, even if you login with a user that's not registered with this particular application, you'll still get directed to the callback URL.  I assume this to be a limitation to the simplicity of this Node SAML SP tester.  However, if you look in your FusionAuth's Dashboard under **Recent Logins**, only registered users for the appropriate applications will show up there, so I can only trust that it means users that aren't registered with the application don't actually get logged in
