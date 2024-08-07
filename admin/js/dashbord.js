// Toggle Dropdown in Sidebar
var dropdown = document.getElementsByClassName("dropdown-btn");
for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var dropdownContent = this.nextElementSibling;
        if (dropdownContent.style.display === "block") {
            dropdownContent.style.display = "none";
        } else {
            dropdownContent.style.display = "block";
        }
    });
}

// Sample Data for Charts
var salesData = [12, 19, 3, 5, 2, 3, 7, 10, 15, 12];
var productsData = [5, 10, 15, 20, 25];
var ordersData = [5, 2, 7, 10, 3];

// Sales Over Time Chart
var ctxSales = document.getElementById('salesChart').getContext('2d');
var salesChart = new Chart(ctxSales, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
        datasets: [{
            label: 'Sales',
            data: salesData,
            borderColor: 'rgba(23, 162, 184, 1)',
            backgroundColor: 'rgba(23, 162, 184, 0.1)',
            borderWidth: 2,
            fill: true,
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Top Selling Products Chart
var ctxProducts = document.getElementById('productsChart').getContext('2d');
var productsChart = new Chart(ctxProducts, {
    type: 'bar',
    data: {
        labels: ['Product 1', 'Product 2', 'Product 3', 'Product 4', 'Product 5'],
        datasets: [{
            label: 'Units Sold',
            data: productsData,
            backgroundColor: [
                'rgba(23, 162, 184, 0.8)',
                'rgba(23, 162, 184, 0.7)',
                'rgba(23, 162, 184, 0.6)',
                'rgba(23, 162, 184, 0.5)',
                'rgba(23, 162, 184, 0.4)'
            ],
            borderColor: 'rgba(23, 162, 184, 1)',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

// Order Status Distribution Chart
var ctxOrders = document.getElementById('ordersChart').getContext('2d');
var ordersChart = new Chart(ctxOrders, {
    type: 'doughnut',
    data: {
        labels: ['Delivered', 'Pending', 'Cancelled', 'Shipped'],
        datasets: [{
            label: 'Orders',
            data: ordersData,
            backgroundColor: [
                'rgba(23, 162, 184, 0.8)',
                'rgba(108, 117, 125, 0.8)',
                'rgba(220, 53, 69, 0.8)',
                'rgba(40, 167, 69, 0.8)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                position: 'bottom'
            }
        }
    }
});