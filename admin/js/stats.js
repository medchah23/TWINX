fetch('./php/stats.php')
    .then(response => response.json())
    .then(data => {
        console.log(data); // Check what data you received
        if (data.error) {
            console.error(data.error);
        } else {
            updateMetrics(data);
            displayCharts(data);
        }
    })
    .catch(error => console.error('Error fetching data:', error));

function updateMetrics(data) {
    const totalRevenueEl = document.getElementById('totalRevenue');
    const totalOrdersEl = document.getElementById('totalOrders');
    const usersActiveEl = document.getElementById('activeUsers');
    const pendingIssuesEl = document.getElementById('pendingIssues');

    if (totalRevenueEl) {
        totalRevenueEl.textContent = `$${data.total_sales || '0.00'}`;
    } else {
        console.warn('Total Revenue element not found');
    }

    if (totalOrdersEl) {
        totalOrdersEl.textContent = data.total_orders || '0';
    } else {
        console.warn('Total Orders element not found');
    }

    if (usersActiveEl) {
        usersActiveEl.textContent = data.user_active || '0';
    } else {
        console.warn('Users Active element not found');
    }

    if (pendingIssuesEl) {
        pendingIssuesEl.textContent = data.pending_issues || '0';
    } else {
        console.warn('Pending Issues element not found');
    }
}

function createChart(ctx, type, labels, datasets) {
    return new Chart(ctx, {
        type: type,
        data: {
            labels: labels,
            datasets: datasets
        }
    });
}

function displayCharts(data) {
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    if (data.sales_over_time && data.sales_over_time.length) {
        createChart(salesCtx, 'pie',
            data.sales_over_time.map(entry => entry.month),
            [{
                label: 'Total Sales',
                data: data.sales_over_time.map(entry => entry.total_sales),
                backgroundColor: ['rgba(75, 192, 192, 0.5)', 'rgba(255, 99, 132, 0.5)', 'rgba(54, 162, 235, 0.5)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1
            }]
        );
    } else {
        console.error('No valid data for sales chart.');
    }

    const userCtx = document.getElementById('userGrowthChart').getContext('2d');
    if (data.user_growth && data.user_growth.length) {
        createChart(userCtx, 'radar',
            data.user_growth.map(entry => entry.month),
            [{
                label: 'New Users',
                data: data.user_growth.map(entry => entry.total_user),
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2
            }]
        );
    } else {
        console.error('No valid data for user growth chart.');
    }

    const labels = (data.Order_Status_Delivered || []).map(entry => entry.month);
    const deliveredData = (data.Order_Status_Delivered || []).map(entry => entry.total);
    const shippedData = (data.Order_Status_Shipped || []).map(entry => entry.total);
    const pendingData = (data.Order_Status_Pending || []).map(entry => entry.total);
    const cancelledData = (data.Order_Status_Cancelled || []).map(entry => entry.total);

    if (labels.length) {
        const ctx = document.getElementById('orderStatusChart').getContext('2d');
        createChart(ctx, 'doughnut', labels, [
            {
                label: 'Delivered',
                data: deliveredData,
                backgroundColor: 'rgba(23,180,150,0.29)',
                borderColor: 'rgba(10,134,121,0.36)'
            },
            {
                label: 'Shipped',
                data: shippedData,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgb(255, 99, 132)'
            },
            {
                label: 'Pending',
                data: pendingData,
                backgroundColor: 'rgba(63,168,21,0.35)',
                borderColor: 'rgba(57,250,36,0.33)'
            },
            {
                label: 'Cancelled',
                data: cancelledData,
                backgroundColor: 'rgba(206,174,16,0.23)',
                borderColor: 'rgba(159,114,8,0.27)'
            }
        ]);
    } else {
        console.error('No valid data for order status chart.');
    }
}
