function toggleCategoryInput() {
    const categorySelect = document.getElementById('category');
    const newCategoryInput = document.getElementById('newCategoryInput');
    if (categorySelect.value === 'new') {
        newCategoryInput.style.display = 'block';
    } else {
        newCategoryInput.style.display = 'none';
    }
}

function toggleBrandInput() {
    const brandSelect = document.getElementById('brand');
    const newBrandInput = document.getElementById('newBrandInput');
    if (brandSelect.value === 'new') {
        newBrandInput.style.display = 'block';
    } else {
        newBrandInput.style.display = 'none';
    }
}

function validateForm(event) {
    event.preventDefault();

    let isValid = true;

    // Get elements
    const productName = document.getElementById("productName");
    const productDescription = document.getElementById("productDescription");
    const productPrice = document.getElementById("productPrice");
    const productQuantity = document.getElementById("productQuantity");
    const ageEstimation = document.getElementById("ageEstimation");
    const category = document.getElementById("category");
    const newCategory = document.getElementById("newCategory");
    const category_desc = document.getElementById("category_desc");
    const brand = document.getElementById("brand");
    const newBrand = document.getElementById("newBrand");
    const brand_desc = document.getElementById("brand_desc");

    // Reset all error messages before validation
    clearErrors();

    // Product Name Validation
    if (!isValidString(productName.value) || productName.value.length > 50) {
        displayError(productName, "Product name is not valid (max 50 characters)");
        isValid = false;
    }

    // Product Description Validation
    if (productDescription.value.length === 0 || productDescription.value.length > 500) {
        displayError(productDescription, "Product description is required and should be under 500 characters.");
        isValid = false;
    }

    // Product Price Validation
    if (!isValidPrice(productPrice.value)) {
        displayError(productPrice, "Product price should be a valid positive number.");
        isValid = false;
    }

    // Product Quantity Validation
    if (!isValidQuantity(productQuantity.value)) {
        displayError(productQuantity, "Quantity should be a positive integer.");
        isValid = false;
    }

    // Age Estimation Validation (optional, but should be a valid positive number if provided)
    if (ageEstimation.value && !isValidAgeEstimation(ageEstimation.value)) {
        displayError(ageEstimation, "Age estimation should be a valid positive number.");
        isValid = false;
    }

    // Category Validation (check if a new category is added)
    if (category.value === "new") {
        if (!isValidString(newCategory.value)) {
            displayError(newCategory, "New category name is required.");
            isValid = false;
        }
        if (category_desc.value.length === 0 || category_desc.value.length > 200) {
            displayError(category_desc, "Category description is required and should be under 200 characters.");
            isValid = false;
        }
    }

    // Brand Validation (check if a new brand is added)
    if (brand.value === "new") {
        if (!isValidString(newBrand.value)) {
            displayError(newBrand, "New brand name is required.");
            isValid = false;
        }
        if (brand_desc.value.length === 0 || brand_desc.value.length > 200) {
            displayError(brand_desc, "Brand description is required and should be under 200 characters.");
            isValid = false;
        }
    }

    if (isValid) {
        // Submit the form if everything is valid
        document.getElementById('addProductForm').submit();
    }
}

// Helper function to check if the input is a valid string (non-empty and only contains letters or spaces)
function isValidString(value) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(value) && value.trim().length > 0;
}

// Helper function to validate the price (positive number)
function isValidPrice(value) {
    const price = parseFloat(value);
    return !isNaN(price) && price > 0;
}

// Helper function to validate quantity (positive integer)
function isValidQuantity(value) {
    const quantity = parseInt(value, 10);
    return !isNaN(quantity) && quantity > 0;
}

// Helper function to validate age estimation (positive number or empty)
function isValidAgeEstimation(value) {
    const age = parseFloat(value);
    return !isNaN(age) && age > 0;
}

// Function to display error message and add error class with shake
function displayError(element, message) {
    element.value = "";
    element.placeholder = message;
    element.classList.add("error"); // Add the error class to trigger the shake
    removeShakeAnimation(element); // Call function to remove the shake after a short delay
}

// Function to remove the shake animation after a delay
function removeShakeAnimation(element) {
    setTimeout(() => {
        element.classList.remove("error");
        element.placeholder = ""; // Remove the error class after the shake
    }, 1000);  // Adjust the timeout as needed (1 second here)
}

// Function to clear all errors before validating
function clearErrors() {
    const errorElements = document.querySelectorAll('.error');
    errorElements.forEach(el => el.classList.remove('error'));
}

// Attach event listener to the form for validation
document.getElementById('addProductForm').addEventListener('submit', validateForm);
