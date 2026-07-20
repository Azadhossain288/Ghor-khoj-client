import PropertiesContext from "./PropertiesContent";
import { Suspense } from "react";


export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20">Loading...</div>}>
        
        <PropertiesContext />

    </Suspense>
  );
}