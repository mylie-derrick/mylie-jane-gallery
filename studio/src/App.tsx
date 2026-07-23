import { Studio } from "sanity";
import config from "../sanity.config";

export default function App() {
  return <Studio config={config} />;
}
