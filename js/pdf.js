// =====================================================
// pdf.js
// Generator PDF v0.1
// Library : jsPDF
// =====================================================

async function buatPDF(formData, excelData) {

    const { jsPDF } = window.jspdf;

    const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4"
    });

    // =====================================================
    // STANDAR DOKUMEN
    // =====================================================

    const PAGE = {
        width: doc.internal.pageSize.getWidth(),
        height: doc.internal.pageSize.getHeight()
    };

    // Margin menggunakan standar proyek
    // (nilai akan mengikuti spesifikasi yang telah ditetapkan)
    const MARGIN = {
        left: 8,
        right: 8,
        top: 10,
        bottom: 10
    };

    // =====================================================
    // LAYOUT ENGINE v0.2 (Fondasi)
    // =====================================================

    class LayoutManager {

        constructor(doc){

            this.doc = doc;
            this.page = 1;
            this.y = 0;

        }

        setY(value){

            this.y = value;

        }

        getY(){

            return this.y;

        }

        move(mm){

            this.y += mm;

        }

    }

    const layout = new LayoutManager(doc);
    
//----------------------------------------------------
// HEADER
//----------------------------------------------------
//----------------------------------------------------
// KOP SURAT
//----------------------------------------------------

const kop = {
    x: 15,
    y: 5,
    w: 267,
    h: 42,

    logoX: 17,
    logoY: 2,
    logoW: 28,
    logoH: 34,

    textLeft: 50,
    textRight: 282
};

//====================================================
// Logo Placeholder
//====================================================

doc.setDrawColor(120);

doc.rect(
    kop.logoX,
    kop.logoY,
    kop.logoW,
    kop.logoH
);

doc.setFont("helvetica","bold");
doc.setFontSize(8);

doc.text(
    "LOGO",
    kop.logoX + 14,
    kop.logoY + 18,
    {align:"center"}
);

//====================================================
// Yayasan
//====================================================

doc.setFont("times","bold");
doc.setFontSize(12);

doc.text(
    "YAYASAN AL-IHSAN AL-ISLAMI",
    166,
    17,
    {align:"center"}
);

//====================================================
// Nama Madrasah
//====================================================

doc.setFont("times","bold");
doc.setFontSize(24);

doc.text(
    "MTs. AL IHSAN TANAH GROGOT",
    166,
    29,
    {align:"center"}
);

//====================================================
// Garis 1
//====================================================

doc.setLineWidth(0.3);

doc.line(
    50,
    34,
    282,
    34
);

//====================================================
// NPSN | NSM
//====================================================

doc.setFont("times","bold");
doc.setFontSize(9);

doc.text(
    "NPSN : 30410000",
    92,
    41,
    {align:"center"}
);

doc.text(
    "|",
    166,
    46,
    {align:"center"}
);

doc.text(
    "NSM : 12.12.64.01.0002",
    220,
    41,
    {align:"center"}
);

//====================================================
// Garis 2
//====================================================

doc.line(
    50,
    44,
    282,
    44
);

//====================================================
// Alamat
//====================================================

doc.setFont("times","normal");
doc.setFontSize(8);

doc.text(
    "Alamat : Jl. Senaken Ds. Senaken RT. IV Tanah Grogot Kab. Paser Kalimantan Timur 76251",
    166,
    51,
    {align:"center"}
);

//====================================================
// Telepon & Email
//====================================================

doc.text(
    "Telp. (0543) 5236320    |    e-mail : mtsalihsan_senaken@yahoo.com",
    166,
    58,
    {align:"center"}
);

//====================================================
// Garis Ganda
//====================================================

doc.setLineWidth(0.8);

doc.line(
    15,
    63,
    282,
    63
);

doc.setLineWidth(0.2);

doc.line(
    15,
    64.2,
    282,
    64.2
);

    doc.setFont("times","bold");
doc.setFontSize(14);

