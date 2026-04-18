<p align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/891/891419.png" width="120" />
</p>

<h1 align="center">Whopify</h1>
<br />
<p align="center">

[![Node.js](https://img.shields.io/badge/Node.js-Backend-green)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-Framework-black)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)](https://www.mongodb.com)
[![JWT](https://img.shields.io/badge/Auth-JWT-orange)](https://jwt.io)
[![Whop SDK](https://img.shields.io/badge/Whop-SDK-blue)](https://whop.com)
[![License](https://img.shields.io/badge/License-MIT-blue)](https://opensource.org/licenses/MIT)
[![Status](https://img.shields.io/badge/Status-Production--Ready-brightgreen)]()

</p>

#  Whopify

> A modern SaaS platform powered by **Whop SDK** for managing digital products and subscription-based access control.

---

##  Overview

**Whopify** is a full-stack MERN application that integrates with the **Whop SDK** to enable seamless product distribution, subscription management, and access control for digital services.

It allows creators and businesses to:
- Sell digital products
- Manage subscriptions
- Control user access via Whop authentication
- Automate license & entitlement validation

---

##  Features

-  Secure authentication via Whop SDK
-  User access control & entitlement verification
-  Real-time product access validation
-  Webhook support for subscription updates
-  
---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Auth:** Whop SDK + JWT + Cookies
- **Other:** Webhooks, REST APIs

---

##  Whop Integration

Whopify uses the **Whop SDK** to handle:

- Product retrieval
- Subscription verification
- User entitlement checks
- Plan-based access control

### Example Flow

1. User logs in via Whop
2. SDK validates user subscription
3. Backend verifies entitlement
4. Access granted to specific features/products

---

##  Product Structure

Each product in Whopify contains:

- Product ID (from Whop)
- Subscription plans
- Access rules
- User entitlement mapping

---

##  Security

- JWT-based authentication
- Secure HTTP-only cookies
- Whop-side verification for subscriptions
- Protected API routes

---

##  Getting Started

#### 1. Clone Repository

git clone https://github.com/saadkhan86/whopify.git
cd whopify

### 2. Install Dependencies
cd whopify
<br />
npm install
### 3. Run Server
cd whopify
<br />
npm run dev
