import { useState, useEffect } from "react";

interface Props {
  name: string;
  visits: number;
}

export default function Greeting({ name, visits }: Props) {
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const date = new Date();
    const hours = date.getHours();
    const welcome = () => {
      if (hours < 12) {
        return `Good morning, ${name}.`;
      } else if (hours < 18) {
        return `Good afternoon, ${name}.`;
      } else {
        return `Good evening, ${name}.`;
      }
    };
    const greetings = [
      "Great to see you again!",
      "Glad you're here!",
      "Welcome back!",
      "Nice to see you again!",
    ];
    const randomGreeting =
      greetings[Math.floor(Math.random() * greetings.length)];
    const greeting = visits > 1 ? randomGreeting : "Welcome to Holidation!";
    setGreeting(`${welcome()} ${greeting}`);
  }, [name, visits]);

  return (
    <h1 className="font-serif font-bold text-5xl capitalize bg-gradient-to-r from-orange-600 via-yellow-500 to-red-500 text-transparent bg-clip-text">
      {greeting}
    </h1>
  );
}
