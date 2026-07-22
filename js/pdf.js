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
    y: 15,
    w: 267,
    h: 42,

    logoX: 17,
    logoY: 17,
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
    22,
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
    34,
    {align:"center"}
);

//====================================================
// Garis 1
//====================================================

doc.setLineWidth(0.3);

doc.line(
    50,
    39,
    282,
    39
);

//====================================================
// NPSN | NSM
//====================================================

doc.setFont("times","bold");
doc.setFontSize(9);

doc.text(
    "NPSN : 30410000",
    92,
    46,
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
    46,
    {align:"center"}
);

//====================================================
// Garis 2
//====================================================

doc.line(
    50,
    49,
    282,
    49
);

//====================================================
// Alamat
//====================================================

doc.setFont("times","normal");
doc.setFontSize(8);

doc.text(
    "Alamat : Jl. Senaken Ds. Senaken RT. IV Tanah Grogot Kab. Paser Kalimantan Timur 76251",
    166,
    56,
    {align:"center"}
);

//====================================================
// Telepon & Email
//====================================================

doc.text(
    "Telp. (0543) 5236320    |    e-mail : mtsalihsan_senaken@yahoo.com",
    166,
    63,
    {align:"center"}
);

//====================================================
// Garis Ganda
//====================================================

doc.setLineWidth(0.8);

doc.line(
    15,
    68,
    282,
    68
);

doc.setLineWidth(0.2);

doc.line(
    15,
    69.2,
    282,
    69.2
);
    
);    //----------------------------------------------------
    // DATA GURU
    //----------------------------------------------------

    layout.setY(50);

    doc.setFontSize(10);
    doc.setFont("helvetica","normal");

    doc.text("Nama Guru", 15, layout.getY());
doc.text(": " + formData.namaGuru, 50, layout.getY());

layout.move(6);

doc.text("NIP", 15, layout.getY());
doc.text(": " + formData.nipGuru, 50, layout.getY());

layout.move(6);

doc.text("Status Guru", 15, layout.getY());
doc.text(": " + formData.statusGuru, 50, layout.getY());

layout.move(6);

doc.text("No Sertifikasi", 15, layout.getY());
doc.text(": " + formData.noSertifikasi, 50, layout.getY());

layout.move(6);

doc.text("Pangkat", 15, layout.getY());
doc.text(": " + formData.pangkat, 50, layout.getY());

layout.move(6);

doc.text("Pendidikan", 15, layout.getY());
doc.text(": " + formData.pendidikan, 50, layout.getY());


    //----------------------------------------------------
    // DATA MADRASAH
    //----------------------------------------------------

let y = 35;

    doc.text("Nama Madrasah",160,y);
    doc.text(": " + formData.namaMadrasah,205,y);

    y+=6;

    doc.text("NPSN",160,y);
    doc.text(": " + formData.npsn,205,y);

    y+=6;

    doc.text("NSM",160,y);
    doc.text(": " + formData.nsm,205,y);

    y+=6;

    doc.text("Status",160,y);
    doc.text(": " + formData.statusMadrasah,205,y);

    y+=6;

    doc.text("Internet",160,y);
    doc.text(": " + formData.internet,205,y);



    //----------------------------------------------------
    // GARIS
    //----------------------------------------------------

    doc.line(15,75,282,75);



    //----------------------------------------------------
    // DATA EXCEL
    //----------------------------------------------------

    let sheet = getSheetByIndex(excelData,0);

    y = 82;

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
