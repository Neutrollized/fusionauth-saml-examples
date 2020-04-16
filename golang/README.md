# Golang example
Taken from [Russell Haering's Go Implementation of SAML 2.0](https://github.com/russellhaering/gosaml2) library, what I did was modify his [demo.go](https://github.com/russellhaering/gosaml2/blob/master/s2example/demo.go) and added a test home page and `/login` path to redirect to the FusionAuth for login 

### Requirements
- golang

I set this up on Ubuntu 18.04: `sudo apt-get install golang` and then exported the `$GOPATH` env variable

### Certs?
Unlike some of my other examples, the cool thing about Russell's implementation is that it pulls the IdP's cert from the metadata rather than needing you to provide (local) path the the cert.  As for the SP's certs, we've set `SignAuthnRequests` to `false` so there's nothing for the IdP to decrypt.  Obviously you'd want to set this to `true` in a production environment.

### Populate [sp.go](./sp.go)
- replace `[NODE PUBLIC IP]` with the public IP of your server
- replace the `[SAML v2 ____ URL]`s with the appropriate URLs from your FusionAuth Application's settings (you can find all of this by viewing your application's settings and then scrolling to the **SAML v2 Integration details** section)

### Build it (optional) and Run it!
`go build ./sp.go` which should build a `sp` binary that you can just run, or if you want it running in the background: `nohup ./sp &`

...and if you don't want ot build it, then it's just `go run ./sp.go` to run

Go to: **http://[NODE PUBLIC IP]:8080** 

## Known issues 
- when given the prompt, to login from the FusionAuth IdP, even if you login with a user that's not registered with this particular application, you'll still get directed to the callback URL.  I assume this to be a limitation to the simplicity of this Node SAML SP tester.  However, if you look in your FusionAuth's Dashboard under **Recent Logins**, only registered users for the appropriate applications will show up there, so I can only trust that it means users that aren't registered with the application don't actually get logged in
