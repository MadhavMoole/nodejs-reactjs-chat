const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

app.post("/authenticate", async (req, res) => {
  const { username } = req.body;
  try {
    const r = await axios.put(
      "https://api.chatengine.io/users/",
      { username: username, secret: username, first_name: username },
      { headers: { "Private-Key": "1e10f35a-fc25-438f-87cd-3720673d7589" } }
    );
    return res.status(r.status).json(r.data);
  } catch (e) {
    console.error(e.message);
    if (e.response) {
      return res.status(e.response.status).json(e.response.data);
    } else {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
