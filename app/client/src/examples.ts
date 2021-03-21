export interface Snippet {
  name: string;
  desc: string;
  code: string;
  command: string;
  arcfile: string;
}

export const basicExample: Snippet = {
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

export const flagExample: Snippet = {
  name: "Flag Example",
  desc: "Using flags",
  code: `
from arc import CLI

cli = CLI()

@cli.subcommand()
def hello(name: str, reverse: bool):
  if reverse:
    name = name[::-1]
  print(f"hello {name}!")

cli()
`,
  command: "hello name=Sean --reverse",
  arcfile: "",
};

export const subcommandExample: Snippet = {
  name: "Subcommands",
  desc: "Subcommands can be infintley nested",
  code: `
from arc import CLI

cli = CLI()

@cli.subcommand()
def hello(name: str, reverse: bool):
  if reverse:
    name = name[::-1]
  print(f"hello {name}!")

@hello.subcommand()
def friend(friend_name: str):
  print(f"Hey {friend_name}, it's good to see you!")

cli()
`,
  command: "hello:friend name=Brooke ",
  arcfile: "",
};

export default [basicExample, flagExample, subcommandExample];
