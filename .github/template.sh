yq w _base.yml 'name' 'Artisan Playground [master]' | sed s/_BRANCHES_/master/g > workflows/master.yml
yq w _base.yml 'name' 'Artisan Playground [staging]' | sed s/_BRANCHES_/staging/g > workflows/staging.yml && cat _deploy.yml >> workflows/staging.yml
