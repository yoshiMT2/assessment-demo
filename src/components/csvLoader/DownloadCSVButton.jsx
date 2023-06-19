import Papa from 'papaparse';
import Button from '../button';

const DownloadCSVButton = ({title}) => {
  const className = `flex justify-center px-6 py-3 bg-primary-3 text-white rounded-full disabled:bg-gray-200 hover:bg-primary-1 transition-colors ${props.className || ''}`
  const data = [
    ['firstName', 'lastName'],
    ['John', 'Doe'],
    ['Jane', 'Doe']
  ];

  const handleDownload = () => {
    const csv = Papa.unparse(data);
    console.log(csv)
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
