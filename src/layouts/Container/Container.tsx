import s from "./Container.module.css";

interface ContainerProps {
  children: React.ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return <div className={s.container}>{children}</div>;
};
