#!/usr/bin/env bash

echo "--------------Running: npm run build. Please wait..."
mkdir stg
npm run build:stg
name=$(date +'%d_%b_%Y_%I_%M')
zip -r stg/payments_ui_$name.zip build
scp stg/payments_ui_$name.zip deployer@13.235.43.139:/var/www/payments.awigntest.com/zips
ssh deployer@13.235.43.139 "bash /var/www/payments.awigntest.com/script.sh payments_ui_$name.zip"
