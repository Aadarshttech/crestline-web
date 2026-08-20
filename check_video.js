const fs = require('fs');
const data = JSON.parse(fs.readFileSync('../scraped_data/products.json', 'utf8'));
const vids = data.filter(p => p.hasVideo).slice(0, 3).map(p => p.video);
console.log(JSON.stringify(vids, null, 2));
