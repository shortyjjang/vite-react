import { useEffect } from "react";
import { useLayout } from "../../provider/LayoutProvider";

export default function Home() {
  const { setShowHomebar } = useLayout();
  useEffect(() => {
    setShowHomebar(true);
  }, [setShowHomebar]);
  return (
    <div>Home</div>
  )
}
