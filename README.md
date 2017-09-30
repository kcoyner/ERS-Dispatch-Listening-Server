# Dispatch-Listening-Server
AWS Elastic Beanstalk server listening for dispatches sent from Dispatch Center

#### Prerequisites
  * awsebcli -- AWS ElasticBeanstalk CLI [install using pip]
  * an AWS account and understanding of how to launch a Node based
    ElasticBeanstalk server.

#### Notes
  * If you want to ssh into the EC2 instance, you'll need a keypair for that
    instance. Check your EC2 Dashboard.
  * Until actual data is sent to the server, use util/callGenerator.js to
    generate calls.  Run it with `node ./callGenerator.js`. The node server
    must be running.
  * Run callGenerator on the EC2 instance if you want.  On a Beanstalk node
    based server, you'll find the node binary at:
      /opt/elasticbeanstalk/node-install/node-v6.11.1-linux-x64/bin 
    It is not mapped out in the PATH environment variable, so you'll have to
    call its absolute path.

