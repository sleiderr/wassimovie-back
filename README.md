# Initialize

1. Add .env using .env.template
2. Add directory src/models/migrations
3. Create empty database src/services/database.sqlite3
4. run `npm run migration:generate --name=yourMigrationName`
5. run `npm run migration:run`

# Initialize jwt
1. Create a secret_key for jwt and add it to .env
