// =====================================================
// app.js
// Controller Utama
// =====================================================

let formData = {};
let excelData = null;
let pdfBlob = null;

// -----------------------------------------------------
// Saat halaman selesai dimuat
// -----------------------------------------------------

document.addEventListener("DOMContentLoaded", () => {

    const fileInput = document.getElementById("excelFile");
    const btnPreview = document.getElementById("btnPreview");
    const btnDownload = document.getElementById("btnDownload");

    // pilih file excel
    fileInput.addEventListener("change", handleExcel);

    // preview pdf
    btnPreview.addEventListener("click", previewPDF);

    // download pdf
    btnDownload.addEventListener("click", downloadPDF);

});


// =====================================================
// Membaca file excel
// =====================================================

async function handleExcel(e){

    const file = e.target.files[0];

    if(!file){

        setStatus("Belum ada file dipilih.");

        excelData = null;

        return;

    }

    setStatus("Membaca Excel ...");

    try{

        excelData = await bacaExcel(file);

        setStatus("✓ Excel berhasil dibaca");

    }
    catch(err){

        console.error(err);

        excelData = null;

        setStatus("❌ Gagal membaca Excel");

    }

}


// =====================================================
// Ambil data form
// =====================================================

function ambilDataForm(){

    return{

        namaGuru : document.getElementById("namaGuru").value,

        nipGuru : document.getElementById("nipGuru").value,

        statusGuru : document.getElementById("statusGuru").value,

        noSertifikasi : document.getElementById("noSertifikasi").value,

        pangkat : document.getElementById("pangkat").value,

        pendidikan : document.getElementById("pendidikan").value,

        namaMadrasah : document.getElementById("namaMadrasah").value,

        npsn : document.getElementById("npsn").value,

        nsm : document.getElementById("nsm").value,

        alamatMadrasah : document.getElementById("alamatMadrasah").value,

        jumlahRuangKelas : document.getElementById("jumlahRuang").value,

        statusMadrasah : document.getElementById("statusMadrasah").value,

        internet : document.getElementById("internet").value,

        kepalaMadrasah : document.getElementById("kepalaMadrasah").value,

        nipKepala : document.getElementById("nipKepala").value,

        tempat : document.getElementById("tempat").value,

        bulan : document.getElementById("bulan").value,

        tahun : document.getElementById("tahun").value

    };

}


// =====================================================
// Preview PDF
// =====================================================

async function previewPDF(){

    formData = ambilDataForm();

    if(!excelData){

        alert("Silakan pilih file Excel terlebih dahulu.");

        return;

    }

    try{

        pdfBlob = await buatPDF(formData, excelData);

        const url = URL.createObjectURL(pdfBlob);

        window.open(url, "_blank");

        document.getElementById("btnDownload").disabled = false;

    }
    catch(err){

        console.error(err);

        alert("Gagal membuat PDF.");

    }

}


// =====================================================
// Download PDF
// =====================================================

function downloadPDF(){

    if(!pdfBlob){

        return;

    }

    const link = document.createElement("a");

    link.href = URL.createObjectURL(pdfBlob);

    link.download = "Jurnal-LKH.pdf";

    link.click();

}


// =====================================================
// Status
// =====================================================

function setStatus(text){

    document.getElementById("statusExcel").textContent = text;

}
