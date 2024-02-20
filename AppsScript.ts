function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu('Create PDFs');
  menu.addItem('Convert Docs to PDF', 'convertDocsToPDF'); // Added menu item for PDF conversion
  menu.addToUi();
}

function convertDocsToPDF() {
  const googleDocTemplateId = '1gP-_LW_6z5kXO2kkWuI_-fliuG6MSvM1uXyGAL-eU4w';
  const destinationFolderId = '1xtA17YzK-HwYg_3OrKB3y_AYLdjs-7c4';
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  const rows = sheet.getDataRange().getValues();

  const templateFile = DriveApp.getFileById(googleDocTemplateId);
  const destinationFolder = DriveApp.getFolderById(destinationFolderId);

  rows.forEach(function (row, index) {
    if (index === 0) return;
    if (!row[0]) return;

    // Check if "Document Link" is empty
    if (!row[14]) {
      // Create a new Google Doc based on the template
      const newDoc = DocumentApp.openById(templateFile.makeCopy().getId());
      // Set the title of the new document
      newDoc.setName(`${row[0]} - Customer Order`);
      const body = newDoc.getBody();
      const friendlyDate = new Date(row[2]).toLocaleDateString();

      // Replace placeholders with data from the spreadsheet
      body.replaceText('{{Full Name}}', row[0]);
      body.replaceText('{{Rush}}', row[1]);
      body.replaceText('{{Phone Number}}', row[5]);
      body.replaceText('{{Email Address}}', row[4]);
      body.replaceText('{{Film}}', row[6]);
      body.replaceText('{{Rolls}}', row[3]);
      body.replaceText('{{Negatives}}', row[7]);
      body.replaceText('{{Service}}', row[8]);
      body.replaceText('{{Due}}', friendlyDate);

      // Save and close the Google Doc
      newDoc.saveAndClose();

      // Convert the Google Doc to PDF
      const pdfBlob = DriveApp.getFileById(newDoc.getId()).getAs('application/pdf');
      pdfBlob.setName(`${row[0]} - Customer Order.pdf`);

      // Get the PDF file URL and store it in the spreadsheet
      const pdfUrl = destinationFolder.createFile(pdfBlob).getUrl();
      sheet.getRange(index + 1, 10).setValue(pdfUrl); // 10 is the "Document Link" column

      // Delete the temporary Google Doc
      DriveApp.getFileById(newDoc.getId()).setTrashed(true);
    }
  });

  SpreadsheetApp.getUi().alert('PDF creation and conversion completed!');
}