const fs = require('fs');
const path = require('path');

const INDEX_PATH = path.join(__dirname, '../index.html');
const MIN_SIZE_KB = 30;
const REQUIRED_STRINGS = [
    'Anton Liu',        // Name (En/Zh mixed)
    'Work Experience',  // English Section
    '核心技能'           // Chinese Section
];

function verify() {
    console.log('🔍 Starting Build Verification...');

    // 1. Check Existence
    if (!fs.existsSync(INDEX_PATH)) {
        console.error('❌ Error: index.html not found!');
        process.exit(1);
    }

    // 2. Check Size
    const stats = fs.statSync(INDEX_PATH);
    const sizeKB = stats.size / 1024;
    console.log(`info: File size is ${sizeKB.toFixed(2)} KB`);

    if (sizeKB < MIN_SIZE_KB) {
        console.error(`❌ Error: File size too small (<${MIN_SIZE_KB}KB). Build might be incomplete.`);
        process.exit(1);
    }

    // 3. Check Content
    const content = fs.readFileSync(INDEX_PATH, 'utf-8');
    const missing = REQUIRED_STRINGS.filter(str => !content.includes(str));

    if (missing.length > 0) {
        console.error('❌ Error: Missing critical strings:', missing);
        process.exit(1);
    }

    console.log('✅ Verification Passed! Build matches baseline expectations.');
    process.exit(0);
}

verify();
