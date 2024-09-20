// Biến để lưu tạm danh sách ốc và linh kiện
var danhSachOcTam = [];
var danhSachLinhKienTam = [];
var danhSachGiaCongTam = [];

let thoiGianBatDau, thoiGianKetThuc, thoiGianDemNguoc;
let isRunning = false;

// Hàm thêm ốc vào danh sách tạm
function themOc() {
  var tenOc = document.getElementById('tenOc').value;
  var soLuongOc = parseInt(document.getElementById('soLuongOc').value);

  if (!tenOc || isNaN(soLuongOc)) {
    // Kiểm tra chỉ khi số lượng không phải là một số hợp lệ
    alert('Vui lòng nhập tên và số lượng hợp lệ.');
    return;
  }

  // Kiểm tra xem ốc đã tồn tại chưa
  var ocTonTai = danhSachOcTam.find(function (item) {
    return item.ten === tenOc;
  });

  if (ocTonTai) {
    // Nếu có, cập nhật số lượng (cho phép cộng số âm)
    ocTonTai.soLuong += soLuongOc;

    // Xóa chi tiết nếu số lượng bằng 0 hoặc nhỏ hơn
    if (ocTonTai.soLuong <= 0) {
      danhSachOcTam = danhSachOcTam.filter(function (item) {
        return item.ten !== tenOc;
      });
    }
  } else {
    // Nếu chưa tồn tại và số lượng khác 0, thêm mới
    danhSachOcTam.push({ ten: tenOc, soLuong: soLuongOc });
  }

  hienThiDanhSach();
}

// Hàm thêm linh kien mua vào danh sách tạm
function themLinhKien() {
  var tenLinhKien = document.getElementById('tenLinhKien').value;
  var soLuongLinhKien = parseInt(
    document.getElementById('soLuongLinhKien').value
  );

  if (!tenLinhKien || isNaN(soLuongLinhKien)) {
    alert('Vui lòng nhập tên và số lượng hợp lệ.');
    return;
  }

  // Kiểm tra xem linh kiện đã tồn tại chưa
  var linhKienTonTai = danhSachLinhKienTam.find(function (item) {
    return item.ten === tenLinhKien;
  });

  if (linhKienTonTai) {
    // Cập nhật số lượng
    linhKienTonTai.soLuong += soLuongLinhKien;

    // Xóa nếu số lượng bằng 0 hoặc nhỏ hơn
    if (linhKienTonTai.soLuong <= 0) {
      danhSachLinhKienTam = danhSachLinhKienTam.filter(function (item) {
        return item.ten !== tenLinhKien;
      });
    }
  } else {
    // Nếu chưa tồn tại, thêm mới
    danhSachLinhKienTam.push({ ten: tenLinhKien, soLuong: soLuongLinhKien });
  }

  hienThiDanhSach();
}

// Hàm thêm chi tiet gia cong vào danh sách tạm
function themGiaCong() {
  var tenGiaCong = document.getElementById('tenGiaCong').value;
  var soLuongGiaCong = parseInt(
    document.getElementById('soLuongGiaCong').value
  );

  if (!tenGiaCong || isNaN(soLuongGiaCong)) {
    alert('Vui lòng nhập tên và số lượng hợp lệ.');
    return;
  }

  // Kiểm tra xem linh kiện đã tồn tại chưa
  var giaCongTonTai = danhSachGiaCongTam.find(function (item) {
    return item.ten === tenGiaCong;
  });

  if (giaCongTonTai) {
    // Cập nhật số lượng
    giaCongTonTai.soLuong += soLuongGiaCong;

    // Xóa nếu số lượng bằng 0 hoặc nhỏ hơn
    if (giaCongTonTai.soLuong <= 0) {
      danhSachGiaCongTam = danhSachGiaCongTam.filter(function (item) {
        return item.ten !== tenGiaCong;
      });
    }
  } else {
    // Nếu chưa tồn tại, thêm mới
    danhSachGiaCongTam.push({ ten: tenGiaCong, soLuong: soLuongGiaCong });
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
    cellLoai.innerHTML = 'ネジorワッシャー';
    cellTen.innerHTML = item.ten;
    cellSoLuong.innerHTML = item.soLuong;
  });

  // Hiển thị danh sách linh kiện mua
  danhSachLinhKienTam.forEach(function (item) {
    var row = bangDanhSach.insertRow();
    var cellLoai = row.insertCell(0);
    var cellTen = row.insertCell(1);
    var cellSoLuong = row.insertCell(2);
    cellLoai.innerHTML = '購入品';
    cellTen.innerHTML = item.ten;
    cellSoLuong.innerHTML = item.soLuong;
  });

  // Hiển thị danh sách linh kiện giacong
  danhSachGiaCongTam.forEach(function (item) {
    var row = bangDanhSach.insertRow();
    var cellLoai = row.insertCell(0);
    var cellTen = row.insertCell(1);
    var cellSoLuong = row.insertCell(2);
    cellLoai.innerHTML = '加工品';
    cellTen.innerHTML = item.ten;
    cellSoLuong.innerHTML = item.soLuong;
  });
}

