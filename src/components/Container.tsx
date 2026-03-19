type ContainerProps = {
  children: React.ReactNode;
};

function Container({ children }: ContainerProps) {
  return (
    <div className="bg-brand-white mx-auto p-10 h-max flex w-4xl flex-col gap-8 justify-start border  border-brand-gray-light">
      {children}
    </div>
  );
}

export default Container;
