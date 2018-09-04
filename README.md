# project_black

##Getting Start

###1) Clone the Repository
- In the repo, click to clone or download
- In your terminal, `cd` into you projects directory.
- Type `git clone` and paste the copied repository link.
- `cd project_black` to get into the project directory

###2) Create a postgres database
- In the project directory run `postgres -D /usr/local/var/postgres`
- Open a new terminal tab (command T)
- Type `createdb project_black_development`
- Start postgres by running `psql`
- In postgres, run `CREATE ROLE project_black_development superuser`
- And then... `ALTER ROLE project_black_development WITH LOGIN`
- Quit postgres by running control D

####3) Bundle
- Run `bundle install` to get all the gems

###4) Run migrations
- Run `rake db:migrate`
