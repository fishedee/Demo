#!/bin/sh
wget https://dl.grafana.com/oss/release/grafana_6.3.5_amd64.deb
sudo dpkg -i grafana_6.3.5_amd64.deb
sudo service grafana-server start
