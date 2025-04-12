// ThemeContext.tsx
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode
  } from 'react';
  import { THEMES, ThemeName } from './Theme';
  
  interface ThemeContextType {
    currentTheme: ThemeName;
    applyTheme: (themeName: ThemeName) => void;
    themes: typeof THEMES;
  }
  
  const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
  
  interface ThemeProviderProps {
    children: ReactNode;
  }
  
  export function ThemeProvider({ children }: ThemeProviderProps) {
    const [currentTheme, setCurrentTheme] = useState<ThemeName>('default');
    
    useEffect(() => {
      const savedTheme = localStorage.getItem('theme') as ThemeName | null;
      const validTheme = savedTheme && THEMES[savedTheme] ? savedTheme : 'default';
      
      setCurrentTheme(validTheme);
      applyTheme(validTheme);
    }, []);
  
    const applyTheme = (themeName: ThemeName) => {
      const theme = THEMES[themeName];
      Object.entries(theme).forEach(([varName, value]) => {
        document.documentElement.style.setProperty(varName, value);
      });
      setCurrentTheme(themeName);
      localStorage.setItem('theme', themeName);
    };
  
    return (
      <ThemeContext.Provider value={{ currentTheme, applyTheme, themes: THEMES }}>
        {children}
      </ThemeContext.Provider>
    );
  }
  
  export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
      throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
  };