// Hàm bắt đầu đồng hồ
function batDauDongHo() {
  if (isRunning) return; // Ngăn không cho bấm nhiều lần

  isRunning = true;
  thoiGianBatDau = new Date(); // Ghi lại thời gian bắt đầu
  thoiGianDemNguoc = setInterval(capNhatDongHo, 1000); // Cập nhật đồng hồ mỗi giây
}

// Hàm kết thúc đồng hồ
function ketThucDongHo() {
  clearInterval(thoiGianDemNguoc); // Dừng cập nhật đồng hồ
  isRunning = false;
  thoiGianKetThuc = new Date(); // Ghi lại thời gian kết thúc
  capNhatDongHo(); // Cập nhật đồng hồ lần cuối khi kết thúc
}

// Hàm cập nhật đồng hồ
function capNhatDongHo() {
  const thoiGianHienTai = isRunning
    ? new Date()
    : thoiGianKetThuc || new Date();
  const khoangThoiGian = new Date(thoiGianHienTai - thoiGianBatDau);

  // Tính toán giờ, phút và giây
  const gio = Math.floor(khoangThoiGian / 1000 / 60 / 60);
  const phut = Math.floor((khoangThoiGian / 1000 / 60) % 60);
  const giay = Math.floor((khoangThoiGian / 1000) % 60);

  // Hiển thị thời gian dạng HH:MM:SS
  document.getElementById('thoiGian').innerText = `${gio
    .toString()
    .padStart(2, '0')}:${phut.toString().padStart(2, '0')}:${giay
    .toString()
    .padStart(2, '0')}`;
}

// Hàm để lưu dữ liệu vào bảng danh sách và xuất ra file PDF
function luuDuLieu() {
  hienThiDanhSach(); // Hiển thị lại danh sách trong bảng
  xuatExcel(); // Gọi hàm xuất file PDF
}

function xuatExcel() {
  // Lấy tên bộ phận lắp ráp
  const tenBoPhan = document.getElementById('tenBoPhan').value;
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

  // Thêm tên bộ phận lắp ráp vào đầu danh sách
  data.push(['部品の名前', tenBoPhan]);
  data.push([]); // Thêm dòng trống để cách giữa tên bộ phận và bảng dữ liệu

  // Thêm tiêu đề cột
  data.push(['タイプ', '名前', '数量']);

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

  // Thêm thông tin thời gian lắp ráp
  let thoiGianLapRap = `alert`; // Mặc định nếu không có thời gian kết thúc

  if (thoiGianBatDau && thoiGianKetThuc) {
    const thoiGianLapRapMs = thoiGianKetThuc - thoiGianBatDau; // Thời gian lắp ráp bằng milliseconds
    const thoiGianLapRapPhut = Math.floor(thoiGianLapRapMs / 1000 / 60); // Chuyển đổi sang phút

    // Kiểm tra và hiển thị nếu thời gian hợp lệ
    if (thoiGianLapRapPhut >= 0) {
      thoiGianLapRap = `${thoiGianLapRapPhut} 分`; // Hoặc chuyển đổi sang giờ và phút nếu cần
    }
  }

  // Thêm vào mảng dữ liệu
  data.push([]);
  data.push(['注意点', document.getElementById('ghiChu').value]);
  data.push(['組立の時間', thoiGianLapRap]);

  // Tạo workbook và worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, 'Danh sách');

  // Xuất file Excel
  XLSX.writeFile(wb, 'danh_sach_oc_linh_kien.xlsx');
}

// Hàm xóa tất cả dữ liệu đã nhập
function xoaDuLieu() {
  danhSachOcTam = [];
  danhSachLinhKienTam = [];
  hienThiDanhSach();
}
