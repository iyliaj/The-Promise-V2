


// Method 1: Using toISOString() and split
const date1 = new Date().toISOString().split("T")[0];

// Method 2: Using toLocaleDateString() with specific format
const date2 = new Date().toLocaleDateString('en-CA'); // Returns YYYY-MM-DD format

// Method 3: Manual formatting
const now = new Date();
const date3 = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

console.log("Method 1 (toISOString):", date1);
console.log("Method 2 (toLocaleDateString):", date2);
console.log("Method 3 (manual):", date3);