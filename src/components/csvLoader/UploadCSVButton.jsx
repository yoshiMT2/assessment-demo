import Papa from 'papaparse';
import Button from '../button';/

const UploadCSVButton = () => {
  const handleUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      complete: function(results) {
        console.log('Finished:', results.data);
      },
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true
    });
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleUpload} />
    </div>
  );
};

export default UploadCSVButton;
