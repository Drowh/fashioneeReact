# Fashionee - Интернет-магазин одежды и аксессуаров

## 💫 Live Demo

https://drowh.github.io/fashioneeReact/

## 📝 Описание проекта

Fashionee - современный интернет-магазин одежды и аксессуаров, разработанный на React. Приложение предоставляет пользователям удобный интерфейс для выбора и покупки модной одежды и аксессуаров.

## Содержание

- [Описание проекта](#описание-проекта)
- [Технологии](#технологии)
- [Установка и запуск](#установка-и-запуск)
- [Структура проекта](#структура-проекта)
- [Возможности](#возможности)
- [Примеры использования](#примеры-использования)
- [FAQ](#faq)
- [Лицензия](#лицензия)
- [Автор](#автор)

Fashionee - одностраничное приложение (SPA) для интернет-магазина одежды и аксессуаров. Сайт разработан с фокусом на удобство пользователя и современный дизайн. Приложение адаптировано для различных устройств, включая мобильные.

Основные преимущества:

- Современный и адаптивный дизайн
- Удобные фильтры и поиск товаров
- Система избранного для сохранения понравившихся товаров
- Функциональная корзина с возможностью редактирования количества товаров
- Локальное хранение данных корзины и избранного

## 🛠️ Технологии

### Фронтенд

- **React** (v18.2.0) - библиотека для создания пользовательского интерфейса
- **Vite** (v4.4.5) - инструмент сборки проекта
- **Context API** - для управления глобальным состоянием приложения
- **LocalStorage** - для сохранения данных между сессиями
- **CSS** - для стилизации компонентов

### Инструменты разработки

- **ESLint** - линтер для поддержания качества кода
- **Prettier** - форматирование кода
- **Vitest** - инструмент для тестирования
- **JSX-A11y** - плагин для обеспечения доступности

## 🚀 Установка и запуск

### Предварительные требования

- Node.js (рекомендуется версия 14.x или выше)
- npm или yarn

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/yourusername/fashionee-react.git
cd fashionee-react

# Установка зависимостей
npm install
# или
yarn install
```

### Запуск для разработки

```bash
npm run dev
# или
yarn dev
```

Приложение будет доступно по адресу: `http://localhost:5175/`

### Сборка для продакшена

```bash
npm run build
# или
yarn build
```

### Предварительный просмотр продакшен-сборки

```bash
npm run preview
# или
yarn preview
```

### Запуск тестов

```bash
npm run test
# или
yarn test
```

## 📂 Структура проекта

```
fashionee-react/
│
├── public/            # Статические ресурсы
│   ├── icons/         # Иконки приложения
│   └── images/        # Изображения
│
├── src/               # Исходный код
│   ├── components/    # React компоненты
│   │   ├── ActivePageTop/  # Верхняя часть активной страницы
│   │   ├── Cart/      # Компоненты корзины
│   │   ├── Footer/    # Компоненты футера
│   │   ├── Header/    # Компоненты шапки
│   │   └── Shop/      # Компоненты магазина
│   │       └── components/  # Подкомпоненты магазина
│   │
│   ├── contexts/      # React контексты
│   │   ├── CartContext.jsx     # Контекст корзины
│   │   └── FavoritesContext.jsx # Контекст избранного
│   │
│   ├── styles/        # Глобальные стили
│   │   ├── commons.css # Общие стили
│   │   └── reset.css   # Сброс стилей
│   │
│   ├── App.css        # Стили главного компонента
│   ├── App.jsx        # Главный компонент приложения
│   ├── main.jsx       # Точка входа React
│   ├── index.css      # Глобальные стили
│   └── products.json  # Данные о продуктах
│
├── .eslintrc.json    # Конфигурация ESLint
├── eslint.config.js  # Дополнительная конфигурация ESLint
├── index.html        # Основной HTML файл
├── package.json      # Зависимости и скрипты NPM
└── vite.config.js    # Конфигурация Vite
```

## ✨ Возможности

### Магазин

- **Просмотр каталога**: Удобная галерея товаров с изображениями и информацией
- **Поиск**: Быстрый поиск товаров по названию
- **Фильтрация**: Фильтрация товаров по категории, цене и цвету
- **Избранное**: Добавление товаров в список избранного
- **Корзина**: Добавление товаров в корзину прямо из каталога

### Корзина

- **Управление количеством**: Изменение количества товаров в корзине
- **Удаление товаров**: Удаление товаров из корзины
- **Расчёт стоимости**: Автоматический расчёт общей стоимости заказа
- **Сохранение данных**: Сохранение содержимого корзины между сессиями

## 📋 Примеры использования

### Добавление товара в избранное

```jsx
// Использование контекста для работы с избранным
import { useContext } from "react";
import { FavoritesContext } from "../contexts/FavoritesContext";

function ProductCard({ product }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const isFavorite = favorites.includes(product.id);

  return (
    <div className="product-card">
      <h3>{product.name}</h3>
      <button onClick={() => toggleFavorite(product.id)}>
        {isFavorite ? "Убрать из избранного" : "Добавить в избранное"}
      </button>
    </div>
  );
}
```

### Работа с корзиной

```jsx
// Использование контекста корзины
import { useContext } from "react";
import { CartContext } from "../contexts/CartContext";

function ProductActions({ product }) {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="product-actions">
      <button onClick={() => addToCart(product)}>Добавить в корзину</button>
    </div>
  );
}
```

## ❓ FAQ

### Как добавить новые товары в каталог?

Данные о товарах хранятся в файле `src/products.json`. Для добавления новых товаров необходимо добавить соответствующие объекты в массив `products`.

### Как изменить категории товаров?

Категории определяются в свойстве `categories` каждого товара. После изменения категорий товаров необходимо обновить компонент фильтрации в `Sidebar.jsx`.

### Как добавить новые фильтры?

Для добавления новых фильтров необходимо:

1. Расширить объект `INITIAL_FILTERS` в компоненте `Shop`
2. Добавить UI для нового фильтра в компонент `Sidebar`
3. Обновить логику фильтрации в компоненте `Products`

## 📄 Лицензия

Этот проект лицензирован в соответствии с [MIT License](./LICENSE). 🎉

## 👨‍💻 Автор

**DrowDev** - _Разработчик проекта_

- GitHub: [github.com/drowdev](https://github.com/drowdev)

---

Если у вас есть вопросы или предложения по улучшению проекта, пожалуйста, создайте [issue](https://github.com/yourusername/fashionee-react/issues) в репозитории.
