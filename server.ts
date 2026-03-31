import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs/promises";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Simple JSON "database"
  const DB_PATH = path.join(process.cwd(), "db.json");

  const initDb = async () => {
    try {
      await fs.access(DB_PATH);
    } catch {
      await fs.writeFile(DB_PATH, JSON.stringify({
        users: [{ id: "1", username: "admin", password: "password123" }],
        contacts: [],
        campaigns: [],
        logs: []
      }, null, 2));
    }
  };

  await initDb();

  const getDb = async () => JSON.parse(await fs.readFile(DB_PATH, "utf-8"));
  const saveDb = async (data: any) => await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2));

  // API Routes
  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const db = await getDb();
    const user = db.users.find((u: any) => u.username === username && u.password === password);
    if (user) {
      res.json({ success: true, user: { id: user.id, username: user.username } });
    } else {
      res.status(401).json({ success: false, message: "Invalid credentials" });
    }
  });

  app.get("/api/contacts", async (req, res) => {
    const db = await getDb();
    res.json(db.contacts);
  });

  app.post("/api/contacts", async (req, res) => {
    const db = await getDb();
    const newContact = { id: Date.now().toString(), ...req.body };
    db.contacts.push(newContact);
    await saveDb(db);
    res.json(newContact);
  });

  app.post("/api/contacts/bulk", async (req, res) => {
    const db = await getDb();
    const newContacts = req.body.map((c: any) => ({ id: Math.random().toString(36).substr(2, 9), ...c }));
    db.contacts.push(...newContacts);
    await saveDb(db);
    res.json({ count: newContacts.length });
  });

  app.get("/api/campaigns", async (req, res) => {
    const db = await getDb();
    res.json(db.campaigns);
  });

  app.post("/api/campaigns", async (req, res) => {
    const db = await getDb();
    const newCampaign = { id: Date.now().toString(), status: "pending", ...req.body };
    db.campaigns.push(newCampaign);
    await saveDb(db);
    res.json(newCampaign);
  });

  app.get("/api/logs", async (req, res) => {
    const db = await getDb();
    res.json(db.logs);
  });

  app.post("/api/logs", async (req, res) => {
    const db = await getDb();
    const newLog = { id: Date.now().toString(), ...req.body };
    db.logs.unshift(newLog); // Add to beginning
    
    // Update contact lastSent if it's a direct email or campaign
    const contact = db.contacts.find((c: any) => c.email === newLog.email);
    if (contact) {
      contact.lastSent = newLog.timestamp;
    }
    
    await saveDb(db);
    res.json(newLog);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
