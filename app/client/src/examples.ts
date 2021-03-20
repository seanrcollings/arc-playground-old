interface Example {
  name: string;
  desc: string;
  code: string;
  command: string;
  arcfile: string;
}
export const basicExample: Example = {
  name: "Basic Example",
  desc: "Most Basic example of an arc cli",
  code: `
from arc import CLI

cli = CLI()

@cli.subcommand()
def hello(name: str):
  print(f"hello {name}!")

cli()
`,
  command: "hello name=Sean",
  arcfile: "",
};

export default {
  basicExample,
};
