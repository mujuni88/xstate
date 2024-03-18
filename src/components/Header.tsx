export const Header: React.FC<{ title: string; className?: string }> = ({ title, className }) => {
  return (
    <header className={className}>
      <h1 className="text-xl text-white">{title}</h1>
    </header>
  );
};
