import Header from "@/components/Header"; // Bug B5: Header reimportado — aparece duplo em /carteira

export default function ProtegidoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem" }}>
      {children}
    </div>
  );
}
