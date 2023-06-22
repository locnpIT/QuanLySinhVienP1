var danhSachSinhVien = new DanhSachSinhVien();

GetStorage();

var validate = new Validation();

// Bổ sung thuộc tính cho SinhVien
SinhVien.prototype.DiemToan = '';
SinhVien.prototype.DiemLy = '';
SinhVien.prototype.DiemHoa= '';
SinhVien.prototype.DiemTB = '';
SinhVien.prototype.Loai = '';
// thêm phương thức
SinhVien.prototype.TinhDTB = function(){
    this.DTB = (Number(this.DiemToan) + Number(this.DiemLy) + Number(this.DiemHoa))/3; 

}
SinhVien.prototype.XepLoai = function(){
    if(this.DTB <= 10 && this.DTB >= 8){
        this.Loai = "Giỏi";
    }
    else if(this.DTB < 8 && this.DTB> 6.5){
        this.Loai = "Khá";
    }
    else if(this.DTB < 6.5 && this.DTB >= 5){
        this.Loai = "Trung Bình";
    }
    else{
        this.Loai = "Yếu";
    }
}



function ThemSinhVien() {
    // lấy dữ liệu từ người dùng nhập vào 
    var masv = document.getElementById("masv").value;
    var hoten = document.getElementById("hoten").value;
    var cmnd = document.getElementById("cmnd").value;
    var sdt = document.getElementById("sdt").value;
    var email = document.getElementById("email").value;
    var loi = 0;  


    // Kiểm tra  validation
    if(KiemTraDauVaoRong("masv", masv) === true){
        loi++;
    }
    if(KiemTraDauVaoRong("hoten", hoten) === true){
        loi++;
    }
    if(KiemTraDauVaoRong("cmnd", cmnd) === true){
        loi++;
    }
    if(validate.KiemTraEmail(email)){
        document.getElementById("email").style.borderColor = "green";
    }
    else{
        document.getElementById("email").style.borderColor = "red";
        loi++;
    }
    if(validate.KiemTraSDT(sdt)){
        document.getElementById("sdt").style.borderColor = "green";
    }
    else{
        document.getElementById("sdt").style.borderColor = "red";
        loi++;

    }
    if(loi != 0){
        return;
    }

    
    // thêm sinh viên
    var sinhvien = new SinhVien(masv,hoten,email,sdt,cmnd);
    sinhvien.DiemToan = document.getElementById("Toan").value;
    sinhvien.DiemLy = document.getElementById("Ly").value;
    sinhvien.DiemHoa = document.getElementById("Hoa").value;
    sinhvien.TinhDTB();
    sinhvien.XepLoai();



    danhSachSinhVien.ThemSinhVien(sinhvien);
    // cập nhật danh sách sinh viên
    CapNhatDanhSachSV(danhSachSinhVien);

}
 // hàm kiểm tra đầu vào rỗng
 function KiemTraDauVaoRong(ID, value){
    if(validate.KiemTraTrong(value) == true){
        document.getElementById(ID).style.borderColor = "red";
        return true;
    }
    else{
        document.getElementById(ID).style.borderColor = "green";
        return false;
    }
}

function CapNhatDanhSachSV(DanhSachSinhVien){
    var listTableSV = document.getElementById("tbodySinhVien");
    listTableSV.innerHTML = "";
    for(var i = 0; i < DanhSachSinhVien.DSSV.length; i++){
        // lấy thông tin sinh viên từ trong mảng
        var sv = danhSachSinhVien.DSSV[i];
        
        // tạo thẻ tr
        var trSinhVien = document.createElement("tr");
        trSinhVien.id = sv.MaSV;
        trSinhVien.className = "trSinhVien";
        trSinhVien.setAttribute("onclick","ChinhSuaSinhVien('"+sv.MaSV+"')");



        // tạo thẻ td và fill dữ liệu các sinh viên thứ [i] vào
        var tdCheckBox = document.createElement("td");
        var ckbMaSinhVien = document.createElement("input");
        ckbMaSinhVien.setAttribute("class", "ckbMaSV");
        ckbMaSinhVien.setAttribute("type","checkbox");
        ckbMaSinhVien.setAttribute("value", sv.MaSV);
        tdCheckBox.appendChild(ckbMaSinhVien);

        
        


        var tdMaSV = TaoTheTD("MaSV", sv.MaSV);
        var tdHoTen = TaoTheTD("HoTen", sv.HoTen);
        var tdCMND = TaoTheTD("CMND", sv.CMND);
        var tdEmail = TaoTheTD("Email", sv.Email);
        var tdSoDT = TaoTheTD("SoDT", sv.SoDT);

        // Tạo td điểm trung bình và xếp loại
        var tdDTB = TaoTheTD("DTB", sv.DTB);
        var tdXepLoai = TaoTheTD("XepLoai", sv.Loai);






        // append các td vào tr

        trSinhVien.appendChild(tdCheckBox);
        trSinhVien.appendChild(tdMaSV);
        trSinhVien.appendChild(tdHoTen);
        trSinhVien.appendChild(tdEmail);
        trSinhVien.appendChild(tdCMND);
        trSinhVien.appendChild(tdSoDT);
        trSinhVien.appendChild(tdDTB);
        trSinhVien.appendChild(tdXepLoai);
        // append các tr vào tbodySinhVien
        listTableSV.appendChild(trSinhVien);

    }
}

