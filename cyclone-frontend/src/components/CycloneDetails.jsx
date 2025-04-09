const CycloneDetails = ({ cyclone }) => (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-semibold">{cyclone["Event Name"]}</h3>
      <p><strong>Location:</strong> {cyclone.Location}</p>
      <p><strong>Year:</strong> {cyclone["Start Year"]}</p>
      <p><strong>Magnitude:</strong> {cyclone.Magnitude} {cyclone["Magnitude Scale"]}</p>
      <p><strong>Affected:</strong> {cyclone["No. Affected"]}</p>
    </div>
  );
  
  export default CycloneDetails;
  