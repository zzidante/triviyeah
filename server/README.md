# First Time You Use it (dev)
- Go in: `cd server`
- Get Deps: `npm install`
- Postgres: You'll also need that. May I suggest downloading Postgres.App? This one expects Postgres 12.
- Create Env file: `touch .env`
- Configure Env file: see `.env.sample` for guide
- Create DB: `bash ./scripts/create_dev_database.sh`
- Start app dev: `npm start` 
- Start app prod: `npm run_production`