doc.text(
    "JURNAL MENGAJAR DAN LAPORAN KINERJA HARIAN",
    148.5,
    76,
    { align: "center" }
);

doc.setFontSize(12);

doc.text(
    "BULAN : " + formData.bulan + " " + formData.tahun,
    148.5,
    83,
    { align: "center" }
);
    
//----------------------------------------------------
// PANEL IDENTITAS
//----------------------------------------------------

const panelGap = 4;

const contentWidth = PAGE.width - MARGIN.left - MARGIN.right;

const panel = {
    top: 90,
    left: MARGIN.left,
    gap: panelGap,
    width: (contentWidth - panelGap) / 2,
    height: 52,
    titleHeight: 8
};

const panel2X = panel.left + panel.width + panel.gap;

//--------------------------------------
// Layout Isi Panel
//--------------------------------------

const leftRows = 6;
const rightRows = 5;

const startY = panel.top + panel.titleHeight + 8;

const endYLeft = panel.top + panel.height - 5;
const endYRight = panel.top + panel.height - 5;

const leftGap = (endYLeft - startY) / (leftRows - 1);
const rightGap = (endYRight - startY) / (rightRows - 1);

//--------------------------------------
// Frame kiri
//--------------------------------------

doc.setLineWidth(0.2);

doc.rect(
    panel.left,
    panel.top,
    panel.width,
    panel.height
);

doc.line(
    panel.left,
    panel.top + panel.titleHeight,
    panel.left + panel.width,
    panel.top + panel.titleHeight
);

//--------------------------------------
// Frame kanan
//--------------------------------------

doc.rect(
    panel2X,
    panel.top,
    panel.width,
    panel.height
);

doc.line(
    panel2X,
    panel.top + panel.titleHeight,
    panel2X + panel.width,
    panel.top + panel.titleHeight
);

//--------------------------------------
// Judul Panel
//--------------------------------------

doc.setFont("times","bold");
doc.setFontSize(11);

doc.text(
    "IDENTITAS GURU",
    panel.left + panel.width / 2,
    panel.top + 5.5,
    { align:"center" }
);

doc.text(
    "IDENTITAS MADRASAH",
    panel2X + panel.width / 2,
    panel.top + 5.5,
    { align:"center" }
);

//--------------------------------------
// Isi Panel Kiri
//--------------------------------------

doc.setFont("helvetica","normal");
doc.setFontSize(10);

const leftLabelX = panel.left + 5;
const leftColonX = panel.left + 43;
const leftValueX = panel.left + 46;

let y1 = startY;

doc.text("Nama Guru", leftLabelX, y1);
doc.text(":", leftColonX, y1);
doc.text(formData.namaGuru, leftValueX, y1);

y1 += leftGap;

doc.text("NIP", leftLabelX, y1);
doc.text(":", leftColonX, y1);
doc.text(formData.nipGuru, leftValueX, y1);

y1 += leftGap;

doc.text("Status Guru", leftLabelX, y1);
doc.text(":", leftColonX, y1);
doc.text(formData.statusGuru, leftValueX, y1);

y1 += leftGap;

doc.text("No Sertifikasi", leftLabelX, y1);
doc.text(":", leftColonX, y1);
doc.text(formData.noSertifikasi, leftValueX, y1);

y1 += leftGap;

doc.text("Pangkat", leftLabelX, y1);
doc.text(":", leftColonX, y1);
doc.text(formData.pangkat, leftValueX, y1);

y1 += leftGap;

doc.text("Pendidikan", leftLabelX, y1);
doc.text(":", leftColonX, y1);
doc.text(formData.pendidikan, leftValueX, y1);

//--------------------------------------
// Isi Panel Kanan
//--------------------------------------

const rightLabelX = panel2X + 6;
const rightColonX = panel2X + 46;
const rightValueX = panel2X + 49;

let y2 = startY;

doc.text("Nama Madrasah", rightLabelX, y2);
doc.text(":", rightColonX, y2);
doc.text(formData.namaMadrasah, rightValueX, y2);

