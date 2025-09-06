import Header from "components/header";
import { JSX } from "react";

interface PropsInterface {
  children: React.ReactNode;
}

const Layout = (props: PropsInterface): JSX.Element => {
  return (
    <>
      <Header />
      <main className="layout-grid">{props.children}</main>
    </>
  );
};

export default Layout;
