// ======================================================
// excel.js
// Membaca file Excel (.xlsx)
// Library : SheetJS (xlsx.full.min.js)
// ======================================================

async function bacaExcel(file) {

    return new Promise((resolve, reject) => {

        const reader = new FileReader();

        reader.onload = function (e) {

            try {

                const data = new Uint8Array(e.target.result);

                const workbook = XLSX.read(data, {
                    type: "array"
                });

                const hasil = {

                    workbook: workbook,

                    sheetNames: workbook.SheetNames,

                    sheets: {}

                };

                // Membaca seluruh sheet
                workbook.SheetNames.forEach(sheetName => {

                    const sheet = workbook.Sheets[sheetName];

                    hasil.sheets[sheetName] = XLSX.utils.sheet_to_json(sheet, {
                        header: 1,
                        defval: ""
                    });

                });

                console.log("Workbook :", hasil);

                resolve(hasil);

            } catch (err) {

                reject(err);

            }

        };

        reader.onerror = reject;

        reader.readAsArrayBuffer(file);

    });

}


// ======================================================
// Mengambil sheet berdasarkan nama
// ======================================================

function getSheet(excelData, sheetName) {

    if (!excelData.sheets[sheetName]) {

        console.warn("Sheet tidak ditemukan :", sheetName);

        return [];

    }

    return excelData.sheets[sheetName];

}


// ======================================================
// Mengambil sheet berdasarkan index
// ======================================================

function getSheetByIndex(excelData, index) {

    const nama = excelData.sheetNames[index];

    return getSheet(excelData, nama);

}


// ======================================================
// Debug
// ======================================================

function tampilkanWorkbook(excelData) {

    console.log("========== WORKBOOK ==========");

    console.log("Jumlah Sheet :", excelData.sheetNames.length);

    excelData.sheetNames.forEach((nama, i) => {

        console.log((i + 1) + ". " + nama);

    });

}