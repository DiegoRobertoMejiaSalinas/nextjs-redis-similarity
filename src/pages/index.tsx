import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import { useRef } from "react";
import Paragraph from "@/ui/components/Paragraph";

export default function Home() {
  return (
    <>
      <main className="bg-red-500">
        <Paragraph size={"default"}>Some text</Paragraph>
      </main>
    </>
  );
}
