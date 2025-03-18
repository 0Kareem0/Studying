const express = require("express");
const fs = require("fs");
const path = require("path");
const logging = require("./middleware/logging");

const app = express();
const PORT = 3000;

app.use(logging)

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
        this.price = discountStrategy.applyDiscount(price);
        this.discountStrategy = discountStrategy;
    }

    showMsg() {
        return this.discountStrategy instanceof DiscountStrategy &&
               !(this.discountStrategy instanceof FlatDiscount || this.discountStrategy instanceof PercentageDiscount)
            ? "You Don't Have a Discount"
            : "You Have a Discount";
    }
}

// Load products from JSON file
function loadProducts() {
    const data = fs.readFileSync(path.join(__dirname, "products.json"), "utf8");
    const rawProducts = JSON.parse(data);

    return rawProducts.map(p => {
        let discountStrategy = new DiscountStrategy();
        if (p.discountType === "flat") {
            discountStrategy = new FlatDiscount(p.discountValue);
        } else if (p.discountType === "percentage") {
            discountStrategy = new PercentageDiscount(p.discountValue);
        }

        return new BigProduct(p.serial, p.color, p.size, p.price, discountStrategy);
    });
}

let products = loadProducts();

// Routes
app.get("/products", (req, res) => {
    res.json(products);
});

app.get("/products/:serial", (req, res) => {
    const querySerial = `#${req.params.serial}`; // Add '#' to match the serial format
    const filteredProducts = products.filter(p => p.serial.startsWith(querySerial));

    if (filteredProducts.length === 0) {
        return res.status(404).json({ message: "No products found with this serial prefix" });
    }

    res.json(filteredProducts);
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
