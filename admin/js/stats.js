function getStats() {
    fetch('./php/stats.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('totalRevenue').textContent = `$${data.total_sales}`;
            document.getElementById("total_orders").textContent = `${data.total_orders}`;
            document.getElementById("users_active").textContent = `${data.user_active}`;
        })
        .catch(error => console.error('Error fetching stats:', error));
}

window.onload = getStats;
