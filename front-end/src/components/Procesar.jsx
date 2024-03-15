import React from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

class ExcelReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      excelData: []
    };
  }

  componentDidMount() {
  
    handleFileUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
  
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        this.setState({ excelData });
      };
  
      reader.readAsArrayBuffer(file);
    };
    // Llama a la función para leer el archivo Excel cuando el componente se monta
    this.readExcelFile();
  }

  readExcelFile = () => {
    // Ruta al archivo Excel
    const filePath = '../data/test.xls';

    // Realiza una solicitud HTTP utilizando Axios para obtener el archivo Excel
    axios.get(filePath, { responseType: 'arraybuffer' })
      .then(response => {
        // Lee el archivo Excel y convierte los datos en una matriz
        const workbook = XLSX.read(response.data, { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const excelData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        this.setState({ excelData });
      })
      .catch(error => {
        console.error('Error al leer el archivo Excel:', error);
      });
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>
              {this.state.excelData[0] &&
                this.state.excelData[0].map((cell, index) => (
                  <th key={index}>{cell}</th>
                ))}
            </tr>
          </thead>
          <tbody>
            {this.state.excelData.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, index) => (
                  <td key={index}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExcelReader;