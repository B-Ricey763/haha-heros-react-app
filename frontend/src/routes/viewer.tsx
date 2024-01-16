import App from "../components/App";

/**
 * Route for viewing but not editing data
 *
 * @returns Viewer route
 */
export default function Viewer() {
  return <App canEdit={false} />;
}
