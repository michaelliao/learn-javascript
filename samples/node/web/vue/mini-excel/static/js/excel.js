var xls_begin = '<?xml version="1.0"?>\n' +
    '<?mso-application progid="Excel.Sheet"?>\n' +
    '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"' +
    ' xmlns:o="urn:schemas-microsoft-com:office:office"' +
    ' xmlns:x="urn:schemas-microsoft-com:office:excel"' +
    ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"' +
    ' xmlns:html="http://www.w3.org/TR/REC-html40">\n' +
    ' <DocumentProperties xmlns="urn:schemas-microsoft-com:office:office">\n' +
    '  <Version>12.00</Version>\n' +
    ' </DocumentProperties>\n' +
    ' <Styles>\n' +
    '  <Style ss:ID="Default" ss:Name="Normal">\n' +
    '   <Alignment ss:Vertical="Bottom"/>\n' +
    '  </Style>\n' +
    '  <Style ss:ID="left">\n' +
    '   <Alignment ss:Horizontal="Left" ss:Vertical="Bottom" ss:WrapText="1"/>\n' +
    '  </Style>\n' +
    '  <Style ss:ID="center">\n' +
    '   <Alignment ss:Horizontal="Center" ss:Vertical="Bottom" ss:WrapText="1"/>\n' +
    '  </Style>\n' +
    '  <Style ss:ID="right">\n' +
    '   <Alignment ss:Horizontal="Right" ss:Vertical="Bottom" ss:WrapText="1"/>\n' +
    '  </Style>\n' +
    ' </Styles>\n' +
    ' <Worksheet ss:Name="Sheet1">\n' +
    '  <Table x:FullColumns="1" x:FullRows="1" ss:DefaultRowHeight="15">\n';

var xls_end = '  </Table>\n' +
    ' </Worksheet>\n' +
    '</Workbook>';

function escapeXmlForXls(unsafe) {
    return unsafe.replace(/[<>&'"]/g, function (c) {
        switch (c) {
            case '<': return '&lt;';
            case '>': return '&gt;';
            case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
        }
    });
}

function makeXlsRow(row) {
    var
        data = ['   <Row>'],
        i, cell;
    for (i=1; i<row.length; i++) {
        cell = row[i];
        data.push('    <Cell ss:StyleID="' + cell.align + '"><Data ss:Type="String">' + escapeXmlForXls(cell.text) + '</Data></Cell>');
    }
    data.push('   </Row>\n');
    return data.join('\n');
}

function makeXls(data) {
    var
        output = [xls_begin],
        i;
    for (i=0; i<data.length; i++) {
        output.push(makeXlsRow(data[i]));
    }
    output.push(xls_end);
    return output.join('');
}