y2 += rightGap;

doc.text("Alamat Madrasah", rightLabelX, y2);
doc.text(":", rightColonX, y2);
doc.text(formData.alamatMadrasah, rightValueX, y2);

y2 += rightGap;

doc.text("Jumlah Ruang Kelas", rightLabelX, y2);
doc.text(":", rightColonX, y2);
doc.text(formData.jumlahRuangKelas, rightValueX, y2);

y2 += rightGap;

doc.text("Status Madrasah", rightLabelX, y2);
doc.text(":", rightColonX, y2);
doc.text(formData.statusMadrasah, rightValueX, y2);

y2 += rightGap;

doc.text("Internet", rightLabelX, y2);
doc.text(":", rightColonX, y2);
doc.text(formData.internet, rightValueX, y2);


//----------------------------------------------------
// TABLE ENGINE v0.1
//----------------------------------------------------

const TABLE = {

    // posisi tabel
    x: MARGIN.left,
    y: panel.top + panel.height + 8,

    // ukuran dasar
    width: PAGE.width - MARGIN.left - MARGIN.right,

    rowHeight: 7,

    headerHeight: 14,

    // definisi kolom
    columns: [

        { key:"no",       title:"No",                  weight:4 },

        { key:"tanggal",  title:"Hari / Tanggal",      weight:16 },

        { key:"jam",      title:"Jam Ke-",             weight:7 },

        { key:"kelas",    title:"Kelas / Ekskul",      weight:8 },

        { key:"mapel",    title:"Mata Pelajaran",      weight:14 },

        { key:"kikd",     title:"No KI/KD",            weight:8 },

        { key:"materi",   title:"Kegiatan / Materi",   weight:28 },

        { key:"hasil",    title:"Hasil",               weight:10 },

        { key:"vol",      title:"Vol",                 weight:5 },

        { key:"s",        title:"S",                   weight:3 },

        { key:"i",        title:"I",                   weight:3 },

        { key:"a",        title:"A",                   weight:3 },

        { key:"ket",      title:"Ket",                 weight:7 }

    ]

};

    const COL = buildColumns(TABLE);

//----------------------------------------------------
// MENCARI KOLOM BERDASARKAN KEY
//----------------------------------------------------

function getColumn(key){

    return COL.find(col => col.key === key);

}
    
//----------------------------------------------------
// DRAW TABLE HEADER
//----------------------------------------------------

function drawTableHeader(doc, table, columns){

    const y = table.y;

    doc.setLineWidth(0.2);

    // Border luar
    doc.rect(
        table.x,
        y,
        table.width,
        table.headerHeight
    );

    // Garis vertikal
    columns.forEach(col=>{

        doc.line(
            col.x,
            y,
            col.x,
            y + table.headerHeight
        );

    });

    // Garis kanan terakhir
    doc.line(
        table.x + table.width,
        y,
        table.x + table.width,
        y + table.headerHeight
    );

    // ==========================
    // Judul Kolom
    // ==========================

    doc.setFont("times","bold");
    doc.setFontSize(8);

    columns.forEach(col=>{

        doc.text(
            col.title,
            col.center,
            y + table.headerHeight / 2 + 1,
            {
                align:"center",
                baseline:"middle"
            }
        );

    });

}    

//----------------------------------------------------
// TABLE LAYOUT ENGINE
//----------------------------------------------------

function buildColumns(table){

    const totalWeight = table.columns.reduce(
        (sum, col) => sum + col.weight,
        0
    );

    const mmPerWeight = table.width / totalWeight;

    let currentX = table.x;

    return table.columns.map(col => {

        const width = col.weight * mmPerWeight;

        const result = {

            ...col,

            x: currentX,

            width: width,

            center: currentX + (width / 2)

        };

        currentX += width;

        return result;

    });

}
    
//----------------------------------------------------
// DATA EXCEL
//----------------------------------------------------

