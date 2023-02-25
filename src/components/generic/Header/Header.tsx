import React from "react";
import ImgUser from "./ImgUser/ImgUser";
import Logo from "./Logo/Logo";
import Link from "next/link";
import { categories } from "@/assets/categories";

function Header({ noSticky }: { noSticky?: boolean }) {
  return (
    <header className={`${noSticky ? "relative" : "sticky top-0"} flex justify-between items-center py-4 bg-white z-[1000]`}>
      <Logo/>

      <nav className="flex gap-4 items-center">
        <ul className="flex items-center gap-4">
          {categories.map((el: string) => (
            <Link href={el.toLocaleLowerCase()} key={el}>
              <li>{el}</li>
            </Link>
          ))}
        </ul>

        <ImgUser/>
      </nav>
    </header>
  );
}

export default Header;
