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

        <CodeBlock title="fibonacci">
          <span className="text-blue-500">fun </span>
          <span className="text-yellow-200">fib</span>
          <span className="text-yellow-500">(</span>
          <span className="text-yellow-200">n</span>
          <span className="text-yellow-500">) </span>
          <span className="text-yellow-500">{"{"}</span>
          <br />
          <span className="text-blue-500">&nbsp;&nbsp;if </span>
          <span className="text-pink-500">(</span>
          <span className="text-yellow-200">n</span>
          <span> {"<="} </span>
          <span className="text-yellow-200">1</span>
          <span className="text-pink-500">) </span>
          <span className="text-pink-500">{"{"}</span>
          <br />
          <span className="text-blue-500">&nbsp;&nbsp;&nbsp;&nbsp;return </span>
          <span className="text-yellow-200">n</span>
          <span>;</span>
          <br />
          <span className="text-pink-500">&nbsp;&nbsp;{"}"}</span>
          <br />
          <span className="text-blue-500">&nbsp;&nbsp;return </span>
          <span className="text-yellow-200">fib</span>
          <span className="text-pink-500">(</span>
          <span className="text-yellow-200">n</span>
          <span> - </span>
          <span className="text-yellow-200">2</span>
          <span className="text-pink-500">)</span>
          <span> + </span>
          <span className="text-yellow-200">fib</span>
          <span className="text-pink-500">(</span>
          <span className="text-yellow-200">n</span>
          <span> - </span>
          <span className="text-yellow-200">1</span>
          <span className="text-pink-500">)</span>
          <span>;</span>
          <br />
          <span className="text-yellow-500">{"}"}</span>
          <br />
          <br />
          <span className="text-blue-500">for </span>
          <span className="text-yellow-500">(</span>
          <span className="text-blue-500">var </span>
          <span className="text-yellow-200">i</span>
          <span> = </span>
          <span className="text-yellow-200">0</span>
          <span>; </span>
          <span className="text-yellow-200">i</span>
          <span> {"<"} </span>
          <span className="text-yellow-200">20</span>
          <span>; </span>
          <span className="text-yellow-200">i</span>
          <span> = </span>
          <span className="text-yellow-200">i</span>
          <span> + </span>
          <span className="text-yellow-200">1</span>
          <span className="text-yellow-500">) </span>
          <span className="text-yellow-500">{"{"}</span>
          <br />
          <span className="text-blue-500">&nbsp;&nbsp;print </span>
          <span className="text-yellow-200">fib</span>
          <span className="text-pink-500">(</span>
          <span className="text-yellow-200">i</span>
          <span className="text-pink-500">)</span>
          <span>;</span>
          <br />
          <span className="text-yellow-500">{"}"}</span>
        </CodeBlock>

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

        <CodeBlock title="inheritance">
          <span className="text-blue-500">class </span>
          <span className="text-yellow-200">Doughnut </span>
          <span className="text-yellow-500">{`{`}</span>
          <br />
          <span className="text-yellow-200">&nbsp;&nbsp;cook</span>
          <span className="text-pink-500">(</span>
          <span className="text-pink-500">) </span>
          <span className="text-pink-500">{"{"}</span>
          <br />
          <span className="text-blue-500">&nbsp;&nbsp;&nbsp;&nbsp;print </span>
          <span className="text-emerald-500">
            &quot;Fry until golden brown.&quot;
          </span>
          <span>;</span>
          <br />
          <span className="text-pink-500">&nbsp;&nbsp;{"}"}</span>
          <br />
          <span className="text-yellow-500">{"}"}</span>
          <br />
          <br />
          <span className="text-blue-500">class </span>
          <span className="text-yellow-200">BostonCream</span> <span>&lt;</span>{" "}
          <span className="text-yellow-200">Doughnut</span>
          <span className="text-yellow-500">{"{"}</span>
          <span className="text-yellow-500">{"}"}</span>
          <br />
          <br />
          <span className="text-yellow-200">BostonCream</span>
          <span className="text-yellow-500">(</span>
          <span className="text-yellow-500">)</span>
          <span>.</span>
          <span className="text-yellow-200">cook</span>
          <span className="text-yellow-500">(</span>
          <span className="text-yellow-500">)</span>
          <span>;</span>
        </CodeBlock>
      </section>

      <section className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-5 py-32 lg:flex-row">
        <div className="flex flex-col items-center gap-10 text-center lg:items-start lg:text-left">
          <Heading>Support functions</Heading>

          <Paragraph>
            It even allows you to create some pretty complex functions
            <br />
            declarations if you prefer working with closures.
          </Paragraph>

          <CallToAction href="/documentation">view docs</CallToAction>
        </div>

        <CodeBlock title="closures">
          <span className="text-blue-500">fun </span>
          <span className="text-yellow-200">makeFunction</span>
          <span className="text-yellow-500">{"() {"}</span>
          <br />
          <span className="text-blue-500">&nbsp;&nbsp;var </span>
          <span className="text-yellow-200">name</span>
          <span> = </span>
          <span className="text-emerald-500">&quot;John&quot;</span>
          <span>;</span>
          <br />
          <span className="text-blue-500">&nbsp;&nbsp;fun </span>
          <span className="text-yellow-200">displayName</span>
          <span className="text-pink-500">{"() {"}</span>
          <br />
          <span className="text-blue-500">&nbsp;&nbsp;&nbsp;&nbsp;print </span>
          <span className="text-yellow-200">name</span>
          <span>;</span>
          <br />
          <span className="text-pink-500">&nbsp;&nbsp;{"}"}</span>
          <br />
          <span className="text-blue-500">&nbsp;&nbsp;return </span>
          <span className="text-yellow-200">displayName</span>
          <span>;</span>
          <br />
          <span className="text-yellow-500">{"}"}</span>
          <br />
          <span className="text-blue-500">var </span>
          <span className="text-yellow-200">myFunc</span>
          <span> = </span>
          <span className="text-yellow-200">makeFunction</span>
          <span className="text-yellow-500">()</span>
          <span>;</span>
          <br />
          <span className="text-yellow-200">myFunc</span>
          <span className="text-yellow-500">()</span>
          <span>;</span>
        </CodeBlock>
      </section>

      <hr className="absolute left-0 h-20 w-full -translate-y-1/2 -rotate-1 scale-x-125 border-none bg-zinc-950" />

      <section className="relative flex flex-col items-center gap-16 px-5 py-32">
        <div className="features-bg absolute inset-0 -z-10" />

        <Heading>all features</Heading>

        <CardsGrid>
          <Card data-name="fn">
            <CardTitle>functions</CardTitle>
            <CardText>
              supports user defined funcitons and has built in functions
            </CardText>
          </Card>
          <Card data-name="opp">
            <CardTitle>class and oop</CardTitle>
            <CardText>
              supports user defined class and any oop patterns such as
              inheritance
            </CardText>
          </Card>
          <Card data-name="var">
            <CardTitle>var</CardTitle>
            <CardText>
              assign your favorite data type to your definied variable
            </CardText>
          </Card>
          <Card data-name="/">
            <CardTitle>math</CardTitle>
            <CardText>
              perfom any complex math operations such as % / * + - ^
            </CardText>
          </Card>
          <Card data-name="for">
            <CardTitle>loops</CardTitle>
            <CardText>supports any loops such as for and while loops</CardText>
          </Card>
          <Card data-name="if">
            <CardTitle>if statment</CardTitle>
            <CardText>
              supports boolean alegbra, so you can create customs conditions
            </CardText>
          </Card>
        </CardsGrid>

        <CallToAction href="/playground">playground</CallToAction>
      </section>
    </main>
  );
}

