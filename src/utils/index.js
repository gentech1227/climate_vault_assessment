import { saveAs } from "file-saver";
import * as XLSX from "xlsx";

export const exportToXLS = (header, data, name) => {
  var wb = XLSX.utils.book_new();

  let ws = XLSX.utils.json_to_sheet([header, ...data], { skipHeader: header });

  XLSX.utils.book_append_sheet(wb, ws, "MyData");

  const wbout = XLSX.write(wb, { type: "array", bookType: "xlsx" });

  saveAs(
    new Blob([wbout], { type: "application/octet-stream" }),
    `${name}.xlsx`
  );
};

export const exportToCSV = (header, data, name) => {
  if (!data) return;

  let csvData = [header, ...data];
  let csvContent = "data:text/csv;charset=utf-8,";

  csvData.forEach(function (rowArray) {
    const row = rowArray.join(",");
    csvContent += row + "\r\n"; // add carriage return
  });

  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", name + ".csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
