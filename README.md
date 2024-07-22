# TwinX E-Commerce Platform

## Overview

TwinX is a combined e-commerce platform that offers a wide range of products including electronic devices (smartphones, computers, accessories) and toys for children of all ages. This platform provides a seamless shopping experience with features such as user authentication, product search, and secure checkout.

## Features

- User Registration and Login
- Product Listings
- Shopping Cart
- Order Management
- Search Functionality
- Secure Checkout

## Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: PHP
- Database: MySQL
- Development Tools: XAMPP, PHPStorm
- Communication: JSON



## Setup Instructions

### Prerequisites

- XAMPP
- PHPStorm
- Git
- Mysql

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/twinx.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd twinx
    ```
3. **Move the project to the XAMPP directory:**
    ```bash
    mv twinx /path/to/xampp/php/www/twinx_beta
    ```
4. **Start XAMPP and ensure Apache and MySQL services are running.**

### Database Setup

1. **Create MySQL Database:**
    ```sql
    CREATE DATABASE twinx;
    ```

2. **Import the database schema:**
    ```sql
    USE twinx;
    SOURCE path/to/twinx_schema.sql;
    ```

3. **Ensure MongoDB is running and properly configured.**

### Configuration

Update the database connection details in `php/config.php`:

```php
<?php
$host = 'localhost';
$db = 'twinx';
$user = 'root';
$pass = '';
?>
###Notes:
-Security: Consider adding security best practices like using prepared statements for MySQL queries and sanitizing user inputs.
-Contributing: If this is an open-source project, include guidelines for contributing, reporting bugs, and requesting features.
