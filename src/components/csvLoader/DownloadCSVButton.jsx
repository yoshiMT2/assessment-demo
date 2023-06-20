/* eslint-disable react/prop-types */
import Papa from 'papaparse';
// import Encoding from 'encoding-japanese';

const DownloadCSVButton = ({title}) => {
  const data = [
    ['firstName', 'lastName'],
    ['John', 'Doe'],
    ['Jane', 'Doe']
  ];

  const handleDownload = () => {
    const csv = Papa.unparse(data);
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });

    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'template.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      onClick={handleDownload}
    >
      {title}
    </button>
  );
};

export default DownloadCSVButton;
