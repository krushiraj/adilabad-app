const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'firebase-adminsdk.json');

if (fs.existsSync(filePath)) {
  // File exists, do nothing
  console.log('firebase-adminsdk.json already exists');
} else {
  // File does not exist, use FIREBASE_CONFIG env var
  const firebaseConfig = process.env.FIREBASE_CONFIG;
  if (firebaseConfig) {
    // Create json file with contents from env var
    fs.writeFileSync(filePath, firebaseConfig);
  }
}
