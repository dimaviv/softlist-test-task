**Project Setup:**

1. Clone the repository: `git clone <repo-url>` and navigate: `cd <repo-name>`.
2. Create a `.development.env` file from `.development.env.sample` and set the required environment variables.
3. Create database in postgres.

**Run the project**

```sh
   npm i
   sequelize db:seed:all
   npm run start:dev
```
