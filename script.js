// Biến để lưu tạm danh sách ốc và linh kiện
var danhSachOcTam = [];
var danhSachLinhKienTam = [];

// Hàm thêm ốc vào danh sách tạm
function themOc() {
  var tenOc = document.getElementById('tenOc').value;
  var soLuongOc = parseInt(document.getElementById('soLuongOc').value);

  if (!tenOc || soLuongOc <= 0 || isNaN(soLuongOc)) {
    alert('Vui lòng nhập tên và số lượng hợp lệ.');
    return;
  }

  // Kiểm tra xem ốc đã tồn tại chưa
  var ocTonTai = danhSachOcTam.find(function (item) {
    return item.ten === tenOc;
  });

  if (ocTonTai) {
    ocTonTai.soLuong += soLuongOc; // Nếu có, cập nhật số lượng
  } else {
    danhSachOcTam.push({ ten: tenOc, soLuong: soLuongOc });
  }

  hienThiDanhSach();
}

// Hàm thêm linh kiện vào danh sách tạm
function themLinhKien() {
  var tenLinhKien = document.getElementById('tenLinhKien').value;
  var soLuongLinhKien = parseInt(
    document.getElementById('soLuongLinhKien').value
  );

  if (!tenLinhKien || soLuongLinhKien <= 0 || isNaN(soLuongLinhKien)) {
    alert('Vui lòng nhập tên và số lượng hợp lệ.');
    return;
  }

  // Kiểm tra xem linh kiện đã tồn tại chưa
  var linhKienTonTai = danhSachLinhKienTam.find(function (item) {
    return item.ten === tenLinhKien;
  });

  if (linhKienTonTai) {
    linhKienTonTai.soLuong += soLuongLinhKien; // Nếu có, cập nhật số lượng
  } else {
    danhSachLinhKienTam.push({ ten: tenLinhKien, soLuong: soLuongLinhKien });
  }

  hienThiDanhSach();
}

// Hàm hiển thị danh sách ốc và linh kiện
function hienThiDanhSach() {
  var bangDanhSach = document
    .getElementById('bangDanhSach')
    .getElementsByTagName('tbody')[0];
  bangDanhSach.innerHTML = ''; // Xóa nội dung bảng cũ

  // Hiển thị danh sách ốc
  danhSachOcTam.forEach(function (item) {
    var row = bangDanhSach.insertRow();
    var cellLoai = row.insertCell(0);
    var cellTen = row.insertCell(1);
    var cellSoLuong = row.insertCell(2);
    cellLoai.innerHTML = 'ネジ';
    cellTen.innerHTML = item.ten;
    cellSoLuong.innerHTML = item.soLuong;
  });

  // Hiển thị danh sách linh kiện
  danhSachLinhKienTam.forEach(function (item) {
    var row = bangDanhSach.insertRow();
    var cellLoai = row.insertCell(0);
    var cellTen = row.insertCell(1);
    var cellSoLuong = row.insertCell(2);
    cellLoai.innerHTML = '部品';
    cellTen.innerHTML = item.ten;
    cellSoLuong.innerHTML = item.soLuong;
  });
}

// Hàm xóa tất cả dữ liệu đã nhập
function xoaDuLieu() {
  danhSachOcTam = [];
  danhSachLinhKienTam = [];
  hienThiDanhSach();
}

// Hàm để lưu dữ liệu vào bảng danh sách và xuất ra file exel
function luuDuLieu() {
  hienThiDanhSach(); // Hiển thị lại danh sách trong bảng
  xuatExcel(); // Gọi hàm xuất file exel
}

// Hàm để xuất nội dung bảng thành file PDF
// Hàm để xuất nội dung bảng thành file PDF

function xuatExcel() {
  // Lấy bảng danh sách từ HTML
  const bangDanhSach = document
    .getElementById('bangDanhSach')
    .getElementsByTagName('tbody')[0];

  if (!bangDanhSach) {
    console.error('Phần tử bảng danh sách không tồn tại!');
    return;
  }

  // Khai báo biến `data`
  const data = [];

  // Thêm tiêu đề cột
  data.push(['種類', '名前', '数量']);

  // Lấy tất cả các hàng dữ liệu từ bảng
  const rows = bangDanhSach.getElementsByTagName('tr');

  // Thêm các hàng dữ liệu từ bảng vào mảng `data`
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].getElementsByTagName('td');
    const rowData = [
      cells[0].textContent, // Loại (Ốc hoặc Linh kiện)
      cells[1].textContent, // Tên của loại ốc hoặc linh kiện
      cells[2].textContent, // Số lượng
    ];
    data.push(rowData); // Thêm dòng dữ liệu vào mảng `data`
  }

  // Tạo workbook và worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Danh sách');

  // Xuất file Excel
  XLSX.writeFile(wb, 'danh_sach_oc_linh_kien.xlsx');
}
