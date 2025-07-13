function useWebApp() {
  // Проверяем, доступен ли Telegram WebApp API
  if ((window as any).Telegram?.WebApp) {
    return (window as any).Telegram.WebApp;
  }
  
  // Заглушка для тестирования в браузере
  console.warn("Telegram WebApp API недоступен. Используется заглушка для разработки.");
  
  return {
    ready: () => console.log("WebApp ready (заглушка)"),
    expand: () => console.log("WebApp expand (заглушка)"),
    close: () => console.log("WebApp close (заглушка)"),
    initData: "",
    initDataUnsafe: {},
    version: "6.0",
    platform: "unknown",
    colorScheme: "light",
    themeParams: {
      bg_color: "#ffffff",
      text_color: "#000000",
      hint_color: "#999999",
      link_color: "#2481cc",
      button_color: "#2481cc",
      button_text_color: "#ffffff"
    },
    isExpanded: true,
    viewportHeight: window.innerHeight,
    viewportStableHeight: window.innerHeight,
    headerColor: "#ffffff",
    backgroundColor: "#ffffff"
  };
}

export default useWebApp;