drawTableHeader(doc, TABLE, COL);
    
let sheet = getSheetByIndex(excelData,0);

    alert("Sheet terbaca");

console.table(sheet);
    
// Posisi awal mengikuti TABLE Engine
let y = TABLE.y + TABLE.headerHeight;
    
    doc.setFont("helvetica","bold");

    doc.text("DATA DARI EXCEL",15,y);

    doc.setFont("helvetica","normal");

    y += 8;

//----------------------------------------------------
// MEMBANGUN DATA LAPORAN DARI DATA EXCEL
//----------------------------------------------------

function buildReportRow(row, nomor, formData){

    return {

        no : nomor,

        const tgl = parseInt(row[0], 10);

const namaBulan = [
    "Januari","Februari","Maret","April","Mei","Juni",
    "Juli","Agustus","September","Oktober","November","Desember"
];

const bulan = namaBulan.indexOf(formData.bulan);

const tanggalObj = new Date(formData.tahun, bulan, tgl);

const namaHari = [
    "Minggu","Senin","Selasa","Rabu",
    "Kamis","Jumat","Sabtu"
];

return {

    no : nomor,

    hari : namaHari[tanggalObj.getDay()],

    tanggal : `${tgl} ${formData.bulan} ${formData.tahun}`,

    jam : row[1],

    kelas : row[2],

    mapel : row[3],

    kikd : row[4],

    materi : row[5],

    hasil : row[6],

    vol : row[7],

    s : row[8],

    i : row[9],

    a : row[10],

    ket : row[11]

};      

        jam : row[1],

        kelas : row[2],

        mapel : row[3],

        kikd : row[4],

        materi : row[5],

        hasil : row[6],

        vol : row[7],

        s : row[8],

        i : row[9],

        a : row[10],

        ket : row[11]

    };

}
    
//----------------------------------------------------
// DRAW SATU BARIS TABEL
//----------------------------------------------------

function drawTableRow(doc, row, y){

    const no = getColumn("no");
    const tanggal = getColumn("tanggal");
    const jam = getColumn("jam");

    doc.setFont("helvetica","normal");
    doc.setFontSize(8);

// No
doc.text(
    String(row.no),
    no.center,
    y,
    {align:"center"}
);

// Hari / Tanggal
doc.text(
    row.hari,
    tanggal.x + 1,
    y - 1.5
);

doc.text(
    row.tanggal,
    tanggal.x + 1,
    y + 2
);
// Jam
doc.text(
    String(row.jam),
    jam.center,
    y,
    {align:"center"}
);
}
    //MODE LAMA
    
    for(let r=0;r<sheet.length;r++){

        let row = sheet[r];

        const reportRow = buildReportRow(
    row,
    r + 1,
    formData
);

drawTableRow(doc, reportRow, y);

        y += 5;

        if(y>190){

            doc.addPage("a4","landscape");

            y=20;

        }

    }



    //----------------------------------------------------
    // PENGESAHAN
    //----------------------------------------------------

    y += 10;

    if(y>160){

        doc.addPage("a4","landscape");

        y=20;

    }

    doc.text(
        formData.tempat + ", 31 " + formData.bulan + " " + formData.tahun,
        210,
        y
    );

    y+=8;

    doc.text("Mengetahui,",210,y);

    y+=25;

    doc.text(formData.kepalaMadrasah,210,y);

    y+=5;

    doc.text("NIP. " + formData.nipKepala,210,y);



    //----------------------------------------------------
    // FOOTER
    //----------------------------------------------------

    let total = doc.getNumberOfPages();

    for(let i=1;i<=total;i++){

        doc.setPage(i);

        doc.setFontSize(8);

        doc.text(

            "Halaman " + i + " dari " + total,

            148,

            205,

            {align:"center"}

        );

    }



    //----------------------------------------------------
    // RETURN BLOB
    //----------------------------------------------------

    return doc.output("blob");

}
