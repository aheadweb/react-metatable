import { carsData, carsTableMetaData, carsDataLocale } from "../../__mock__";
import { useGetTableColumns } from "../../metamodel";
import { BaseMetaTable } from "../../table";

// Минимальный функционал для релиза
/**
 * 1. Дизайн
 *  - Резина
 * 2. Фичи пагинации
 *  - багфикс
 * 3. Фильтрация
 *  - Референс фильтр
 * 4. Базовые ячейки
 *  - Аватар (Профайл)
 *  - Рейтинг
 *  - Время
 *  - Валюта
 * 5. Продвинутые ячейки
 *  - Референс поле
 * 6. Фичи таблицы
 *  - Колапс ячейки
 *  - Фикс колонки старт\конец
 *  - группировка строк
 *  - вкл\выкл колонку
 */

/**
 * Документация
 * 1. Быстрый старт
 * 2. Концепция
 * 3. Обзор ячеек
 * 4. Обзор продвинутых ячеек
 * 5. Фичи
 *  - Сортировка
 *  - Фильтрации
 * 6.
 */

export const BaseCellExample = () => {
  const { columns } = useGetTableColumns<(typeof carsData)[0]>({
    metaData: carsTableMetaData,
    locale: carsDataLocale.ru,
  });

  return (
    <>
      <BaseMetaTable pagination columns={columns} data={carsData} />
    </>
  );
};
