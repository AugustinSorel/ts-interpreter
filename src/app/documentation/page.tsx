import { HTMLProps } from "react";

const Page = () => {
  return (
    <main className="mx-auto flex max-w-3xl flex-col">
      <h2 className="text-center text-3xl font-bold capitalize">
        typescript interpreter
      </h2>
      <p className="mb-10 mt-3 text-center text-neutral-400">
        This is a fully programming language made from from scratch with
        TypeScript. It supports OOP, classes, inheritance, user define
        functions, built in functions, variable assignments and loops.
      </p>

      <h3 className="text-3xl font-bold capitalize">features</h3>
      <h4 className="mb-5 mt-5 text-xl font-bold capitalize">OOP</h4>
      <CodeBlock>
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

      <h4 className="mb-5 mt-10 text-xl font-bold capitalize">functions</h4>

      <CodeBlock>
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

      <h4 className="mb-5 mt-10 text-xl font-bold capitalize">loops</h4>

      <CodeBlock>
        <span className="text-blue-500">for</span>
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
        <span className="text-yellow-200">i</span>
        <span>;</span>
        <br />
        <span className="text-yellow-500">{"}"}</span>
        <br />
        <br />
        <span className="text-blue-500">var </span>
        <span className="text-yellow-200">i</span>
        <span> = </span>
        <span className="text-yellow-200">0</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">while</span>
        <span className="text-yellow-500">(</span>
        <span className="text-yellow-200">i</span>
        <span> {"<"} </span>
        <span className="text-yellow-200">20</span>
        <span className="text-yellow-500">) </span>
        <span className="text-yellow-500">{"{"}</span>
        <br />
        <span className="text-blue-500">&nbsp;&nbsp;print </span>
        <span className="text-yellow-200">i</span>
        <span>;</span>
        <br />
        <span className="text-yellow-200">&nbsp;&nbsp;i</span>
        <span> = </span>
        <span className="text-yellow-200">i</span>
        <span> + </span>
        <span className="text-yellow-200">1</span>
        <span>;</span>
        <br />
        <span className="text-yellow-500">{"}"}</span>
      </CodeBlock>

      <h4 className="mb-5 mt-10 text-xl font-bold capitalize">boolean</h4>
      <CodeBlock>
        <span className="text-blue-500">var </span>
        <span className="text-yellow-200">x</span>
        <span className="text-blue-500"> = </span>
        <span className="text-yellow-200">12</span>
        <span className="text-blue-500"> {">"} </span>
        <span className="text-yellow-200">10</span>
        <span className="text-blue-500">+1 </span>
        <span className="text-yellow-500">? </span>
        <span className="text-yellow-200">true </span>
        <span className="text-yellow-500">: </span>
        <span className="text-yellow-200">false</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">print </span>
        <span className="text-yellow-200">x</span>
        <span>;</span>
        <br />
        <br />
        <span className="text-blue-500">if</span>
        <span className="text-yellow-500">(</span>
        <span className="text-blue-500">true</span>
        <span className="text-blue-500"> and </span>
        <span className="text-blue-500">false</span>
        <span className="text-yellow-500">)</span>
        <span className="text-yellow-500">{"{"}</span>
        <br />
        <span className="text-blue-500">&nbsp;&nbsp;print </span>
        <span className="text-emerald-500">
          &quot;true and false is true&quot;
        </span>
        <span className="text-yellow-500">;</span>
        <br />
        <span className="text-yellow-500">{"}"}</span>
        <span className="text-blue-500">else</span>
        <span className="text-yellow-500">{"{"}</span>
        <br />
        <span className="text-blue-500">&nbsp;&nbsp;print </span>
        <span className="text-emerald-500">
          &quot;true and false is false&quot;
        </span>
        <span className="text-yellow-500">;</span>
        <br />
        <span className="text-yellow-500">{"}"}</span>
      </CodeBlock>

      <h4 className="mb-5 mt-10 text-xl font-bold capitalize">math</h4>
      <CodeBlock>
        <span className="text-blue-500">var </span>
        <span className="text-yellow-200">x</span>
        <span> = </span>
        <span className="text-yellow-200">12</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">var </span>
        <span className="text-yellow-200">y</span>
        <span> = </span>
        <span className="text-yellow-200">13</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">var </span>
        <span className="text-yellow-200">z</span>
        <span> = </span>
        <span className="text-yellow-200">14</span>
        <span>;</span>
        <br />
        <br />
        <span className="text-blue-500">print </span>
        <span className="text-yellow-500">(</span>
        <span className="text-yellow-200">x</span>
        <span> + </span>
        <span className="text-yellow-200">y</span>
        <span className="text-yellow-500">) </span>
        <span>*</span>
        <span className="text-yellow-200"> z</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">print </span>
        <span className="text-yellow-200">x</span>
        <span> + </span>
        <span className="text-yellow-200">y</span>
        <span> * </span>
        <span className="text-yellow-200">z</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">print </span>
        <span className="text-yellow-500">(</span>
        <span className="text-yellow-200">x</span>
        <span> - </span>
        <span className="text-yellow-200">10</span>
        <span className="text-yellow-500">)</span>
        <span> ** </span>
        <span className="text-yellow-500">(</span>
        <span className="text-yellow-200">y</span>
        <span> - </span>
        <span className="text-yellow-200">11</span>
        <span className="text-yellow-500">)</span>
        <span> - </span>
        <span className="text-yellow-200">z</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">print </span>
        <span className="text-yellow-200">x</span>
        <span> + </span>
        <span className="text-yellow-200">y</span>
        <span> ** -</span>
        <span className="text-yellow-200">1</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">print </span>
        <span className="text-yellow-200">x</span>
        <span> / </span>
        <span className="text-yellow-200">y</span>
        <span> / </span>
        <span className="text-yellow-200">z</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">print </span>
        <span className="text-yellow-200">y</span>
        <span> + </span>
        <span className="text-yellow-200">0.0</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">print </span>
        <span className="text-yellow-200">x</span>
        <span> % </span>
        <span className="text-yellow-200">20</span>
        <span> + </span>
        <span className="text-yellow-200">x</span>
        <span> % </span>
        <span className="text-yellow-200">10</span>
        <span>;</span>
      </CodeBlock>

      <h4 className="mb-5 mt-10 text-xl font-bold capitalize">string</h4>
      <CodeBlock>
        <span className="text-blue-500">var </span>
        <span className="text-yellow-200">x </span>
        <span>= </span>
        <span className="text-emerald-500">&quot;hello&quot;</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">var </span>
        <span className="text-yellow-200">y </span>
        <span>= </span>
        <span className="text-emerald-500">&quot;world&quot;</span>
        <span>;</span>
        <br />
        <br />
        <span className="text-blue-500">print </span>
        <span className="text-yellow-200">x </span>
        <span>+</span>
        <span className="text-emerald-500"> &quot; &quot;</span>
        <span>+</span>
        <span className="text-yellow-200"> y</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">print </span>
        <span className="text-yellow-200">x </span>
        <span>+</span>
        <span className="text-yellow-200"> 3</span>
        <span>;</span>
      </CodeBlock>

      <h4 className="mb-5 mt-10 text-xl font-bold capitalize">
        built in functions
      </h4>
      <CodeBlock>
        <span className="text-blue-500">print </span>
        <span className="text-emerald-500">&quot;Hello&quot;</span>
        <span>;</span>
        <br />
        <span className="text-blue-500">print </span>
        <span className="text-blue-500">clock</span>
        <span className="text-yellow-500">()</span>
        <span>;</span>
      </CodeBlock>

      <h4 className="mb-5 mt-10 text-xl font-bold capitalize">comment</h4>
      <CodeBlock>
        <span className="text-neutral-400">{"/*"}</span>
        <br />
        <span className="text-neutral-400">
          &nbsp;&nbsp;{"the clock method is a built in function"}
        </span>
        <br />
        <span className="text-neutral-400">{"*/"}</span>
        <br />

        <span className="text-blue-500">print </span>
        <span className="text-blue-500">clock</span>
        <span className="text-yellow-500">()</span>
        <span>;</span>
        <span className="text-neutral-400">
          &nbsp;&nbsp;{"// this will print the time"}
        </span>
      </CodeBlock>
    </main>
  );
};

export default Page;

const CodeBlock = (props: HTMLProps<HTMLElement> & { title?: string }) => {
  const { title, ...codeProps } = props;

  return (
    <div className="rounded-md border border-white/5 bg-white/5 backdrop-blur-md">
      {title && (
        <div className="border-b border-white/10 p-2">
          <span className="font-bold capitalize text-neutral-400">{title}</span>
        </div>
      )}
      <code {...codeProps} className="block p-5" />
    </div>
  );
};
