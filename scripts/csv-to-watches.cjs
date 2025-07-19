const fs = require('fs');
const csv = require('csv-parser');

const results = [];
fs.createReadStream('src/data/watches.csv')
  .pipe(csv())
  .on('data', (row) => {
    results.push(row);
  })
  .on('end', () => {
    const watches = results.map((row, idx) => ({
      id: String(idx + 1),
      name: row.titles || 'Unknown',
      brand: row.brand_names || 'Unknown',
      description: 'N/A',
      price: Number((row.prices || '0').replace(/[^\d.]/g, '')),
      image_url: row.images_links || '',
      images: row.images_links ? [row.images_links] : [],
      category: row.Type || 'N/A',
      movement: 'N/A',
      case_material: 'N/A',
      case_size: 'N/A',
      water_resistance: 'N/A',
      stock_quantity: 10,
      is_featured: false,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
    fs.writeFileSync('watchesData.json', JSON.stringify(watches, null, 2));
    console.log('✅ watchesData.json generated with', watches.length, 'watches!');
  }); 