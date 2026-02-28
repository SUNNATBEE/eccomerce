/**
 * app.js - Express ilovasi sozlamalari
 *
 * Bu faylda:
 * 1. Middleware'lar ulangan (cors, morgan, json parser)
 * 2. Barcha route'lar ulangan
 * 3. Swagger dokumentatsiya ulangan
 * 4. Global xatolik handler ulangan
 */

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// Route'lar
const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const blogRoutes = require("./routes/blogRoutes");
const contactRoutes = require("./routes/contactRoutes");

// Xatolik handler
const errorHandler = require("./middleware/errorHandler");

const app = express();

// ===== MIDDLEWARE'LAR =====

// CORS - Frontend dan so'rov qabul qilish
app.use(
  cors({
    origin: [
      "http://localhost:5173",    // Vite development server
      "http://localhost:3000",    // React default port
      process.env.CLIENT_URL,     // Production frontend URL
    ].filter(Boolean),
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// JSON body parser - so'rov tanasini o'qish
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Morgan - HTTP so'rovlarni loglash (development)
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ===== SWAGGER DOKUMENTATSIYA =====
// http://localhost:5000/api-docs da ko'rish mumkin
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, {
    explorer: true,
    customCss: ".swagger-ui .topbar { background-color: #22c55e; }",
    customSiteTitle: "Nest Mart API Docs",
  })
);

// Swagger JSON formatda (boshqa vositalar uchun)
app.get("/api-docs.json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

// ===== ROUTE'LAR =====
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/contacts", contactRoutes);

// Asosiy sahifa - server ishlayotganligini tekshirish
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "🛒 Nest Mart API ishlayapti!",
    version: "1.0.0",
    docs: "/api-docs",
    endpoints: {
      products: "/api/products",
      categories: "/api/categories",
      blogs: "/api/blogs",
      contacts: "/api/contacts",
    },
  });
});

// API health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: Math.floor(process.uptime()),
  });
});

// 404 - Topilmagan route
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route topilmadi: ${req.method} ${req.url}`,
  });
});

// Global xatolik handler (doimo eng oxirida)
app.use(errorHandler);

module.exports = app;
