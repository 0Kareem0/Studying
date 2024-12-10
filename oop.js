class BigProduct {
    constructor(serial, color, size, price, hasDiscount) {
        this.serial = `#${serial}`;
        this.color = color;
        this.size = size;
        this.price = hasDiscount ? price - 100 : price; // Apply discount if applicable
        this.hasDiscount = hasDiscount;
    }

    // Method to display discount message
    showMsg() {
        return `You${this.hasDiscount ? "" : " Don't"} Have a Discount`;
    }
}

// Array to hold multiple products
let products = [
    new BigProduct(8722631, "red", "xl", 500, true),
    new BigProduct(1234567, "blue", "m", 500, false),
    new BigProduct(9876543, "green", "l", 500, true)
];

let finalData = "";

// Loop through each product in the array
products.forEach(product => {
    // Upgrade size for each product (example modification)
    const productUpgrade = {
        ...product,
        size: `${product.size}, xxl`
    };

    // Generate output for the product
    for (let info in productUpgrade) {
        if (info === "serial" || info === "color" || info === "size" || info === "price") {
            finalData += `The ${info} is => ${productUpgrade[info]} <br>`;
        }
    }

    // Add the discount message to the output
    finalData += product.showMsg() + "<br><br>";
});

// Display the final data in the HTML
document.getElementById("info").innerHTML = finalData;

// Log all products and their discount messages
products.forEach(product => {
    console.log(product);
    console.log(product.showMsg());
});