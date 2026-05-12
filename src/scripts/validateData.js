import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RAW_DIR = path.join(__dirname, '../data/raw');
const PROCESSED_DIR = path.join(__dirname, '../data/processed');

const MIN_SAMPLE_SIZE = 100;

function validatePollingData() {
  if (!fs.existsSync(PROCESSED_DIR)) {
    fs.mkdirSync(PROCESSED_DIR, { recursive: true });
  }
  if (!fs.existsSync(RAW_DIR)) {
    console.warn(`[WARNING] Raw directory ${RAW_DIR} does not exist. Creating it.`);
    fs.mkdirSync(RAW_DIR, { recursive: true });
    return;
  }

  const rawFiles = fs.readdirSync(RAW_DIR).filter(f => f.endsWith('.json'));
  
  for (const file of rawFiles) {
    const rawData = JSON.parse(fs.readFileSync(path.join(RAW_DIR, file), 'utf-8'));
    const validData = [];
    
    for (const row of rawData) {
      if (row.sampleSize < MIN_SAMPLE_SIZE) {
        console.warn(`[WARNING] Low-N data detected in ${file} for date ${row.date} (N=${row.sampleSize}). Skipping row.`);
        continue;
      }
      validData.push(row);
    }
    
    fs.writeFileSync(
      path.join(PROCESSED_DIR, file),
      JSON.stringify(validData, null, 2)
    );
    console.log(`[SUCCESS] Validated and processed ${file}. Filtered out ${rawData.length - validData.length} invalid rows.`);
  }
}

try {
  validatePollingData();
} catch (error) {
  console.error('[ERROR] Data validation failed:', error);
  process.exit(1);
}
