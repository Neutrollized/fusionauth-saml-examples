# fusionauth-saml-examples
I was trying to POC FusionAuth and learn more about SAML/SSO and in doing so I came across very few examples examples (most were running both the IdP and SP in localhost and that doesn't give a reflective example of hhow it functions in the real world).  So after scouring the internet and reading up on some various programming basics, I have compiled here some examples of (relatively) easy to make SPs to interact & test with your FusionAuth implementation.

I run all my code/examples on a VM in the cloud as I needed something with a public IP (you can't put your callback URL as "localhost" as the internet won't know where that is), so in the pieces of code that I have has `[NODE PUBLIC IP]`, I mean just that -- the public IP of my test server that's running as the SP


## TODO
- finish write up
- add images
