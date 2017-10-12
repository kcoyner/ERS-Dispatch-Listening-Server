

When deploying via `eb deploy`, the production webpack build is not building
bundle.js up on the EC2 server.  So for now it is being built locally and
uploaded.

Once this is fixed such that bundle.js is built on the server, then put
public/bundle.js in .gitignore.

Things to check to fix this: 
  * webpack script
  * if there's an eb command that needs to be fired in the ebconfig files to
    make npm run build
