# English Application Server

## How to Run in Development Mode

**Step 1:** Check the `docker` folder, especially the `docker-compose` files.
The `Dockerfile` has **not** been updated. Start the required services using Docker.

**Step 2:** Install dependencies:

```
pnpm install
```

**Step 3:** Create environment variables according to the `.env.example` files in each service.

**Step 4:** Start the development servers:

```
nx run-many -t serve
```

---

## Additional Commands

There are other common project commands available, such as:

- `prisma:push`
- `prisma:generate`

Check the `project.json` file in each project folder for more details, or run:

```
nx graph
```

to visualize the project structure.
