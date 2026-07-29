# Mini ERP CRM

A full-stack Mini ERP + CRM Operations Portal built using React, TypeScript, Express.js, Prisma, and PostgreSQL.

## Features

### Authentication
- Secure Login using JWT Authentication
- Protected Routes

### Dashboard
- Dashboard with business overview

### Customer Management
- Add Customer
- View Customers
- Update Customer
- Delete Customer

### Product Management
- Add Product
- View Products
- Update Product
- Delete Product

### Sales Challan
- Create Sales Challan
- Select Customer
- Select Product
- Enter Quantity
- Automatic Total Amount Calculation
- Automatic Stock Deduction
- View Challans
- Delete Challans

---

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication
- bcrypt

### Database
- PostgreSQL

---

## Folder Structure

```
mini-erp-crm/
│
├── backend/
├── frontend/
├── .gitignore
└── README.md
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/sb1103/mini-erp-crm.git
```

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_secret_key
PORT=5000
```

Run the backend:

```bash
npm run dev
```

---

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Endpoints

### Authentication

- POST /auth/login

### Customers

- GET /customers
- POST /customers
- PUT /customers/:id
- DELETE /customers/:id

### Products

- GET /products
- POST /products
- PUT /products/:id
- DELETE /products/:id

### Challans

- GET /challans
- POST /challans
- DELETE /challans/:id

---

## Future Improvements

- PDF Invoice Generation
- Search & Filter
- Pagination
- Role-Based Access Control

---

## Author

**Sumit Barman**

GitHub: https://github.com/sb1103