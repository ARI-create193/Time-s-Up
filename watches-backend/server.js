const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch'); // v2

const app = express();
const PORT = 3001;

// Replace with your Azure Blob URL
const BLOB_URL = 'https://aryan19203.blob.core.windows.net/watches/Watches.json';

let watches = [];

async function loadData() {
  const res = await fetch(BLOB_URL);
  watches = await res.json();
  console.log('Loaded', watches.length, 'watches');
}
loadData();

app.use(cors());

app.get('/api/watches', (req, res) => {
  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const start = (page - 1) * limit;
  const end = start + limit;
  res.json({
    total: watches.length,
    page,
    limit,
    data: watches.slice(start, end),
  });
});

app.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`);
});