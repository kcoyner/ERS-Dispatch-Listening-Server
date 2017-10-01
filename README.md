![Emergency Response Solutions](http://gfd.dispatch.rustybear.com/public/images/ERS-logo.png)
# Emergency Response Solutions
## Dispatch-Listening-Server

AWS Elastic Beanstalk server listening for dispatches sent from Dispatch Center

### Prerequisites

  * awsebcli -- AWS ElasticBeanstalk CLI can be installed using pip.
    [See installing AWS CLI](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-install.html)
  * An AWS account and understanding of how to launch a Node based
    ElasticBeanstalk server.
    [Configure your dev environment](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/chapter-devenv.html#devenv-awscli)
    [Manage Elastic Beanstalk](https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/eb-cli3-getting-started.html)
  * For our project, we created a new AWS account from scratch, which we can
    easily pass on to the next group who works on the project. Contact Kevin
    for sign-in credentials (protected info since a personal credit card
    guarantees the account).

### Notes in no particular order

  * If you want to ssh into the EC2 instance (which is the actual virtual
    server that an ElasticBeanstalk (EB) instance is deployed to), you'll need
    a keypair for that particular EC2 instance. Check under the subsection Key
    Pairs in your EC2 Dashboard. You'll be able to create a keypair there for
    ssh purposes.

  * Until actual data is sent to the server, keep the invocation of
    startDummyCalls() in app.js uncommented. It will generate a new dummy call
    every hour. Set variables for dummy call timing in util/callGenerator.js.

  * You can use callGenerator on the EC2 instance to manually generate dummy
    calls.  On a Beanstalk node based server, you'll find the `node` binary at:

      `/opt/elasticbeanstalk/node-install/node-v6.11.1-linux-x64/bin`

    It is not mapped out in the PATH environment variable, so you'll have to
    call its absolute path. You'll have to ssh into the EC2 instance in order
    to invoke callGenerator.js with node.  During the presentation, I created
    dummy calls at will by issuing the command:

    `cd /var/app/current/util && /opt/elasticbeanstalk/node-install/node-v6.11.1-linux-x64/bin/node ./callGenerator.js`

    As the above line suggests, your deployed code can be found on the EC2
    server at

    `/var/app/current`

    As you might imagine, don't edit your code on the server.  Instead, deploy
    code from your local dev environment.  This is done with the `eb deploy`
    command from the top level of your local dev environment. You'll find dot
    files for EB here as well. They should not need to be edited unless you
    chose to create your own EB/EC2 instance.

  * In addition to the description above detailing how to generate dummy
    calls, you can generate dummy calls from your locally running version of
    this server as well.  Just run `node ./util/callGenerator.js` or for
    convenience I also set up `npm run makeDummyCall` in package.json.

  * When you create a EB instance, AWS will assign it a public facing URL
    based on your EB naming choices.  Ours was
    `ersDispatch-dev.us-west-1.elasticbeanstalk.com`.  Our EB instance is
    still running and can be used by the next group.

  * Note that the actual Greenwich Dispatch Center tech desk will soon be
    posting live calls to `gfd.dispatch.rustybear.com`. This is a CNAME that
    currently points to `ersDispatch-dev.us-west-1.elasticbeanstalk.com`.
    Kevin controls this CNAME setting, so please contact him to redirect it if
    need be.

