# Remix Clean Architecture

<img src="https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg" alt="" />

### Khu vực chính của ứng dụng giúp cô lập Business Rules (use-cases, entities, ports)
1. /application: Thư mục này chứa logic ứng dụng và use cases của bạn.
    - use-cases: Là các lớp chứa các nghiệp vụ của hệ thống. Các lớp này không được phụ thuộc vào bất kỳ một thành phần nào khác trong hệ thống. (Chú ý use-case phải là Pure Function để dễ dàng testing)
3. /domain: Đây là phần quan trọng của ứng dụng và chứa các models, repositories và services.
    - /entities: Định nghĩa các đối tượng cốt lõi của ứng dụng. Các đối tượng này không được phụ thuộc vào bất kỳ một thành phần nào khác trong hệ thống. (Ta cũng có thể đặt nó là models)
    - /ports: Định nghĩa các giao diện (interfaces) cho các services, giúp bạn tạo các phiên bản cụ thể của chúng trong phân /infrastructure (Bắt buộc services phải đi theo port mà ứng dụng cung cấp để kết nối với ứng dụng).

### Adapter (Driving adapter, driven adapter), UI, utils...
3. /libs: Các components shared, hàm tiện ích và hàm công cụ chung cho toàn bộ ứng dụng.
    - /components: Chứa các thành phần giao diện người dùng.
    - /utils: Chứa các hàm tiện ích và hàm công cụ chung cho toàn bộ ứng dụng.
    - /constants: Chứa các hằng số cho toàn bộ ứng dụng.
    - /hooks: Chứa các custom hooks cho toàn bộ ứng dụng.
4. /containers: Phần này liên quan đến giao diện người dùng kết nối tới store để hiển thị giao diện người dùng và xử lý các sự kiện.
5. /routes: Chứa các routes của ứng dụng (Cụ thể là theo routes của remix.run).

6. /infrastructure: Thư mục này chứa cài đặt cụ thể cho các services và dữ liệu.
    - /data: Dữ liệu mẫu hoặc mô phỏng cho phát triển và kiểm thử.
    - /services: Cài đặt cụ thể của các services (Có thể đặt thư mục là repositories).
7. /store: Chứa trạng thái ứng dụng và quản lý trạng thái bằng Zustand, các loader, action của remix hoặc các thư viện trạng thái khác.
