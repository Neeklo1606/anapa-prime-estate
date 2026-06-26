import { useEffect } from "react";
import { applyTheme, useTheme } from "@/store/useTheme";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme(s => s.theme);
  useEffect(() => { applyTheme(theme); }, [theme]);
  return <>{children}</>;
}
