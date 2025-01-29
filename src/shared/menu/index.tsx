import { useState } from "react";

type MenuValue = string | number;

export type MenuItem = {
  value: MenuValue;
  title: MenuValue;
};

interface MenuProps {
  defaultValue: MenuValue;
  options: MenuItem[];
  onChange: (item: MenuItem) => void;
  titlePrefix?: string | React.ReactNode;
}

const findItem = (items: MenuItem[], value: MenuValue) =>
  items.find(({ value: v }) => value === v);

export const Menu = (props: MenuProps) => {
  const { options, defaultValue, onChange, titlePrefix } = props;
  const [open, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(() =>
    findItem(options, defaultValue)
  );

  const toggleMenu = (e: React.MouseEvent<HTMLDetailsElement>) => {
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <details onClick={toggleMenu} className="menu" open={open}>
      <summary className="menu__title">
        {titlePrefix}
        <span className="menu__title-text">{selectedItem?.title}</span>
      </summary>
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
