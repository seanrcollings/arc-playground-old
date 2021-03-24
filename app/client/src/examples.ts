export interface Snippet {
  name: string;
  desc: string;
  code: string;
  command: string;
  arcfile: string;
}

// TODO: add commments and stuff to examples to get more into detail of each one
// TODO: Make the descriptions better, and add them below the editor

/*
EXAMPLES TO ADD:
  - Use of arc.color
  - Demonstrating Converters
  - Use of context
  - Different Command Types

*/

export const basicExample: Snippet = {
  name: "Basic Example",
  desc: "Most Basic example of an arc cli",
  code: `
"""ARC's declaritive nature makes
it very easy to get up and running
from scratch. With only ~ 6 lines of code
below, we've got a fully functional (if simple)
cli program
"""
from arc import CLI

cli = CLI() # Insantiate the CLI object

@cli.subcommand() # Declare the function as a subcommand
def hello(name: str): # Declare the arguments that the command has
  """Says hello to somebody"""
  print(f"hello {name}!") # Execution

cli() # Causes the CLI to be executed when running the script

# Try changing the value of the
# name variable below and see what happens when you execute it
`,
  command: "hello name=Sean",
  arcfile: "",
};

export const flagExample: Snippet = {
  name: "Flags",
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
def friend(name: str):
  print(f"Hey {name}, it's good to see you!")

cli()
`,
  command: "hello:friend name=Brooke ",
  arcfile: "",
};

export const colorExample: Snippet = {
  name: "Colors",
  desc: "Arc has built-in support for coloring output",
  code: `
from arc import CLI
from arc.color import fg, bg, effects
# Arc makes coloring your cli's ouput simple and easy to use
# The arc.color module exports 3 members: fb, bg, and effects
# fg - foreground colors
# bg - background colors
# effects - underline, strikethrough, clear, etc...
# both fg and bg support the basic ANSI 16 colors
# additionally both have a 'rgb' method for providing
# any color in the rgb spectrum, so long as the terminal supports it

cli = CLI()

@cli.subcommand()
def colored():
  print(f"{fg.RED}RED{effects.CLEAR}")
  print(f"{fg.GREEN}{effects.UNDERLINE}GREEN and Underlined!{effects.CLEAR}")
  print(f"{fg.rgb(12, 185, 124)}Some wacky color! {effects.CLEAR}")

cli()
  `,
  command: "colored",
  arcfile: "",
};

export const convertersExample: Snippet = {
  name: "Type Converting",
  desc: "Arc's powerful typing system",
  code: `
"""Arc handle the conversion of data from the command line for you
behind the scenes. All you need to do is give the argument a type hint,
and your off to the races!
"""
from typing import List, Union
from arc import CLI

cli = CLI()

# Each of the following commands will first print
# the type of their given argument, then the argument itself
# Feel free to mess around with them!


# python3 converters.py int value=5 -> int
# python3 converters.py int value=hi -> error
@cli.command("int")
def int_type(value: int):
    """Demonstrates int conversion"""
    print(type(value))
    print(value)


# python3 converters.py byte value=5 -> bytes
# python3 converters.py byte value=hi -> bytes
@cli.command("byte")
def byte_type(value: bytes):
    """Demonstrates byte conversion"""
    print(type(value))
    print(value)


# python3 converters.py float value=5 -> float
# python3 converters.py float value=5.5 -> float
# python3 converters.py int value=hi -> error
@cli.command("float")
def float_type(value: float):
    """Demonstrates float conversion"""
    print(type(value))
    print(value)


# Arc's suppport also extends to some generic types
# like Union, List, Dict, etc...

@cli.command("union")
def union_type(value: Union[int, str]):
  """Demonstrates union conversion"""
  print(type(value))
  print(value)

# python3 converters.py list value=1,2,3,4,5 -> [1, 2, 3, 4, 5]
# Without spaces, you don't need quotation marks
@cli.command("list")
def list_type(value: List[int]):
    """Demonstrates list conversion"""
    print(type(value))
    print(value)

cli()

`,
  command: "int value=2",
  arcfile: "",
};

export default [
  basicExample,
  flagExample,
  subcommandExample,
  colorExample,
  convertersExample,
];
