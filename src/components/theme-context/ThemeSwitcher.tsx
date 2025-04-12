// ThemeSwitcher.tsx
import { THEMES, ThemeName } from './Theme';
import { useTheme } from './ThemeContext';

export default function ThemeSwitcher() {
  const { currentTheme, applyTheme, themes } = useTheme();

  return (
    <div className="theme-switcher">
      {(Object.keys(themes) as ThemeName[]).map(themeName => (
        <button
          key={themeName}
          onClick={() => applyTheme(themeName)}
          aria-label={`Apply ${themeName} theme`}
          data-active={currentTheme === themeName}
          style={{ 
            margin: '4px',
            padding: '8px',
            backgroundColor: THEMES[themeName]['--Blue-800'],
            color: THEMES[themeName]['--Blue-800']
          }}
        >
          {themeName}
        </button>
      ))}
    </div>
  );
}