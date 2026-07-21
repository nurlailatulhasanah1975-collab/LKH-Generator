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

const KOP = {
    top: 15,
    left: 15,
    right: 282,
    logoSize: 20
};

// Border sementara sebagai acuan visual
doc.setDrawColor(180);
doc.rect(
    KOP.left,
    KOP.top,
    KOP.right - KOP.left,
    28
);

// Placeholder Logo
doc.circle(
    KOP.left + 10,
    KOP.top + 14,
    8
);

doc.setFont("helvetica","bold");
doc.setFontSize(15);

doc.text(
    "KEMENTERIAN AGAMA REPUBLIK INDONESIA",
    148,
    KOP.top + 6,
    { align:"center" }
);

doc.setFontSize(14);

doc.text(
    "MTs AL-IHSAN TANAH GROGOT",
    148,
    KOP.top + 13,
    { align:"center" }
);

doc.setFont("helvetica","normal");
doc.setFontSize(9);

doc.text(
    "Alamat Madrasah (sementara)",
    148,
    KOP.top + 19,
    { align:"center" }
);

// Garis bawah kop
doc.setDrawColor(0);

doc.setLineWidth(0.5);

doc.line(
    KOP.left,
    KOP.top + 30,
    KOP.right,
    KOP.top + 30
);    //----------------------------------------------------
    // DATA GURU
    //----------------------------------------------------

    layout.setY(35);

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
