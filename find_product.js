const fs = require('fs');
const data = JSON.parse(fs.readFileSync('../scraped_data/products.json', 'utf8'));
const p = data.find(p => p.id === '2200w-220v-single-electric-infrared-ceramic-hot-plate-cooker');
console.log(JSON.stringify(p, null, 2));
