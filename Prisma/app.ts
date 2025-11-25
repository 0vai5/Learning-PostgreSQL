import express from "express";
import prisma from "./lib/prisma";

const app = express();

app.use(express.json());

// C: Create User

app.post("/", async (req, res) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: { email, name },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// R: Read User

app.get("/", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    console.log("users", users);

    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// U: Update User

app.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { email, name } = req.body;

    const user = await prisma.user.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
      },
    });

    console.log("User", user);

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// D: Delete User

app.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.delete({
    where: {
      id: Number(id),
    },
  });

  console.log("User", user);

  res.status(200).json(user);
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
