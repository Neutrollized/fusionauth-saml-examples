# fusionauth-saml-examples
I was trying to POC [FusionAuth](https://fusionauth.io) and learn more about SAML/SSO and in doing so I came across very few examples examples (most were running both the IdP and SP in localhost and that doesn't give a reflective example of how it functions in the real world).  So after scouring the internet and reading up on some various programming basics, I have compiled here some examples of (relatively) easy to make SPs to interact & test with your FusionAuth implementation.

Yes, I'm aware the FusionAuth has their own [Client Libraries](https://fusionauth.io/docs/v1/tech/client-libraries/) page and repo to allow you to quickly integrate your app with it.  However, as I'm ju
st starting to learn more about SAML and SSO in general, I like to get my hands dirty as I find that's the best way to learn something.  

I run all my code/examples on a VM in the cloud as I needed something with a public IP (you can't put your callback URL as "localhost" as the internet won't know where that is), so in the pieces of code that I have has `[NODE PUBLIC IP]`, I mean just that -- the public IP of my test server that's running as the SP

You can follow [this guide](https://fusionauth.io/docs/v1/tech/samlv2/) from FusionAuth to set up your SAML Identity Provider (IdP).  Most of the stuff is straight forward, but you will need some stuff from your Service Provider (SP) and vice versa.  You what you put as **Issuer** in your IdP also needs to match what you put in your SP.  Depending on the code library that you use, sometimes the nameing of the various URLs aren't and exact match.  (i.e. Passport.js calls the **Login URL**, `entryPoint`) 

You will also have to create some users and register it with your application.  Assuming you're going to be creating fictitious users with bogus e-mails, be sure to untoggle the *Send email to setup password** to open up the menu for you to set their password at creation time.

## What this repo is and is **not**
Coding is not my forte and I'm not here to provide you a full solution to how to integrate your app with SAML/SSO.  What I did was find out what packages/libraries are out there for some popular programming languages and find out how to configure it to work with FusionAuth SAML and what the nuances are (if any) with each library.

## TODO
- Expand this repo to contain more than just SAML examples
