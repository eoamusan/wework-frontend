import { FC } from "react";

interface HeaderProps {
  title: string;
  description: string;
}

const Header: FC<HeaderProps> = ({ title, description }) => {
  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-[-0.06em] text-dark-soft sm:text-4xl">
        {title}
      </h1>

      <p className="mt-3 text-base leading-7 text-secondary/80">
        {description}
      </p>
    </div>
  );
};

export default Header;
