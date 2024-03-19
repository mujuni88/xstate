type HeaderProps = {
  title: string;
  className?: string;
};
export const Header: React.FC<HeaderProps> = ({ title, className }) => {
  return (
    <header className={className}>
      <h1 className="text-xl text-white">{title}</h1>
    </header>
  );
};
