# How this repository is organized

This repository is broken down into two parts: this README.md is in the root of the repository and contains source code to run an *Express* node server with a proxy. The second part is in the *grocery-list* folder which contains the Angular application.


This was done this way to facilitate deployment to *Heroku* since it looks in the root folder to decide how to deploy. This deployment strategy was chosen for its simplicity for resolving the issue with *CORS* and it follows the approach used by *ng serve*