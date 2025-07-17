function exportPDF() {
  const { jsPDF } = window.jspdf;
  html2canvas(document.querySelector("#dataContent")).then(canvas => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("data-keuangan.pdf");
  });
}

function exportJPG() {
  html2canvas(document.querySelector("#dataContent")).then(canvas => {
    const link = document.createElement("a");
    link.download = "data-keuangan.jpg";
    link.href = canvas.toDataURL("image/jpeg");
    link.click();
  });
}

function exportWord() {
  const content = document.getElementById("dataContent").innerHTML;
  const header = "<html><head><meta charset='utf-8'><title>Export Word</title></head><body>";
  const footer = "</body></html>";
  const blob = new Blob([header + content + footer], { type: "application/msword" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = "data-keuangan.doc";
  link.click();
}

function exportExcel() {
  const table = document.querySelector("table");
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.table_to_sheet(table);
  XLSX.utils.book_append_sheet(wb, ws, "Data Keuangan");
  XLSX.writeFile(wb, "data-keuangan.xlsx");
}
