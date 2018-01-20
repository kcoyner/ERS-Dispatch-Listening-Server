#!/bin/bash

# HOST='stn4.homelinux.com'
HOST='pca.homelinux.com'
# HOST='aws.somehwere.com'

if [ -f $HOME/.pgpass ]; then
  echo "` chmod 0600 $HOME/.pgpass `"

  echo "Resetting the database at $HOST"

  echo " ` psql -h $HOST -p 5432 -U webapplogin  gfddispatch  -f ./scripts/postgresql_gfd_db_create.sql` "

  # uncomment this to insert data
  # echo " ` psql -h stn4.homelinux.com -p 5432 -U webapplogin  geogophertesting  -f ./scripts/postgres_db_insert_sample_data.sql` "

else
   echo "You need a .pgpass file in your home directory with proper DB
   credentials"
fi

