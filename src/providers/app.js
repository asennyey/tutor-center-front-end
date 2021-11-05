import { createTheme, CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useMemo } from "react";
import AuthProvider from "./auth";
import DataProvider from "./data";
import Router from "./route";
import UserProvider from "./user";

export default function AppProviders({children}){
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const theme = useMemo(
      () =>
        createTheme({
          palette: {
            mode: prefersDarkMode ? 'dark' : 'light',
          },
        }),
      [prefersDarkMode],
    );
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
                <DataProvider>
                    <UserProvider>
                        <Router>
                            {children}
                        </Router>
                    </UserProvider>
                </DataProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}