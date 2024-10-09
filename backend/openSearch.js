
const { Client } = require('@opensearch-project/opensearch');

const client = new Client({
    node: 'https://search-opensearchlearning-dwownbaww4z7oobasanhzcqfxe.aos.ap-south-1.on.aws', // AWS domain
    auth: {
        username: 'Dineshkumar',
        password: 'Dinesh@123' 
    }
});
