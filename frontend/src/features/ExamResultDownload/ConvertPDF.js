import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const convertToPDFandDownload = (
  inputData = [{ Name: "Tom", Age: "20", Score: "90" }],
  fileName = "data.pdf"
) => {
  const doc = new jsPDF();
  doc.setFontSize(16);
  doc.text(fileName.split('.')[0], 14, 10);

  const headers = [Object.keys(inputData[0])]; 
  const tableData = inputData.map((item) => Object.values(item)); 

  autoTable(doc, {
    head: headers,
    body: tableData,
    startY: 20, 
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [22, 160, 133] },
  });
  doc.save(fileName);
};
