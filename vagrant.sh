#!/usr/bin/env bash
apt-get update
apt-get install -y apache2 vim php5

# set web root
rm -rf /var/www/html
ln -fs /vagrant /var/www/html

# conf apache
sudo echo "export APACHE_RUN_USER=vagrant" >> /etc/apache2/envvars
sudo echo "export APACHE_RUN_GROUP=vagrant" >> /etc/apache2/envvars

sudo service apache2 restart
