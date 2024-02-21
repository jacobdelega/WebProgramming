const http = require('http');


// Create a "server object"
const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Author: Jacob Delega\nSubmission: A5 - JavaScript Console Application');
});


// Server listens on port 8000
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {

});

function aggregationFunction(data) {
    const result = {};
    data.forEach(record => {
        if (result[record.product]) {
            result[record.product].QuantitySold += record.QuantitySold;
            result[record.product].totalSale += record.totalSale;
        } else {
            result[record.product] = {
                QuantitySold: record.QuantitySold,
                totalSale: record.totalSale
            };
        }

    })

    return result;
}

// Function to write output summary report to console
function writeOutputToConsole(result) {

    // Convert result object to an array of objects with product and QuantitySold properties
    const productsArray = Object.entries(result)
        .map(([product, { QuantitySold, totalSale }]) => ({ product, QuantitySold, totalSale }));

    // Sort the array based on QuantitySold in descending order
    productsArray.sort((a, b) => b.QuantitySold - a.QuantitySold);

    // Loop over the sorted array and print the summary report
    productsArray.forEach(({ product, QuantitySold, totalSale }) => {

        // Format totalSale to two decimal places
        const formattedTotalSale = totalSale.toFixed(2);
        console.log(`Product: ${product}, Quantity Sold: ${QuantitySold}, Total Sale: ${formattedTotalSale}`);
    });
}


function readFile(filePath) {

    // Import the file system module
    const fs = require('fs');
    filePath = 'sales_data.txt'; // Just for homeworks sake.

    // Read file synchronously
    const fileContent = fs.readFileSync(filePath, 'utf-8');

    // Split file content into lines
    const lines = fileContent.split('\n');

    // Initialize data array
    const data = [];

    // Parse each line and populate data array
    lines.forEach(line => {
        const elements = line.split(",");
        if (elements.length >= 5) { // Check if there are enough elements
            const salesRecord = {
                product: elements[0].trim(),
                QuantitySold: parseInt(elements[2].trim()),
                totalSale: parseFloat(elements[4].trim()),
            };
            data.push(salesRecord);
        } else {
            console.error("Invalid line:", line); // Log invalid lines
        }
    });
    return data;
}



// Read file
const data = readFile('sales_data.txt');

// Aggregate data by product and calculate total quantity sold and total sale
const aggregatedData = aggregationFunction(data);

// Write summary report to console sorted by total quantity sold
writeOutputToConsole(aggregatedData);

