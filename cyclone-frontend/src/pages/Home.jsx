import MapView from '../components/MapView';

const Home = () => (
  <div>
    <h1 className="text-2xl font-bold my-4">Cyclone Map - India</h1>
    <MapView />
  </div>
);

export default Home;
// This code defines a React component that displays a map of cyclones in India using the MapView component.
// The component is styled with Tailwind CSS classes for a consistent look and feel.
// The MapView component is responsible for rendering the map and fetching cyclone data from the API.