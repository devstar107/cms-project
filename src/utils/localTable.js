// import Swal from 'sweetalert2';
// import currencyFormatter from 'currency-formatter';
// import { NotificationManager } from 'react-notifications';

export const stt = (idx, currentPage, pageSize) => {
  if (currentPage && currentPage > 0) {
    return (currentPage - 1) * pageSize + 1 + idx
  }
  return idx + 1
}
// export const confirmDelete = () => {
//   return Swal.fire({
//     title: 'Bạn có chắc chắn xóa?',
//     text: 'Thông tin một khi bị xóa sẽ không được phục hồi!',
//     icon: 'warning',
//     showCancelButton: true,
//     confirmButtonText: 'Có',
//     cancelButtonText: 'Không'
//   });
// };

// export const confirmPost = () => {
//   return Swal.fire({
//     title: 'Bạn có chắc chắn đăng bài?',
//     icon: 'success',
//     showCancelButton: true,
//     confirmButtonText: 'Có',
//     cancelButtonText: 'Không'
//   });
// };

// export const checkUser = () => {
//   return Swal.fire({
//     title: 'Xác Nhận User Đã Đăng Ký Qua App?',
//     showCancelButton: true,
//     confirmButtonText: 'Có',
//     cancelButtonText: 'Không'
//   });
// };

// export const checkAccept = (mes) => {
//   return Swal.fire({
//     title: mes,
//     showCancelButton: true,
//     confirmButtonText: 'Có',
//     cancelButtonText: 'Không'
//   });
// };

// export const afterRemove = (msg, status) => {
//   return Swal.fire({
//     text: msg,
//     icon: status ? 'success' : 'error',
//     showCancelButton: false,
//     confirmButtonText: 'Xác nhận'
//   });
// };

// export const moneyFormat = (price) => {
//   const prices = parseFloat(price);
//   if (!Number.isNaN(prices)) {
//     return currencyFormatter.format(prices, {
//       decimal: ',',
//       precision: 0
//     });
//   }

//   return 0;
// };

// export const showMessage = (msg, status) => {
//   return status
//     ? NotificationManager.success(msg, 'Thành công!', 4000)
//     : NotificationManager.error(msg, 'Lỗi!', 4000);
// };
