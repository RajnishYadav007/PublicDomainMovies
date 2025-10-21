// scripts/testMetadata.js

const axios = require('axios');

async function testMovieMetadata(identifier) {
  if (!identifier) {
    console.error('Please provide a movie identifier as argument.');
    process.exit(1);
  }

  const url = `https://archive.org/metadata/${identifier}`;

  try {
    const response = await axios.get(url);
    if (response.data && response.data.metadata) {
      console.log('✅ Metadata found for:', identifier);
      console.log(JSON.stringify(response.data.metadata, null, 2));
    } else {
      console.log('❌ No metadata field found for:', identifier);
      console.log('Raw response:', response.data);
    }
  } catch (error) {
    if (error.response && error.response.status === 404) {
      console.error('❌ 404 Not Found:', identifier);
    } else {
      console.error('❌ Error fetching metadata:', error.message);
    }
  }
}

// CLI usage: node scripts/testMetadata.js house_on_haunted_hill_ipod
const identifier = process.argv[2];
testMovieMetadata(identifier);
