"use client";

import { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import TitleVisibility from "@/components/TitleVisibility";

const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#000000',
    },
    text: {
      primary: '#ffffff',
      secondary: '#cccccc',
    },
  },
  typography: {
    fontFamily: 'var(--font-poppins), sans-serif',
    h1: { fontFamily: 'var(--font-poppins), sans-serif' },
    h2: { fontFamily: 'var(--font-poppins), sans-serif' },
    h3: { fontFamily: 'var(--font-poppins), sans-serif' },
    h4: { fontFamily: 'var(--font-poppins), sans-serif' },
    h5: { fontFamily: 'var(--font-poppins), sans-serif' },
    h6: { fontFamily: 'var(--font-poppins), sans-serif' },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <NextThemesProvider attribute="class" defaultTheme="dark" forcedTheme="dark" enableSystem={false}>
        <TitleVisibility />
        {children}
      </NextThemesProvider>
    </MuiThemeProvider>
  );
}
