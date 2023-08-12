import { useState } from "react";

type MenuValue = string | number;
export type MenuItem = {
  value: MenuValue;
  title: MenuValue;
};

interface MenuProps {
  defaultValue: MenuValue;
  onChange: (item: MenuItem) => void;
  options: MenuItem[];
}

const findItem = (items: MenuItem[], value: MenuValue) =>
  items.find(({ value: v }) => value === v);

export const Menu = (props: MenuProps) => {
  const { options, defaultValue, onChange } = props;
  const [selectedItem, setSelectedItem] = useState(() =>
    findItem(options, defaultValue)
  );

  return (
    <details className="menu">
      <summary className="menu__title">{selectedItem?.title}</summary>
      <ul className="menu__items">
        {options.map(({ title, value }, index) => (
          <li
            key={value}
            className="menu__item"
            onClick={() => {
              setSelectedItem(options[index]);
              onChange(options[index]);
            }}
          >
            {title}
          </li>
        ))}
      </ul>
    </details>
  );
};
