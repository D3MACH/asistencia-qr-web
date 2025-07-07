function doPost(e) {
  const ss = SpreadsheetApp.openById("REEMPLAZA_CON_TU_ID_DE_HOJA");
  const hoja = ss.getSheetByName("Asistencia");

  const data = JSON.parse(e.postData.contents);
  const fecha = data.fecha;
  const tipo = data.tipo;
  const codigo = data.codigo;

  const fila = hoja.getDataRange().getValues().findIndex(r => r[0] == codigo);
  if (fila < 1) return ContentService.createTextOutput("No encontrado");

  const colFecha = hoja.getDataRange().getValues()[0].indexOf(fecha + " " + tipo);
  if (colFecha === -1) {
    hoja.getRange(1, hoja.getLastColumn() + 1).setValue(fecha + " " + tipo);
  }

  const col = hoja.getDataRange().getValues()[0].indexOf(fecha + " " + tipo) + 1;
  const now = Utilities.formatDate(new Date(), "GMT-5", "HH:mm:ss");
  hoja.getRange(fila + 1, col).setValue(now);
  return ContentService.createTextOutput("Registrado");
}