const CallToAction = (props: ComponentProps<typeof Link>) => {
  return (
    <Link
      {...props}
      className="inline-block rounded-md bg-gradient-to-r from-pink-700 to-pink-500 px-10 py-3 font-semibold capitalize text-white opacity-90 transition-opacity hover:opacity-100 lg:text-xl"
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
  return <p {...props} className="text-xl text-neutral-400" />;
};

const Card = (props: HTMLProps<HTMLLIElement>) => {
  return (
    <li
      {...props}
      className="relative w-full space-y-2 overflow-hidden rounded-md border border-pink-900/70 bg-white/5 p-7 [box-shadow:0_0_50px_10px_rgba(113,24,76,0.3)] after:absolute after:bottom-0 after:right-0 after:flex after:aspect-square after:h-20 after:translate-x-1/4 after:translate-y-1/4 after:items-center after:justify-center after:rounded-full after:border after:border-pink-900/70 after:font-bold after:uppercase after:text-pink-900/70 after:content-[attr(data-name)]"
    />
  );
};

const CardTitle = (props: HTMLProps<HTMLHeadingElement>) => {
  return (
    <h3 {...props} className="text-lg font-semibold capitalize text-pink-600" />
  );
};

const CardText = (props: HTMLProps<HTMLParagraphElement>) => {
  return <p {...props} className="text-neutral-400" />;
};

const CardsGrid = (props: HTMLProps<HTMLUListElement>) => {
  return (
    <ul
      className="grid w-full max-w-7xl grid-cols-[repeat(auto-fill,minmax(min(100%,20rem),1fr))] gap-10"
      {...props}
    />
  );
};

const CodeBlock = (props: HTMLProps<HTMLElement> & { title: string }) => {
  const { title, ...codeProps } = props;

  return (
    <div className="rounded-md border border-white/5 bg-white/5 backdrop-blur-md">
      <div className="border-b border-white/10 p-2">
        <span className="font-bold capitalize text-neutral-400">{title}</span>
      </div>
      <code {...codeProps} className="block p-5" />
    </div>
  );
};