function TaoTheTD(className, value){
    var td = document.createElement("td");
    td.className = className;
    td.innerHTML = value;
    return td;
}

function SetStorage(){
    // chuyển đổi object mảng danh sách sinh viên ra chuỗi json
    var jsonDanhSachSinhVien = JSON.stringify(danhSachSinhVien.DSSV);
    // rồi đem chuỗi json lưu vào storage và đặt tên là DanhSachSV
    localStorage.setItem("DanhSachSV",jsonDanhSachSinhVien);
}
function GetStorage(){
    // lấy ra chuỗi json là mảng danhsachsinhvien thông qua DanhSachSV
    var jsonDanhSachSinhVien = localStorage.getItem("DanhSachSV");
    var mangDSSV = JSON.parse(jsonDanhSachSinhVien);
    danhSachSinhVien.DSSV = mangDSSV;
    CapNhatDanhSachSV(danhSachSinhVien);
}
// Xóa sinh viên
function XoaSinhVien(){
    // mảng checkbox
    var listMaSV = document.getElementsByClassName("ckbMaSV");
    // mảng mã sinh viên được chọn
    var listMaSVDuocChon = [];
    
    for(let i = 0; i < listMaSV.length; i++){
        if(listMaSV[i].checked){ // kiểm tra phần tử đó có được chọn hay chưa
            listMaSVDuocChon.push(listMaSV[i].value);
        }
    }
    danhSachSinhVien.XoaSinhVien(listMaSVDuocChon);
    CapNhatDanhSachSV(danhSachSinhVien);

}
function TimKiemSinhVien(){
    var tukhoa = document.getElementById("tukhoa").value;
    var listDanhSachSinhVienTimKiem = danhSachSinhVien.TimKiemSinhVien(tukhoa);
    CapNhatDanhSachSV(listDanhSachSinhVienTimKiem);

}

function ChinhSuaSinhVien(masv){
    var sinhvien = danhSachSinhVien.TimSVTheoMa(masv);
    if(sinhvien != null){
        document.getElementById("masv").value = sinhvien.MaSV;
        document.getElementById("hoten").value = sinhvien.HoTen;
        document.getElementById("cmnd").value = sinhvien.CMND;
        document.getElementById("sdt").value = sinhvien.SoDT;
        document.getElementById("email").value = sinhvien.Email;
    }
}

function LuuThongTin()
{
    //Lấy dữ liệu từ người dùng nhập vào
        var masv = document.getElementById("masv").value;
        var hoten = document.getElementById("hoten").value;
        var cmnd = document.getElementById("cmnd").value;
        var sdt = document.getElementById("sdt").value;
        var email = document.getElementById("email").value;
        var loi = 0;
    //Kiểm tra validation
    if(KiemTraDauVaoRong("masv",masv) == true)
    {
        loi++;
    }
    if(KiemTraDauVaoRong("hoten",hoten) == true)
    {
        loi++;
    }
    if(KiemTraDauVaoRong("cmnd",cmnd) == true)
    {
        loi++;
    }   
    if(validate.KiemTraEmail(email))
    {
        document.getElementById("email").style.borderColor = "green";
    }
    else
    {
        document.getElementById("email").style.borderColor = "red";
        loi++;
    }
    if(validate.KiemTraSDT(sdt))
    {
        document.getElementById("sdt").style.borderColor = "green";
    }
    else
    {
        document.getElementById("sdt").style.borderColor = "red";
        loi++;
    }
    if(loi != 0)
    {
        return ;
    }
    //Thêm sinh viên
    var sinhvien = new SinhVien(masv,hoten,email,sdt,cmnd);
    sinhvien.DiemToan = document.getElementById("Toan").value;
    sinhvien.DiemLy = document.getElementById("Ly").value;
    sinhvien.DiemHoa = document.getElementById("Hoa").value;
    sinhvien.TinhDTB();
    sinhvien.XepLoai();
    danhSachSinhVien.SuaSinhVien(sinhvien);
    CapNhatDanhSachSV(danhSachSinhVien);
}