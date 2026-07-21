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

    //----------------------------------------------------
    // HEADER
    //----------------------------------------------------

    doc.setFont("helvetica","bold");
    doc.setFontSize(16);

    doc.text(
        "JURNAL MENGAJAR DAN LAPORAN KINERJA HARIAN",
        148,
        15,
        {align:"center"}
    );

    doc.setFontSize(12);

    doc.text(
        "PREVIEW V0.1",
        148,
        22,
        {align:"center"}
    );



    //----------------------------------------------------
    // DATA GURU
    //----------------------------------------------------

    let y = 35;

    doc.setFontSize(10);
    doc.setFont("helvetica","normal");

    doc.text("Nama Guru",15,y);
    doc.text(": " + formData.namaGuru,50,y);

    y+=6;

    doc.text("NIP",15,y);
    doc.text(": " + formData.nipGuru,50,y);

    y+=6;

    doc.text("Status Guru",15,y);
    doc.text(": " + formData.statusGuru,50,y);

    y+=6;

    doc.text("No Sertifikasi",15,y);
    doc.text(": " + formData.noSertifikasi,50,y);

    y+=6;

    doc.text("Pangkat",15,y);
    doc.text(": " + formData.pangkat,50,y);

    y+=6;

    doc.text("Pendidikan",15,y);
    doc.text(": " + formData.pendidikan,50,y);



    //----------------------------------------------------
    // DATA MADRASAH
    //----------------------------------------------------

    y = 35;

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