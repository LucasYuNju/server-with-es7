#!/bin/bash
# nginx conf: /usr/local/etc/nginx/nginx.conf
cp -r ./public/* /usr/local/Cellar/nginx/1.10.0/html;
sudo nginx -s reload;
