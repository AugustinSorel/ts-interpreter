import Link from "next/link";
import { ComponentProps, HTMLProps } from "react";

export default function Home() {
  return (
    <main>
      <section className="relative flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center gap-10 px-5 py-20">
        <div className="hero-bg absolute inset-0 -top-[8rem] -z-10" />

        <div className="space-y-10 text-center">
          <Heading>
            the best programming
            <br />
            language on earth
          </Heading>

          <Paragraph>
            This project is a programming language made from scratch in
            <br />
            typescript. Giving you the power to do what you want with it.
          </Paragraph>

          <CallToAction href="/playground">playground</CallToAction>
        </div>

        <code className="whitespace-pre-line rounded-md border border-white/5 bg-white/5 p-5 backdrop-blur-md">
          {`fun fib(n) {
  if (n <= 1) {
    return n;
  }
  return fib(n - 2) + fib(n - 1);
}

for (var i = 0; i < 20; i = i + 1) {
  print fib(i);
}`}
        </code>

        <hr className="absolute bottom-0 left-0 z-10 h-24 w-full translate-y-1/2 rotate-1 scale-x-125 border-none bg-zinc-950" />
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-5 py-32 lg:flex-row">
        <div className="flex flex-col items-center gap-10 text-center lg:items-start lg:text-left">
          <Heading>Support class and OOP</Heading>

          <Paragraph>
            This programming language will let you store your <br />
            favorite objects and use your best oop design patterns.
          </Paragraph>

          <CallToAction href="/documentation">view docs</CallToAction>
        </div>

        <code className="whitespace-pre-line rounded-md border border-white/5 bg-white/5 p-5 backdrop-blur-md">
          {`fun fib(n) {
  if (n <= 1) {
    return n;
  }
  return fib(n - 2) + fib(n - 1);
}

for (var i = 0; i < 20; i = i + 1) {
  print fib(i);
}`}
        </code>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-5 py-32 lg:flex-row">
        <div className="flex flex-col items-center gap-10 text-center lg:items-start lg:text-left">
          <h2 className="text-3xl font-bold first-letter:capitalize lg:text-6xl">
            Support functions
          </h2>

          <p className="text-xl text-neutral-500">
            It even allows you to create some pretty complex functions
            <br />
            declarations if you prefer working with closures.
          </p>

          <CallToAction href="/documentation">view docs</CallToAction>
        </div>

        <code className="whitespace-pre-line rounded-md border border-white/5 bg-white/5 p-5 backdrop-blur-md">
          {`fun fib(n) {
  if (n <= 1) {
    return n;
  }
  return fib(n - 2) + fib(n - 1);
}

for (var i = 0; i < 20; i = i + 1) {
  print fib(i);
}`}
        </code>
      </section>

      <hr className="absolute left-0 h-20 w-full -translate-y-1/2 -rotate-1 scale-x-125 border-none bg-zinc-950" />

      <section className="relative flex flex-col items-center gap-16 px-5 py-32">
        <div className="features-bg absolute inset-0 -z-10" />

        <Heading>all features</Heading>

        <ul className="grid w-full max-w-7xl grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-10">
          <li className="relative w-full space-y-2 overflow-hidden rounded-md border border-pink-900 bg-white/5 p-7 [box-shadow:0_0_50px_10px_rgba(113,24,76,0.3)]">
            <div className="w-3/4">
              <h3 className="text-lg font-semibold capitalize text-pink-400">
                functions
              </h3>
              <p className="text-neutral-400">
                supports user defined funcitons and has built in functions
              </p>
            </div>
            <span className="absolute bottom-0 right-0 flex aspect-square h-20 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border border-pink-900 font-bold uppercase text-pink-900">
              fn
            </span>
          </li>
          <li className="relative w-full space-y-2 overflow-hidden rounded-md border border-pink-900 bg-white/5 p-7 [box-shadow:0_0_50px_10px_rgba(113,24,76,0.3)]">
            <div className="w-3/4">
              <h3 className="text-lg font-semibold capitalize text-pink-400">
                class and oop
              </h3>
              <p className="text-neutral-400">
                supports user defined class and any oop patterns such as
                inheritance
              </p>
            </div>
            <span className="absolute bottom-0 right-0 flex aspect-square h-20 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border border-pink-900 font-bold uppercase text-pink-900">
              oop
            </span>
          </li>
          <li className="relative w-full space-y-2 overflow-hidden rounded-md border border-pink-900 bg-white/5 p-7 [box-shadow:0_0_50px_10px_rgba(113,24,76,0.3)]">
            <div className="w-3/4">
              <h3 className="text-lg font-semibold capitalize text-pink-400">
                var
              </h3>
              <p className="text-neutral-400">
                assign your favorite data type to your definied variable
              </p>
            </div>
            <span className="absolute bottom-0 right-0 flex aspect-square h-20 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border border-pink-900 font-bold uppercase text-pink-900">
              var
            </span>
          </li>
          <li className="relative w-full space-y-2 overflow-hidden rounded-md border border-pink-900 bg-white/5 p-7 [box-shadow:0_0_50px_10px_rgba(113,24,76,0.3)]">
            <div className="w-3/4">
              <h3 className="text-lg font-semibold capitalize text-pink-400">
                math
              </h3>
              <p className="text-neutral-400">
                perfom any complex math operations such as % / * + - ^
              </p>
            </div>
            <span className="absolute bottom-0 right-0 flex aspect-square h-20 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border border-pink-900 font-bold uppercase text-pink-900">
              var
            </span>
          </li>
          <li className="relative w-full space-y-2 overflow-hidden rounded-md border border-pink-900 bg-white/5 p-7 [box-shadow:0_0_50px_10px_rgba(113,24,76,0.3)]">
            <div className="w-3/4">
              <h3 className="text-lg font-semibold capitalize text-pink-400">
                loops
              </h3>
              <p className="text-neutral-400">
                supports any loops such as for and while loops
              </p>
            </div>
            <span className="absolute bottom-0 right-0 flex aspect-square h-20 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border border-pink-900 font-bold uppercase text-pink-900">
              for
            </span>
          </li>
          <li className="relative w-full space-y-2 overflow-hidden rounded-md border border-pink-900 bg-white/5 p-7 [box-shadow:0_0_50px_10px_rgba(113,24,76,0.3)]">
            <div className="w-3/4">
              <h3 className="text-lg font-semibold capitalize text-pink-400">
                if statment
              </h3>
              <p className="text-neutral-400">
                supports boolean alegbra, so you can create customs conditions
              </p>
            </div>
            <span className="absolute bottom-0 right-0 flex aspect-square h-20 translate-x-1/4 translate-y-1/4 items-center justify-center rounded-full border border-pink-900 font-bold uppercase text-pink-900">
              if
            </span>
          </li>
        </ul>

        <CallToAction href="/playground">playground</CallToAction>
      </section>
    </main>
  );
}

const CallToAction = (props: ComponentProps<typeof Link>) => {
  return (
    <Link
      {...props}
      className="inline-block rounded-md bg-gradient-to-r from-pink-600 to-pink-500 px-10 py-3 font-semibold capitalize text-white opacity-90 transition-opacity hover:opacity-100 lg:text-xl"
    />
  );
};

const Heading = (props: HTMLProps<HTMLHeadingElement>) => {
  return (
    <h2
      {...props}
      className="text-3xl font-bold first-letter:capitalize lg:text-6xl"
    />
  );
};

const Paragraph = (props: HTMLProps<HTMLParagraphElement>) => {
  return <p {...props} className="text-xl text-neutral-500" />;
};
