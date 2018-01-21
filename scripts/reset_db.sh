#!/bin/bash

if [ -f $HOME/.pgpass ]; then
  echo "` chmod 0600 $HOME/.pgpass `"

  echo " ` psql -h stn4.homelinux.com -p 5432 -U webapplogin  gfddispatch  -f ./scripts/postgresql_gfd_db_create.sql` "

###### Be extremely careful using this next line. It will erase the entire main database.
  # echo " ` psql -h ersdispatch.cguymocs6upp.us-east-1.rds.amazonaws.com -p 5432 -U webapplogin  gfddispatch  -f ./scripts/postgresql_gfd_db_create.sql` "

  # echo " ` psql -h stn4.homelinux.com -p 5432 -U webapplogin  geogophertesting  -f ./scripts/postgres_db_insert_sample_data.sql` "

else
   echo "You need a .pgpass file in your home directory with proper DB
   credentials"
fi

