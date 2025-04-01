import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

export const convertToXLSXandDownload = async (
  inputData = [{ Name: "Tom", Age: "20", Score: "90" }],
  fileName = "data.xlsx"
) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");
  const headers = Object.keys(inputData[0]);
  worksheet.addRow(headers);
  inputData.forEach((item) => {
    worksheet.addRow(Object.values(item));
  });
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, fileName);
};
