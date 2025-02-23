# UI-Todolist

UI-Todolist là một ứng dụng giao diện danh sách công việc (To-do list) được xây dựng bằng React, sử dụng Vite và Tailwind CSS.

## Triển khai

### 1. Tạo project React với Vite
```sh
npm create vite@latest
```
Sau đó, trả lời các câu hỏi:
- **Project name**: `ui-todolist`
- **Framework**: `React`
- **Variant**: `TypeScript`

### 2. Cài đặt Tailwind CSS
```sh
npm install -D tailwindcss@3
npx tailwindcss init
```
Cấu hình file `tailwind.config.js` và `index.css` theo hướng dẫn trong tài liệu chính thức: [Tailwind CSS Docs](https://v3.tailwindcss.com/docs/installation)

### 3. Cấu trúc thư mục chính của dự án
```plaintext
ui-todolist/
│── src/
│   ├── components/   # Chứa các component tái sử dụng
│   ├── lib/          # Chứa các thư viện sử dụng (vd: axios)
│   ├── services/     # Xử lý Request và Response
│   ├── types/        # Định nghĩa các type và interface
│── .env              # Chứa các biến môi trường
│── vite-env.d.ts     # Cấu hình sử dụng biến môi trường từ .env
```

### 4. Chạy project trên môi trường local
```sh
npm run dev
```

### 5. Triển khai lên Vercel

#### 5.1. Đẩy project lên GitHub
1. Tạo một repository trên GitHub.
2. Thực hiện các bước sau để đẩy project lên GitHub:
```sh
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/ui-todolist.git
git push -u origin main
```

#### 5.2. Deploy với Vercel
1. Đăng nhập vào Vercel bằng tài khoản GitHub.
2. Import repository `ui-todolist` từ GitHub.
3. Cấu hình biến môi trường giống với file `.env` trong phần **Project Settings** của Vercel.
4. Nhấn **Deploy**, Vercel sẽ xử lý phần còn lại.

---

**🚀 Thank you for watching - Ktdev**