import { useQuery } from "@tanstack/react-query";

function useUser() {
  return useQuery({
    queryKey: ["user"],
    keepPreviousData: true,
    queryFn: async () => {
      // Проверяем, запущено ли приложение в Telegram
      const isInTelegram = !!(window as any).Telegram?.WebApp?.initData;
      
      let initData = "";
      
      if (isInTelegram) {
        // Если в Telegram, используем реальные данные
        initData = (window as any).Telegram.WebApp.initData;
      } else {
        // Для тестирования в браузере используем тестовые данные
        console.warn("Приложение запущено в браузере. Используются тестовые данные.");
        // Создаем минимальные тестовые данные для разработки
        const testUser = {
          id: 123456789,
          first_name: "Test",
          last_name: "User",
          username: "testuser",
          language_code: "ru"
        };
        
        // Создаем простую заглушку initData для тестирования
        const testInitData = `user=${encodeURIComponent(JSON.stringify(testUser))}&auth_date=1234567890&hash=test_hash`;
        initData = testInitData;
      }

      const res = await fetch(`/api/get-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initData }),
      });
      const result = await res.json();

      if (!result.ok) {
        throw new Error(result.error);
      }

      return result.data;
    },
  });
}

export default useUser;
