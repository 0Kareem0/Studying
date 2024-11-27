//------------- my doing----------might edit this later





// Constructor Function
function BigProduct(color, size, price, hasDiscount) {
    this.color = color;
    this.size = size;
    this.price = hasDiscount ? price - 100 : price; // Apply discount if applicable
    this.hasDiscount = hasDiscount;

    // Method to display discount message
    this.showMsg = function () {
        return `You${this.hasDiscount ? "" : " Don't"} Have a Discount`;
    };
}

// Original product
let product = new BigProduct("red", "xl", 500, true);

// -----------------------------Upgrade to the size-----------------------------
const productUpgrade = Object.assign({}, product, { size: "xl, xxl" });

let finalData = "";

// Loop to generate output for the upgraded product
for (let info in productUpgrade) {
    if (info === "color" || info === "size" || info === "price") {
        finalData += `The ${info} is => ${productUpgrade[info]} <br>`;
    }
}

// Add the discount message to the output
finalData += productUpgrade.showMsg();

// Display the final data in the HTML
document.getElementById("info").innerHTML = finalData;

// Log product details and discount message
console.log(product);
console.log(product.showMsg());


















