# Node.js example
[Jeffry Houser's Medium blog post](https://medium.com/disney-streaming/setup-a-single-sign-on-saml-test-environment-with-docker-and-nodejs-c53fc1a984c9) got me started on this one.

### Requirements
[Node.js with npm](https://nodejs.org/en/download/)

I installed what came with Ubuntu 18.04: `sudo apt-get install nodejs npm`.  At the time of writing, it's `v8.10.0` and `3.5.2` for `node` and `npm` respectively.

You can install all the pre-reqs defined in [package.json](./package.json) with `npm install`

### Create certs
You'll need 3 certs/keys:
- public and private key for our app/SP.  You can generate this with `openssl req -x509 -newkey rsa:4096 -keyout certs/key.pem -out certs/cert.pem -nodes -days 900` -- it doesn't matter what you fill in really, just put something in.  Our SAML request will be encrypted with our private key and we'll have to provide our public key to the IdP so they can decrypt said request.
- public key of the IdP.  The IdP will encrypt their response with their private key, which is why we'll need their public key to decrypt it. 

### Populate [index.js](./index.js)
- replace `[NODE PUBLIC IP]` with the public IP of your server
- replace the `[SAML v2 ____ URL]`s with the appropriate URLs from your FusionAuth Application's settings (you can find all of this by viewing your application's settings and then scrolling to the **SAML v2 Integration details** section)
- replace [ISSUER] with a globally unique identifier for your app (typically you'd use your URL as that too is globally unique)

### Run it!
`node index` or if you want it running in the background: `nohup node index &`


## TODO
- finish write up
- add images