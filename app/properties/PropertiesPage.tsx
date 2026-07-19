import PropertiesContext from "./PropertiesContent";



export default function PropertiesPage() {
  return (
    <Suspense fallback={<div className="flex justify-center py-20">Loading...</div>}>
        
        <PropertiesContext />

    </Suspense>
  );
}