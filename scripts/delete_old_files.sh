#!/bin/bash

cd /home/ubuntu/ersdispatch
rm -rf * .[^.]*

apt-get -y install nginx

rm -f /etc/nginx/sites-available/default

cd /etc/nginx/sites-available

wget https://s3.amazonaws.com/ers-dispatch/nginx-server.conf

mv /etc/nginx/sites-available/nginx-server.conf /etc/nginx/sites-available/default

service nginx restart

echo 'hello world' > /var/www/html/index.html

hostname >> /var/www/html/index.html

curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
apt-get -y install nodejs

exit 0
