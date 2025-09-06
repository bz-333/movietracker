import Image from "next/image";
import Link from "next/link";
import logo from "public/assets/logo.svg";
import styles from "./index.module.css";
import { JSX } from "react";

const Logo = (): JSX.Element => {
  return (
    <Link href="/" passHref className={styles.root}>
      <Image src={logo} alt="Logo: Movie Tracker" sizes="100vw" fill priority />
    </Link>
  );
};

export default Logo;
