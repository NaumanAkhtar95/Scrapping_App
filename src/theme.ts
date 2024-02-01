import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { PaletteMode } from "@mui/material";

// Color tokens for the theme
export const tokens: any = (mode: string) => ({
  primary: mode === "dark" ? "#1F2A40" : "#1565C0", // Dark blue in dark mode, Light blue in light mode
  secondary: "#4CAF50", // Green color
  success: "#4CAF50", // Green color
  warning: "#e8a805",
  neutral: {
    dark: mode === "dark" ? "#c2c2c2" : "#525252",
    main: mode === "dark" ? "#e0e0e0" : "#ffffff",
    light: mode === "dark" ? "#ffffff" : "#e0e0e0",
  },
  background: mode === "dark" ? "#1F2A40" : "#ffffff",
});

// MUI theme settings
export const themeSettings: any = (mode: PaletteMode) => {
  const colors = tokens(mode);

  return createTheme({
    components: {
      MuiIcon: {
        defaultProps: {
          baseClassName: 'material-icons-two-tone',
        },
      },
    },
    palette: {
      mode: mode,
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
      success: {
        main: colors.success,
      },
      warning: {
        main: colors.warning,
      },
      background: {
        default: colors.background,
      },
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
      },
    },
  });
};

export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode as PaletteMode)), [mode]);

  return [theme, colorMode];
};
