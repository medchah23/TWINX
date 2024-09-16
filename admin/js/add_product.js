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
am