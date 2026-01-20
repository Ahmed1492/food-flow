# 🍴 Full‑Stack Food Ordering App

A modern web application that delivers a seamless food ordering experience for both customers and administrators.  
Users can browse menus, manage their cart, and securely pay for orders, while admins manage inventory and monitor order statuses.  
The app integrates **Stripe** for secure payments, **Cloudinary** for image storage, and implements **authentication** with **role‑based access control**.

---

## 📖 Project Overview
- **For Users:** Browse food items, add them to a cart, and complete purchases through a secure checkout process.  
- **For Admins:** Manage food inventory, upload images, and track or update customer orders.  
- **Core Integrations:** Stripe (payments), JWT (authentication), Cloudinary (image uploads).  

---

## 🛠️ Technologies Used
- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Payments:** Stripe API  
- **Image Uploads:** Cloudinary  
- **State Management:** React Context API  

---

## 🎥 Demo
- 🔴 **Live Demo:** [https://food-flow-livid.vercel.app/](#)  

- 📼 **Recorded Demo:** [https://www.linkedin.com/posts/activity-7386867957064155136-ktGH?utm_source=share&utm_medium=member_android&rcm=ACoAAD-hKsAB1QXZ1eSyBx8nGWP48RuYiBX5Bdg](https://www.linkedin.com/posts/activity-7386867957064155136-ktGH?utm_source=share&utm_medium=member_android&rcm=ACoAAD-hKsAB1QXZ1eSyBx8nGWP48RuYiBX5Bdg)

---

## 👤 User Features

### 🔑 Account Management
- Register a new account or log in  
- Access protected features with authentication  
- Retrieve and update personal user data  

### 🖼️ Profile Management
- Upload, update, or remove profile images  

### 🔒 Secure Access
- Authentication middleware ensures only logged‑in users can access protected routes  

---

## 🛒 Cart Features
- Add or remove items from the cart  
- View all items currently in the cart  

---

## 💳 Checkout & Payments
- Secure checkout powered by **Stripe**  
- Only logged‑in users with items in their cart can proceed  
- Supports test/dummy cards for development  
- Orders are created and verified upon successful payment  

---

## 🥘 Food Management (Admin)
- Add new food items with image upload via **Cloudinary**  
- Retrieve a list of all available foods  
- Remove or update food items  

---

## 📦 Order Management
- Place an order (login required)  
- Verify an order after payment  
- **Users:** View personal order history  
- **Admins:**  
  - View all orders  
  - Update the status of any order  
