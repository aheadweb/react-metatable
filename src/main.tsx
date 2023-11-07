import React from "react";
import ReactDOM from "react-dom/client";
import { BaseCellExample } from "./demo";

const rootApp = document.getElementById("root") as HTMLElement;

ReactDOM.createRoot(rootApp).render(
  <React.StrictMode>
    <h1>Overview</h1>
    <p>
      React MetaTable - это мощный инструмент для настройки и управления
      отображением данных в таблицах. Основная особенность библиотеки - гибкая и
      быстрая настройка ячеек таблицы, а также тонкая настройка ее функций.
      Благодаря модульной структуре, пользователь может легко внедрять свои
      компоненты ячеек и функционала в таблицу. Простота использования и
      реализации обеспечивает высокую производительность при работе с таблицами.
      Концепция мета-программирования позволяет молниеносно видоизменять UX\UI
      пользователя с таблицей.
    </p>
    <h2>Concepts</h2>
    <p>В таблице заложены 2 концепции. metamodel и metadata</p>
    <h3>MetaData</h3>
    <p>
      Метадата это javascript объект, который организовывает структуру таблицы
    </p>
    <pre>
      <code>code snippet</code>
    </pre>
    <h3>MetaModel</h3>
    <p>МетаМодель представляет собой функцию обработчик метаданных</p>
    <h1>Quick Start</h1>
    <h2>Table with basic cells and features</h2>
    <BaseCellExample />
  </React.StrictMode>
);
