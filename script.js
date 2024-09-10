// Hàm để thêm loại ốc vào danh sách và lưu vào LocalStorage
function themOc() {
  var tenOc = document.getElementById('tenOc').value.trim();
  var soLuongOc = parseInt(document.getElementById('soLuongOc').value) || 0;

  if (tenOc && soLuongOc > 0) {
    var danhSachOc = JSON.parse(localStorage.getItem('ocList')) || [];
    var ocTonTai = danhSachOc.find(function (item) {
      return item.ten.toLowerCase() === tenOc.toLowerCase();
    });

    if (ocTonTai) {
      ocTonTai.soLuong += soLuongOc;
    } else {
      danhSachOc.push({ ten: tenOc, soLuong: soLuongOc });
    }

    localStorage.setItem('ocList', JSON.stringify(danhSachOc));
    hienThiDanhSach();
  } else {
    alert('Vui lòng nhập tên loại ốc và số lượng hợp lệ!');
  }
}

// Hàm để thêm linh kiện vào danh sách và lưu vào LocalStorage
function themLinhKien() {
  var tenLinhKien = document.getElementById('tenLinhKien').value.trim();
  var soLuongLinhKien =
    parseInt(document.getElementById('soLuongLinhKien').value) || 0;

  if (tenLinhKien && soLuongLinhKien > 0) {
    var danhSachLinhKien =
      JSON.parse(localStorage.getItem('linhKienList')) || [];
    var linhKienTonTai = danhSachLinhKien.find(function (item) {
      return item.ten.toLowerCase() === tenLinhKien.toLowerCase();
    });

    if (linhKienTonTai) {
      linhKienTonTai.soLuong += soLuongLinhKien;
    } else {
      danhSachLinhKien.push({ ten: tenLinhKien, soLuong: soLuongLinhKien });
    }

    localStorage.setItem('linhKienList', JSON.stringify(danhSachLinhKien));
    hienThiDanhSach();
  } else {
    alert('Vui lòng nhập tên linh kiện và số lượng hợp lệ!');
  }
}

// Hàm để lưu dữ liệu vào bảng danh sách và hiển thị nó
function hienThiDanhSach() {
  var bangDanhSach = document
    .getElementById('bangDanhSach')
    .getElementsByTagName('tbody')[0];

  if (!bangDanhSach) {
    console.error('Phần tử bảng danh sách không tồn tại!');
    return;
  }

  bangDanhSach.innerHTML = ''; // Xóa nội dung cũ của bảng

  var danhSachOc = JSON.parse(localStorage.getItem('ocList')) || [];
  var danhSachLinhKien = JSON.parse(localStorage.getItem('linhKienList')) || [];

  // Hiển thị danh sách ốc
  danhSachOc.forEach(function (item) {
    var tr = document.createElement('tr');
    tr.innerHTML = `<td>Ốc</td><td>${item.ten}</td><td>${item.soLuong}</td>`;
    bangDanhSach.appendChild(tr);
  });

  // Hiển thị danh sách linh kiện
  danhSachLinhKien.forEach(function (item) {
    var tr = document.createElement('tr');
    tr.innerHTML = `<td>Linh kiện</td><td>${item.ten}</td><td>${item.soLuong}</td>`;
    bangDanhSach.appendChild(tr);
  });
}

// Hàm để xóa toàn bộ dữ liệu và làm trống bảng
function xoaDuLieu() {
  localStorage.removeItem('ocList');
  localStorage.removeItem('linhKienList');
  hienThiDanhSach();
}

// Gọi hàm hienThiDanhSach khi trang đã tải xong
window.onload = function () {
  hienThiDanhSach();
};
