const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const csv = require("csv-parser");
const { Client } = require("@opensearch-project/opensearch");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(bodyParser.json());

const client = new Client({
  node: "https://search-opensearchlearning-dwownbaww4z7oobasanhzcqfxe.aos.ap-south-1.on.aws", // AWS domain
  auth: {
    username: "Dineshkumar",
    password: "Dinesh@123",
  },
});

async function deleteIndex() {
    try {
        await client.indices.delete({
            index: "recipes"
        })
        console.log("Index Delete Successfully");
    } catch (error) {
        console.log("We have Some Error deleting Index", error);
    }
}

// Create the index for epirecipe
async function createIndex() {
  try {
    await client.indices.create(
      {
        index: "recipes",
        body: {
          mappings: {
            properties: {
              title: { type: "text" },
              calories: { type: "text" },
              protein: { type: "text" },
              rating: { type: "float" },
              fat: { type: "text" },
              sodium: { type: "text" },
            },
          },
        },
      },
      { ignore: [400] }
    );

    console.log("Index created successfully!");
  } catch (error) {
    console.error("Error creating index:", error);
  }
}

// Index the CSV data into OpenSearch
async function indexData() {
  const bulkOps = []; // Each index created and push into bulkOps
  // let count =  0;

  fs.createReadStream("./epi_r.csv")
    .pipe(csv())
    .on("data", (row) => {
      // console.log(row);
      const doc = {
        title: row.title || "No Title Provided",
        calories: row.calories || '0',
        protein: row.protein || '0',
        rating: parseFloat(row.rating) || '0',
        fat: row.fat || '0',
        sodium: row.sodium || '0',
      };
    //   console.log("djslkjlfk", doc);
      // if(!row.ingredients || !row.instructions || !row.categories){
      //     console.log("row Data: ", count);
      // }

      // console.log(count++);

      bulkOps.push({ index: { _index: "recipes" } });
      bulkOps.push(doc);

      // If bulkOps reaches 1000 items, bulk index
      if (bulkOps.length >= 1000) {
        client.bulk({ body: bulkOps });
        bulkOps.length = 0;
      }
    })
    .on("end", async () => {
      // BulkList remaining documents
      if (bulkOps.length > 0) {
        // console.log(bulkOps);
        await client.bulk({ body: bulkOps });
      }
      console.log("CSV file successfully processed and data indexed!");
    //   console.log(bulkOps[0], bulkOps[3]);
    })
    .on("error", (error) => {
      console.error("Error reading CSV file:", error);
    });
}

// First, create the index, then index the data
createIndex()
  .then(() => indexData())
  .catch(console.log);

// I need to re-index process for delete one time and after call createIndex();
// deleteIndex();



app.post("/api/recipes/filter", async (req, res) => {
  const { title = "", page = 1, size = 10 } = req.query;

  try {
    const response = await client.search({
      index: "recipes",
      body: {
        query: {
          wildcard: {
            title: `*${title}*`,
          },
        },
        from: (page - 1) * size,
        size: size,
      },
    });

    res.status(200).json({data: response.body.hits.hits, total: response.body.hits.hits.length});
  } catch (error) {
    console.error("Error filtering recipes:", error);
    res.status(500).json({ error: "Failed to filter recipes" });
  }
});

app.listen(process.env.PORT, () => {
  console.log("Server is running in the", process.env.PORT);
});