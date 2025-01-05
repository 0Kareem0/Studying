// Discount Strategies
class DiscountStrategy {
    applyDiscount(price) {
        return price; // No discount by default
    }
}

class FlatDiscount extends DiscountStrategy {
    constructor(discountAmount) {
        super();
        this.discountAmount = discountAmount;
    }

    applyDiscount(price) {
        return price - this.discountAmount;
    }
}

class PercentageDiscount extends DiscountStrategy {
    constructor(discountPercentage) {
        super();
        this.discountPercentage = discountPercentage;
    }

    applyDiscount(price) {
        return price - price * (this.discountPercentage / 100);
    }
}

// BigProduct Class
class BigProduct {
    constructor(serial, color, size, price, discountStrategy = new DiscountStrategy()) {
        this.serial = `#${serial}`;
        this.color = color;
        this.size = size;
        this.price = discountStrategy.applyDiscount(price); // Apply selected discount strategy
        this.discountStrategy = discountStrategy;
    }

    // Method to display discount message
    showMsg() {
        return this.discountStrategy instanceof DiscountStrategy && !(this.discountStrategy instanceof FlatDiscount || this.discountStrategy instanceof PercentageDiscount)
            ? "You Don't Have a Discount"
            : "You Have a Discount";
    }
}

// Array to hold multiple products
let products = [
    new BigProduct(8722631, "red", "xl", 500, new FlatDiscount(100)), // Flat discount
    new BigProduct(1234567, "blue", "m", 500), // No discount
    new BigProduct(9876543, "green", "l", 500, new PercentageDiscount(20)) // Percentage discount
];

let finalData = "";

// Loop through each product in the array
products.forEach(product => {
    // Upgrade size for each product 
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
