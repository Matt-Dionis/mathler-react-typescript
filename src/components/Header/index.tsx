import type { StatusProp } from "../../App";

type HeaderProps = {
  status: StatusProp,
  total: number,
};

export default function Header({ status, total }: HeaderProps) {
  return (
    <div className="header">
      <h1 className="title">Mathler</h1>
      <h3 className="description">
        Find the hidden calculation that equals {total}
      </h3>
    </div>
  );
}
