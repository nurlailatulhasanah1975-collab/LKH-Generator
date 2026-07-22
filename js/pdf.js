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
        left: 15,
        right: 15,
        top: 15,
        bottom: 15
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
    logoY: 7,
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











    
    //----------------------------------------------------
    // DATA EXCEL
    //----------------------------------------------------

    let sheet = getSheetByIndex(excelData,0);

    y = panel.top + panel.height + 8;
    
    doc.setFont("helvetica","bold");

    doc.text("DATA DARI EXCEL",15,y);

    doc.setFont("helvetica","normal");

    y += 8;

    for(let r=0;r<sheet.length;r++){

        let row = sheet[r];

        let text = row.join(" | ");

        doc.text(text.substring(0,170),15,y);

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
