import express, { NextFunction, Request, Response } from "express";

import { read, write } from "./fs.service";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await read();
    res.send(users);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    //TODO validate data

    const users = await read();

    const id = users.length ? users[users.length - 1]?.id + 1 : 1;
    const newUser = { id, name, email, password };
    users.push(newUser);

    await write(users);
    res.status(201).send(newUser);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.get("/users/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const users = await read();
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.put("/users/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const { name, email, password } = req.body;

    const users = await read();

    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).send("User not found");
    }
    //TODO validate data

    // users[userIndex] = {... users[userIndex], name, email, password};
    users[userIndex].name = name;
    users[userIndex].email = email;
    users[userIndex].password = password;

    await write(users);
    res.status(201).send(users[userIndex]);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.delete("/users/:userId", async (req, res) => {
  try {
    const userId = Number(req.params.userId);
    const users = await read();

    const userIndex = users.findIndex((user) => user.id === userId);
    if (userIndex === -1) {
      return res.status(404).send("User not found");
    }
    users.splice(userIndex, 1);

    await write(users);
    res.sendStatus(204);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
