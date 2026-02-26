# Server Identity Service

Hệ thống Identity Service được xây dựng bằng kiến trúc Microservices, sử dụng **NestJS** kết hợp với **Monorepo Nx**. Giao tiếp chính trong hệ thống thông qua **gRPC**. API Gateway sẽ là điểm vào (entry) cho các client (REST API).

## 🛠 Yêu cầu hệ thống

*   **Node.js**: Phiên bản theo `.nvmrc`
*   **Package Manager**: `pnpm`
*   **Build System**: `nx`
*   **Docker & Docker Compose**: Dành cho việc khởi chạy database (PostgreSQL, Redis).

## 🚀 Hướng dẫn Cài đặt

1. **Cài đặt dependencies:**
   ```bash
   pnpm install
   ```

2. **Cấu hình biến môi trường (`.env`):**
   Copy file `.env.example` (nếu có) hoặc tạo các file env tương ứng:
   - `.env.development.local` → Development environment
   - `.env` → Production environment
   - `.env.test.local` → Test environment

3. **Khởi chạy Database qua Docker:**
   ```bash
   pnpm run docker:db:dev
   ```

4. **Chạy Migration Prisma:**
   Hệ thống dùng Prisma cho ORM, bạn cần generate client và push cấu trúc lên DB:
   ```bash
   pnpm run prisma:generate
   pnpm run prisma:push:dev
   ```

## ⚙️ Hướng dẫn Khởi chạy (Run)

Bạn có thể dùng Nx để chạy các service. Đặc biệt lưu ý chạy gRPC services (Auth, Exam) trước khi chạy Gateway.

1. **Chạy từng service:**
   ```bash
   npx nx serve auth
   npx nx serve exam
   npx nx serve gateway
   ```

2. **Chạy tất cả (Run many):**
   ```bash
   npx nx run-many -t serve
   ```

## 📜 Các lệnh kịch bản (Scripts)

### 📌 Dự án chính
| Script | Mô tả |
| ------ | ----- |
| `start` | Chạy ứng dụng đã build (node dist/main) trên biến môi trường đang có. |
| `start:dev` | Chạy NestJS ở chế độ phát triển (watch) với `.env.development.local`. |
| `start:debug` | Dùng để debug ứng dụng. |

### 📌 Protobuf (gRPC)
| Script | Mô tả |
| ------ | ----- |
| `proto:gen:window` | Cập nhật và sinh interface từ `.proto` build ra thư viện `libs/generated/src/`. |

### 📌 Prisma
| Script | Mô tả |
| ------ | ----- |
| `prisma:generate` | Sinh Prisma client (từ schema db). |
| `prisma:migrate:dev`| Tạo migration mới từ thay đổi schema. |
| `prisma:push:dev` | Đẩy trực tiếp schema thay đổi lên Database (dùng trong Dev). |
