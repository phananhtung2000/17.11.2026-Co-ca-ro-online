# Hướng dẫn deploy Cờ Caro Đen Trắng lên GitHub Pages + cài đặt app

## 1. Đưa 6 file lên GitHub
1. Tạo repo mới (public), mỗi phần mềm một repo riêng (ví dụ `co-caro`).
2. Đẩy 6 file `index.html`, `manifest.json`, `sw.js`, `icon-192.png`, `icon-512.png`,
   `icon-512-maskable.png` lên **thư mục gốc** repo (không lồng thư mục con).
3. Settings → Pages → Source: branch `main`, thư mục `/ (root)` → Save.
4. Đợi vài phút, mở `https://<username>.github.io/<ten-repo>/`.
Vì `start_url`/`scope` dùng đường dẫn tương đối nên không cần sửa gì dù URL có subpath.

## 2. Cài trên Android (Chrome)
Mở link → menu 3 chấm → "Cài đặt ứng dụng" / "Thêm vào Màn hình chính".

## 3. Cài trên Windows 11 (Edge/Chrome)
Mở link → icon "Cài đặt" trên thanh địa chỉ (hoặc menu → Ứng dụng → Cài đặt trang này như một ứng dụng).

## 4. Kiểm tra bằng Lighthouse
F12 → tab Lighthouse → "Progressive Web App" → Analyze.

## 5. Cập nhật phiên bản
Chỉ đổi `v1` → `v2` trong tên cache ở `sw.js` và thay nội dung `index.html`. Không đổi `id`
(`co-caro-den-trang`), `name`, `start_url`, `scope`, tên file icon.

## 6. Quy tắc khi nhiều app cùng domain
- Mỗi app cài được nằm ở repo riêng; scope không lồng nhau.
- Portal không đặt ở repo `<user>.github.io`; dùng repo dự án, ví dụ `<user>.github.io/pat-portal/`.
- App chạy bên trong portal (thư mục `apps/`) thì **không** có manifest/service worker riêng — chỉ portal được cài.

## 7. Khi Chrome Android báo "Ứng dụng này đã được cài đặt rồi" nhưng không mở được
1. **Sao lưu/xuất dữ liệu trong app trước**; không bấm nút đặt lại (Reset).
2. Cài đặt → Ứng dụng, gỡ mục "Cờ Caro Đen Trắng" (và portal nếu có).
3. Đóng hẳn Chrome rồi mở lại link.
4. Nếu vẫn không hiện "Cài đặt ứng dụng": kiểm tra scope/`id` theo mục 6.
5. Chỉ khi vẫn kẹt: xoá dữ liệu Chrome hoặc gỡ cài lại Chrome. Cách này xoá luôn dữ liệu
   localStorage của mọi app trên domain, nên bắt buộc sao lưu trước.

## Lưu ý
- File `index.html` vẫn mở được bình thường qua double-click (`file://`), chạy offline hoàn toàn.
- Dữ liệu (ván lưu, thống kê, cài đặt) lưu trong localStorage của trình duyệt, không bị service worker can thiệp.
- Chế độ "Chơi online" cần internet (kết nối qua máy chủ trung gian công cộng); các chế độ còn lại chạy offline.
- Mỗi nơi mở (file://, GitHub Pages, app đã cài) có kho localStorage riêng, nên ván lưu ở nơi này không tự xuất hiện ở nơi kia.
