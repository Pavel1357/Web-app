import React from "react"

type ThemeContextType = {
  theme: "dark" | "light"
  toggleTheme: () => void // функция, которая переключает тему
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: "dark", // тема по умолчанию
  toggleTheme: () => null,
})

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const storedTheme = localStorage.getItem('theme');
  const currentTheme = storedTheme ? storedTheme as 'dark' | 'light' : 'dark'; // Если тема уже сохранена, используем ее (storedTheme)

  const [theme, setTheme] = React.useState<"dark" | "light">(currentTheme)

  console.log('theme', theme, currentTheme) // Выводит в консоль текущее и сохраненное в localStorage значение темы

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === "light" ? "dark" : "light";
      localStorage.setItem('theme', newTheme);

      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <main className={`${theme} text-foreground bg-background`}>
        {children}
      </main>
    </ThemeContext.Provider>
  )
}

// ThemeProvider читает сохраненную тему из localStorage и устанавливает её в theme.
// Все компоненты, обернутые в ThemeProvider, могут получить текущую тему через ThemeContext.
// Функция toggleTheme позволяет переключать тему и сохранять её в localStorage