# UniAlbums

### Краткое описание
<p>Этот проект создан для коллекционирования прослушанных альбомов. 
Пользователь имеет возможность создать свой аккаунт, куда он может добавлять 
музыкальные альбомы, оценивать их, комментировать, добавлять 
понравившиеся треки и делиться своим профилем с другими коллекционерами.</p>

----

### Ссылки

* [Backend](https://github.com/def1s/unialbums-backend)
* [Deploy](http://89.111.172.174/home)

----

### Реализованный и задуманный функционал

- [x] Создание аккаунта
- [ ] Редактирование профиля
  - [x] Личные данные
  - [x] Аватар
  - [x] Имя пользователя
  - [ ] Пароль
- [x] Добавление альбомов
  - [x] Обложка
  - [x] Исполнитель
  - [x] Название
- [x] Оценка альбомов
- [x] Изменение информации об альбоме
  - [x] Основная информация
  - [x] Оценки
- [ ] Возможность делиться своим профилем
- [ ] Возможность создавать плейлисты
- [ ] Подробный просмотр информации об альбоме
  - [ ] Комментирование

----

### Используемые технологии
_**Основное**: React, TypeScript, Webpack_  
_**Хранение данных**: Redux Toolkit_  
_**Архитектура**: FSD (Feature-Sliced Design)_  
_**Сборка**: Webpack_  
_**Тестирование**: Jest, RTL (React Testing Library), Storybook_  
_**Линтинг**: ESLint, Stylelint_  

----

### Архитектура проекта
<p>Проект использует архитектуру Feature-Sliced Design</p>

Ссылка на документацию - [FSD](https://feature-sliced.design/docs/get-started/tutorial)

----

### Тестирование
<p>На данный момент в проекте реализовано 2 вида тестов:</p>

1) Обычные unit тесты на jest - `npm run test:unit`
2) Тесты на компоненты с React testing library -`npm run test:unit`
3) ~~Скриншотное~~ (скоро)
4) ~~e2e~~ (скоро)

----

### Линтинг

В проекте используется eslint для проверки typescript кода и stylelint для проверки файлов со стилями.

##### Запуск линтеров
- `npm run linter:ts` - Проверка ts файлов линтером
- `npm run linter:ts:fix` - Исправление ts файлов линтером
- `npm run linter:scss` - Проверка scss файлов style линтером
- `npm run linter:scss:fix` - Исправление scss файлов style линтером

----

### Storybook

В проекте для каждого компонента описываются стори-кейсы.
Запросы на сервер мокаются с помощью msw-storybook-addon.

Файл со сторикейсами создается рядом с компонентом с расширением .stories.tsx

Запустить сторибук можно командой:
- `npm run storybook`

----

### Конфигурация проекта

Для разработки проект содержит webpack конфиг:   
* Webpack - ./config/build


Вся конфигурация хранится в /config
- /config/build - конфигурация webpack
- /config/jest - конфигурация тестовой среды
- /config/storybook - конфигурация сторибука
