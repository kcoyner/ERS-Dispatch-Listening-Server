#!/bin/bash

cd /home/ubuntu/ersdispatch
npm install
npm run build
chown ubuntu:ubuntu /home/ubuntu/ersdispatch/dist/bundle.*
npm start > /dev/null 2> /dev/null < /dev/null &

