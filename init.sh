#!/bin/bash

# Wanted this as a dockerfile, but as it is ran in a LXC environment, it couldn't be dockerise
# base - ubuntu:16.04

apt-get update
apt-get -y install nginx
mkdir /var/www/scriptOut
cd /var/www/scriptOut

apt-get install -y nodejs npm
ln -s /usr/bin/nodejs /usr/bin/node
npm install pm2
git clone 

