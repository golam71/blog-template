---
layout: ../../layouts/MarkdownPostLayout.astro
title: My Second Blog Post
author: Astro Learner
description: "After learning some Astro, I couldn't stop!"
image:
  url: "https://docs.astro.build/assets/arc.webp"
  alt: "The Astro logo on a dark background with a purple gradient arc."
pubDate: 2022-07-08
tags: ["astro", "blogging", "learning in public", "successes"]
---


Notes about the [python tutorial](https://docs.python.org/3/tutorial/index.html)

# 1. Whetting Your Appetite

  1. **Python's Usefulness**:
     - Automates tasks easily.
     - Faster development cycle than C/C++/Java.

  2. **Why Choose Python**:
     - Simple, readable code.
     - High-level data types.
     - Interactive development.

  3. **Advantages**:
     - Short, concise programs.
     - Reusable modules and a strong standard library.
     - Extendable with C.


# 2 Using the Interpreter

## 2.1 Invoking the Interpreter

- The python binary can be found at `/usr/local/bin/python` or `usr/local/python`
- Hence to run it you just need to type `python` 
- To do a `EOF` you can type `Ctrl+d`
-  For auto compete you can do `Tab` (a better option is to use `ipyton`)
-  Running commands with it is also supported `python -c "print(1)"`
-  Loading modules in the command line is done with `-m`
-  Running a python file before going to interactive mode is done with `-i code.py`

### 2.1.1 Argument Passing

-  You can also print the arguments with `sys.argv[n]` (file name is n=0)

```python
import sys
print(sys.argv[1])
```

hence `python code.py argument`  will print argument. and if n was 0 it would print file name. In our case `code.py`

### 2.1.2  Interactive Mode

-  for one line interpreted code the interpreter looks like `>>>`
-  if it expects more lines it shows `...`


## 2.2 The Interpreter and Its Environment

### 2.2.1 Source Code Encoding

By default python uses `UTF-8` encoding. If you wish to override that then add special comment as the **first line** in your code.

the syntax of such is as follows

```python
# -*- coding: encoding -*-
```

so if I wanted to get `Windows-1252` encoding I will need to write it as

```python 
# -*- coding: cp1252 -*- 
```

But there is an exception and that is when the first line is [shebang rule](https://docs.python.org/3/tutorial/appendix.html#tut-scripts) (Used to specify interpreter when running code)

because of that the following will work

```python
#!/usr/bin/env python3
# -*- coding: cp1252 -*- 
```

# 3 An Informal Introduction to Python

- To write comments you can do `# this is a comment` 
-  Multi line comments are done with 3 quotes 
-  Inline comments are done with `# as well`

## 3.1. Using Python as a Calculator

### 3.1.1. Numbers

It has arithmetic operators

```python
x = 10
y = 20

print(x + y) # 30
print(x - y) # -10
print(x * y) # 200
print(x / y) # 0.5
print(x % y) # 10
print(x **y) # 100000000000000000000
```

variables are dynamic.

- Numbers without `.` are `int` for example 10
-  Numbers with `.` are `float` for example 10.2
-  Even if you divide both `int` numbers it will return `float`
-  `%`  is the remainder operator and `**` is power operator,
- `=` is used to assign value to variables (variables hold any kind singular of data)
-  In **interactive mode** the last evaluated expression is stored in `_` named variable


```python
tax = 12.5 / 100
price = 100.50
price * tax

price + _

round(_, 2) # will round up the number by 2 nums after .
```

### 3.1.2. Text

- pythons strings are `str` type and they support all 3 quote types 

```python
string1 = "hello"
string2 = 'hello'
string3 = `hello`
string4 = """hello
			 hello
			 hello""" # multiline (could also be done with single quotes)
```

- to escape a quote use `\'` 

```python
'doesn\'t'  # use \' to escape the single quote...
"doesn't"  # ...or use double quotes instead
"\"Yes,\" they said."
```

- `print()` renders the special chars such as `\n` (newline char)
- if you don't python to render special chars use `pint(r"C:\some\name)` (notice the r)
- A raw string ending with an odd number of backslashes will escape the string’s quote
	1. to fix you can add strings `r'C:\this\will\work' '\\'`
	2. use double slashes `'C:\\this\\will\\work\\'`
	3. use [os.path.join()](https://docs.python.org/3/library/os.path.html#os.path.join "os.path.join")
	4. no escaping occurs when interpreting the value of the raw string

-  to add strings either use `+` or use 2 of them inside brackets `("hello" "golam")` will concatenate
- all strings are arrays but don't have all array functions 
 
```python
name = "golam"
name[1] # will output in "o" cause arrays start at 0
name[-1] # will output "m" cause there is no -0 
name[1:] # will show "olam" and [-2:] shows "am"
name[1:3] # shows "ol"  (this is known as slicing)
```

- strings are `immutable` they can't be changed so `name[1] = "n"` is not possible
-  `len(name)` will return length of name
-  you can embed quotes without escaping `"I don't like java"`
-  have a look at the [string methods](https://docs.python.org/3/library/stdtypes.html#string-methods)
-  `fstrings` can print data inside strings without adding it as string

```python
name = "golam"
age = 19
print(f"My name is {name}")
print(f"I was born in {2024-age}")
```

-  formatting string is also possible (C style can also be done)

```python
print("My name is {0} and I am {1} years old".format(name,age))
# My name is golam and I am 19 years old
print("My name is %s and I am %i years old" % (name, age))
```


### 3.1.3. Lists

When data types are grouped together they are known as `Lists`(arrays). Unlike strings they are mutable. It supports concatenation as well. and the slicing methods we saw earlier.

```python
array = [1,2,3,4,5]
array.append(6) # will add 6
new_array = [1,2,3,4,array,6,7] # nesting is possible
# so new_array[4][1] will give is 2

```

## 3.2. First Steps Towards Programming

we are going to make our own [fibonacci series](https://en.wikipedia.org/wiki/Fibonacci_sequence)

```python
# Fibonacci series:
# the sum of two elements defines the next
a, b = 0, 1
while a < 10:
    print(a)
    a, b = b, a+b
```

- define value of a as 0 and b as 1
-  while a is not larger then 10 keep the indented code running
-  print a
-  set the value of a to b
-  set the value of b to `a+b`
- repeat until the condition is false
-  you can use `print("data", end=",")` to end printed items with , instead of `\n`



# 4. More Control Flow Tools

## 4.1. `if` Statements

```python
x = int(input("Please enter an integer: "))

if x < 0:
    x = 0
    print('Negative changed to zero')
elif x == 0:
    print('Zero')
elif x == 1:
    print('Single')
else:
    print('More')
```

- input is used to take data from the user
-  if `expression` (and if that expression is true that runs the code indented)
- elif is made up of else if (works same way as if)
-  if none of the if and elif are true else is executed


## 4.2. `for` Statements

This iterates over a list or data item without any kind of condition.

```python
words = ['cat', 'window', 'defenestrate']
for word in words:
	print(word)
```

- iterates over the list called words and prints every item
-  you can use any char or word for `word` in the loop

```python
# Create a sample collection
users = {'Hans': 'active', 'Éléonore': 'inactive', '景太郎': 'active'}

# Strategy:  Iterate over a copy
for user, status in users.copy().items():
    if status == 'inactive':
        del users[user]

# Strategy:  Create a new collection
active_users = {}
for user, status in users.items():
    if status == 'active':
        active_users[user] = status
```

- modifying data as you go is tricky you can use a copied dictionary (the items inside {} are dicts)
-  dicts have `name:value` syntax and can be used more

1. create a copy of dict using `.copy()` and make that **iterable** (loopable)
	- define user as `name` and status as `key`
	-  check if status is inactive or not if yes delete user  
2. create a new dictionary
	- define user as `name` and status as `key`
	-  check if status is active if yes then set `active_user[name]` equal to `key`


## 4.3. The `range()` Function

- If you do need to iterate over a sequence of numbers

```python
for i in range(10):
	print(i, end=",")
# 1,2,3,4,5,6,7,8,9,
# it is possible to start at another value by doing range(20,30)
```

- note that range always picks number until the last one(not including)
- range creates an object even tho it behaves as if it is a list hence it saves space
-  `sum(range(10))` is 55 and sum expects an iterable item

## 4.4. `break` and `continue` Statements

- break statement breaks out of loops like `for` or `while`
- continue statement well it continues 

```python
for num in nums:
	if num == 4:
		print("2 found")
        break
    else:
        print("not found")
        continue
```

## 4.5. `else` Clauses on Loops

- In the context of `for` loops else executes when it finishes looping over items
-  for `while` loops they execute after the condition is false
- the `else` part is not executed if it stops by `break`
- loops else clause runs when exception happens
-  when using `try` else will execute if no exceptions happen


## 4.6. `pass` Statements

- this simply does nothing and is used as placeholder
-  one difference between `pass` and `contnue` is that continue skips over iteration

## 4.7. `match` Statements

match statements are like `switch` statements in other programming languages.

```python
def http_error(status):
    match status:
        case 400:
            return "Bad request"
        case 404:
            return "Not found"
        case 418:
            return "I'm a teapot"
        case _:
            return "Something's wrong with the internet"
```

- notice that the value of status evaluates the whole thing
-  instead of switch we use match
-  `_` is the default case

the `|` operator behaves like `or` (using or will syntax error)

```python
case 401 | 403 | 404:
    return "Not allowed"
    ```

> [!abstract]
> Note about classes (they will appear later on lesson 9)
> 

```python
class Animal:
	def __init__(self,name,age):
		self.name = name
		self.age = age
		
	def meow(self):
		print(f"{self.name} is a {age} year old kitty")
		

```

`Animal` is a class and `meow` is a method of that class
-  `self` is not a keyword but we expect you not use something else
-  its only there to map things out.

```python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

def where_is(point):
    match point:
        case Point(x=0, y=0):
            print("Origin")
        case Point(x=0, y=y):
            print(f"Y={y}")
        case Point(x=x, y=0):
            print(f"X={x}")
        case Point():
            print("Somewhere else")
        case _:
            print("Not a point")
```

- you can pass `positional parameters` 
```python
class Point:
    __match_args__ = ('x', 'y')
    def __init__(self, x, y):
        self.x = x
        self.y = y

match points:
    case []:
        print("No points")
    case [Point(0, 0)]:
        print("The origin")
    case [Point(x, y)]:
        print(f"Single point {x}, {y}")
    case [Point(0, y1), Point(0, y2)]:
        print(f"Two on the Y axis at {y1}, {y2}")
    case _:
        print("Something else")
```

you can use `__match_args__` so that you don't need to use `(x=0,y=0)` rather you can just use 

*skipping some parts here*

## 4.8. Defining Functions

`def` keyword is used to create functions

```python
def hello(name):
	"""prints hello to the name"""
	print(f"hello {name}")

hello("golam") # prints hello golam
hello("not golam") # prints hello not golam
```

-  def is used to define the function name
-  string literal is the part `"""` and it contains documentation for the function
-  `hello` is the function name 
-  anything inside the `()` is an argument
-  we can use the argument anywhere inside the indented code
- all variables inside the indented part are `local` unless used with `global`
- functions that do not have `return` in then usually return `None`

when you return something and the function gets executed it doesn't print what it returns unless you print the function 

```python
def fib2(n):  # return Fibonacci series up to n
    """Return a list containing the Fibonacci series up to n."""
    result = []
    a, b = 0, 1
    while a < n:
        result.append(a)    # see below
        a, b = b, a+b
    return result

f100 = fib2(100)    # call it
f100                # write the result
```

## 4.9. More on Defining Functions

It is also possible to define functions with a variable number of arguments. There are three forms, which can be combined.

### 4.9.1. Default Argument Values

```python
def ask_ok(prompt, retries=4, reminder='Please try again!'):
    while True:
        reply = input(prompt)
        if reply in {'y', 'ye', 'yes'}:
            return True
        if reply in {'n', 'no', 'nop', 'nope'}:
            return False
        retries = retries - 1
        if retries < 0:
            raise ValueError('invalid user response')
        print(reminder)

ask_ok('Do you really want to quit?') 
ask_ok('OK to overwrite the file?', 2) 
ask_ok('OK to overwrite the file?', 2, 'Come on, only yes or no!')

```

-  notice how you can have default arguments
-  when they are not provided defaults are used
-  this also introduces the `in` keyword
-  The default value is evaluated only once

### 4.9.2. Keyword Arguments

`K`eyword `arg`uments also know as `**kwargs`

its also good time to look at `*args` as well.

```python
def order_pizza(size, *toppings, **details):
    print(f"Ordered a {size} pizza with the following toppings:")
    for topping in toppings:
        print(f"- {topping}")
    print(details)

order_pizza("large", "pepperoni", "olives", delivery=True, tip=5)

```

- `*` operator in python is used for unpacking
- so every `*` item in the functions argument is actually a `*` arg and every item you define with the name is `**`kwarg
- note first one returns tupels and the other returns objects
-  python will understand what are the `*args` and `**kwargs` based on the usage and you can also use normal arguments and use them as last 2
-  for using `*args` you simply need to put individual items in the arguments
-  to use `*kwargs` you will put the keyword there and then specify when using (they take in values)
-  In a function call, keyword arguments must follow positional arguments 

```python
def hello(class_name, *student_names, **teachers):
    print(f"following students read in class {class_name} :")
    for name in student_names:
        print(f" - {name}")
    print(teachers)


hello(
    10,
    "student1",
    "student2",
    "student3",
    teacher="teacher",
    seconder_teacher="seconder teacher",
)
```


```
following students read in class 10 :
 - student1
 - student2
 - student3
{'teacher': 'teacher', 'seconder_teacher': 'seconder teacher'}
```

### 4.9.3. Special parameters

- by default arguments need to be passed as positional values or with keyword

```
def f(pos1, pos2, /, pos_or_kwd, *, kwd1, kwd2):
      -----------    ----------     ----------
        |             |                  |
        |        Positional or keyword   |
        |                                - Keyword only
         -- Positional only
```

-  `/` and `*` are optional
-  these symbols indicate the kind of parameter by how the arguments may be passed to the function
-  positional-only, positional-or-keyword, and keyword-only
-  Keyword parameters are also referred to as named parameters.

#### 4.9.3.1. Positional-or-Keyword Arguments

- if `/` and `*` are not found then both ways are acceptable

#### 4.9.3.2. Positional-Only Parameters

- it is possible to mark certain parameters as _positional-only_
- Use a `/` to separate positional-only parameters from the rest.
-  These parameters must be given by position (order matters) and can't be called by name.

```python
def example(a, b, /, c):
    print(a, b, c)
# example(1, 2, 3) is valid.
# example(1, 2, c=3) is valid.
# example(a=1, b=2, c=3) will raise an error because a and b are positional-only.
# basically anything before / is positional only
```

#### 4.9.3.3. Keyword-Only Arguments

-  any argument after `*` must be supplied as keyword arguments
- the arguments before it can be positional

```python
def example(a, b, *, c):
    print(a, b, c)


example(1, 2, c=1)

# using c without keyword arg will error
# using positional args as keyword args will error as well
# basically anything after * is kwargs only
```

#### 4.9.3.4. Function Examples

this has been explained so i will just leave a code snippet 

```python
def standard(arg):           # Positional or keyword
    print(arg)

def pos_only(arg, /):        # Positional-only
    print(arg)

def kwd_only(*, arg):        # Keyword-only
    print(arg)

def combo(pos_only, /, standard, *, kwd_only):  # Mix of all three
    print(pos_only, standard, kwd_only)

# Examples
standard(2)                  # 2
standard(arg=2)              # 2

pos_only(1)                  # 1
# pos_only(arg=1) → TypeError

# kwd_only(3) → TypeError
kwd_only(arg=3)              # 3

# combo(1, 2, 3) → TypeError
combo(1, 2, kwd_only=3)      # 1 2 3

def foo(name, /, **kwds):
    return 'name' in kwds

foo(1, **{'name': 2})        # True

```


#### 4.9.3.5. Recap

-  Use positional-only if you want the name of the parameters to not be available to the user. This is useful when parameter names have no real meaning, if you want to enforce the order of the arguments when the function is called or if you need to take some positional parameters and arbitrary keywords.

-  Use keyword-only when names have meaning and the function definition is more understandable by being explicit with names or you want to prevent users relying on the position of the argument being passed.

-  For an API, use positional-only to prevent breaking API changes if the parameter’s name is modified in the future.

### 4.9.4. Arbitrary Argument Lists

- without knowing how many args will be specified we might use `*arg` and get tuple

```python
def concat(*args, sep="/"):
    return sep.join(args)

```

- concat("earth", "mars", "venus")` → `'earth/mars/venus'
-  concat("earth", "mars", "venus", sep=".")` → `'earth.mars.venus'

### 4.9.5. Unpacking Argument Lists

* If a function expects multiple **positional** arguments but you have them in a **list or tuple**, use `*` to unpack them.
```python
args = [3, 6]
list(range(*args))  # Unpacks [3, 6] to range(3, 6)
# Output: [3, 4, 5]

```

- If a function expects **keyword arguments**, you can use `**` to unpack them from a dictionary.

```python
d = {"voltage": "four million", "state": "bleedin' demised", "action": "VOOM"}
parrot(**d)
# Unpacks the dictionary to: parrot(voltage="four million", state="bleedin' demised", action="VOOM")
# Output: "-- This parrot wouldn't VOOM if you put four million volts through it. E's bleedin' demised!"

```

- `*` unpacks a list/tuple into **positional arguments**.
- `**` unpacks a dictionary into **keyword arguments**.

### 4.9.6. Lambda Expressions

- anonymous function as in the ones which don't have names hence the name
- they are limited to one expression
-  mainly used in higher level functions where you need to pass functions as arguments

```python
# A lambda function that adds two numbers
add = lambda x, y: x + y

# Using the lambda function
print(add(3, 5))  # Output: 8

```

- `lambda x, y: x + y` creates a function that takes two arguments (`x` and `y`) and returns their sum.
- `add` is the variable holding the lambda function.
- `add(3, 5)` returns `8`.

### 4.9.7. Documentation Strings

-  you must start the doc string with a capital letter
-  the first line needs to be small and end with period while having summary 
-  if there are more line 2nd line should be blank 
-  Python does not automatically remove any leading indentation
-  first line **after blank** is the standard for indenting spaces
-  you should usually use 8 spaces or 2 tabs
-  If a line is indented less than 8 spaces, its leading spaces are completely stripped


### 4.9.8. Function Annotations

- they are optional metadata information about the types used by user-defined functions
- Parameter annotations are defined by a colon after the parameter name `greet(name : str)`
-  followed by an expression evaluating to the value of the annotation 
-  Return annotations are defined by a literal  `greet(name : str) -> str`

```python
def greet(name: str) -> str:
    return "Hello, " + name
def add(x: int, y: int) -> int:
    return x + y
def greet(name: str = "World") -> "Greets a person by name":
    return f"Hello, {name}!"
def multiply(a: int, b: int) -> int:
    return a * b

print(multiply.__annotations__)
# Output: {'a': <class 'int'>, 'b': <class 'int'>, 'return': <class 'int'>}

```

## 4.10. Intermezzo: Coding Style

-  [pep8](https://peps.python.org/pep-0008/) has become the standard for style guide for most projects
-  Use 4-space indentation, and no tabs
-  Wrap lines so that they don’t exceed 79 characters
-  Use blank lines to separate functions and classes, and larger blocks of code inside functions
-  When possible, put comments on a line of their own
-  Use `docstrings`
-  Use spaces around operators and after commas, but not directly inside bracketing constructs: `a = f(1, 2) + g(3, 4)`
-  Name your classes and functions consistently; the convention is to use `UpperCamelCase` for classes and `lowercase_with_underscores` for functions and methods. Always use `self` as the name for the first method argument
-  Don’t use fancy `encodings` if your code is meant to be used in international environments. Python’s default, `UTF-8`, or even plain ASCII work best in any case.


# 5. Data Structures

## 5.1. More on Lists



- **`list.append(x)`**: Adds an item to the end of the list.
- **`list.extend(iterable)`**: Extends the list by adding items from an .
- **`list.insert(i, x)`**: Inserts an item at a specified position `i`.
- **`list.remove(x)`**: Removes the first occurrence of `x` from the list.
- **`list.pop([i])`**: Removes and returns the item at index `i`, or the last item if no index is provided.
- **`list.clear()`**: Removes all items from the list.
- **`list.index(x[, start[, end]])`**: Returns the index of the first occurrence of `x` in the list.
- **`list.count(x)`**: Returns the number of times `x` appears in the list.
- **`list.sort(*, key=None, reverse=False)`**: Sorts the list in place.
- **`list.reverse()`**: Reverses the list in place.
- **`list.copy()`**: Returns a shallow copy of the list.


```python
fruits = ['orange', 'apple', 'pear', 'banana', 'kiwi', 'apple', 'banana']

# Count the occurrences of 'apple' in the list
print(fruits.count('apple'))  # Output: 2

# Count the occurrences of 'tangerine' in the list (not in the list)
print(fruits.count('tangerine'))  # Output: 0

# Find the index of the first occurrence of 'banana'
print(fruits.index('banana'))  # Output: 3

# Find the index of 'banana' starting from position 4
print(fruits.index('banana', 4))  # Output: 6

# Reverse the list
fruits.reverse()
print(fruits)  
# Output: ['banana', 'apple', 'kiwi', 'banana', 'pear', 'apple', 'orange']

# Append 'grape' to the list
fruits.append('grape')
print(fruits)  
# Output: ['banana', 'apple', 'kiwi', 'banana', 'pear', 'apple', 'orange', 'grape']

# Sort the list alphabetically
fruits.sort()
print(fruits)  
# Output: ['apple', 'apple', 'banana', 'banana', 'kiwi', 'orange', 'pear', 'grape']

# Pop the last item from the list
popped_item = fruits.pop()
print(popped_item)  # Output: 'grape'
print(fruits)  
# Output: ['apple', 'apple', 'banana', 'banana', 'kiwi', 'orange', 'pear']

```

* for every mutable data structure in python if you modify them with methods that directly affect the item as in don't create a new copy, you will get  `None` as return value
- complex numbers or numbers in general cant be compared with strings hence if the data structure has both in it doing `.sort()` wont do anything

### 5.1.1. Using Lists as Stacks

- stack is a list like structure where a item is added last and the item is removed first
-  last-in, first-out
-  3 people in a room a man comes and goes away


```python
stack = [3, 4, 5]
stack.append(6)
stack.pop()
```

### 5.1.2. Using Lists as Queues

- where the first element added is the first element retrieved
- first-in, first-out
-  to use a queue its better to import `collections.deque`
- 3 people in a room a man comes the first ever man to enter the room goes away

```python
from collections import deque
queue = deque(["Eric", "John", "Michael"])
queue.append("Terry")           # Terry arrives
queue.append("Graham")          # Graham arrives
queue.popleft()                 # The first to arrive now leaves
```

### 5.1.3. List Comprehensions

-  it provides a concise way to create lists
-  it allows to generate new lists from other list
-  usage with `lamda` functions make it easier

```python
squares = []
for x in range(10):
    squares.append(x**2)
```

the following code can be written like this 

```python
squares = list(map(lambda x: x**2, range(10)))
```

- the map function in python would map every thing to the `lamda` function using the 2nd argument
-  so if i say `map(lamda x: x**2, num_array)` that would mean run every element in `num_array` with the `lamda` function kinda like `array.map` in `javascript`
- and it does't return an array which is why you need to `list()` it.

```python
squares = [x**2 for x in range(10)]
```

- you can have nested loops and conditions as well

```python
vec = [-4, -2, 0, 2, 4]
positive_values = [x for x in vec if x >= 0]
combs = [(x, y) for x in [1, 2, 3] for y in [3, 1, 4] if x != y]
```

- this kind of works like this `[expression iteration]` and expression is executed for every iteration
the last combs expression would result in 

```python
combs = []
for x in [1,2,3]:
    for y in [3,1,4]:
        if x != y:
            combs.append((x, y))
```


- If the expression is a tuple (e.g. the `(x, y)` in the previous example), it must be parenthesized.


### 5.1.4. Nested List Comprehensions

- honestly it works like list comprehensions 
-  `expression for-statement if-condition`
-  just use extra `[]`in expression

```python
transposed = []
for i in range(4):
    transposed.append([row[i] for row in matrix])
```

is same as

```python
[[row[i] for row in matrix] for i in range(4)]
```

## 5.2. The `del` statement

- a way to remove an item from a list given its index instead of its value
- differs from the `pop()` method which returns a value
-  can also be used to delete entire variables
```python
a = [-1, 1, 66.25, 333, 333, 1234.5]
del a[0]
print(a)
# [1, 66.25, 333, 333, 1234.5]

del a[2:4]
print(a)
# [1, 66.25, 1234.5]

del a[:]
print(a)
# []
```

## 5.3. Tuples and Sequences

- a tuple consists of a number of values separated by commas
- they are immutable 
- like lists(arrays) they can be nested
- use `()` to nest and for defining you can leave them out
- tuples with single items are added with a trailing comma `,`
- empty tuples are useless but if you want create one do `t=()`
- its also possible to unpack the tuples and use variables

```python
t = 1,2,3,4,5
print(t)
# (1, 2, 3, 4, 5)


t = 1, 2, 3  # A tuple with three values

# Sequence unpacking
x, y, z = t  # Unpacks the values into separate variables

print(x)  # Output: 1
print(y)  # Output: 2
print(z)  # Output: 3
```


## 5.4. Sets

- set is an unordered collection with no duplicate elements
- set objects also support mathematical operations like union, intersection, difference, and symmetric difference
- curly braces or the `set()` function can be used to create sets
- to create an empty set you have to use `set()`, not `{}`; the latter creates an empty dictionary

```python
basket = {'apple', 'orange', 'apple', 'pear', 'orange', 'banana'}
print(basket)  # show that duplicates have been removed


# Demonstrate set operations on unique letters from two words

a = set('abracadabra')

b = set('alacazam')

a                                  # unique letters in a
{'a', 'r', 'b', 'c', 'd'}

a - b                              # letters in a but not in b
{'r', 'd', 'b'}

a | b                              # letters in a or b or both
{'a', 'c', 'r', 'd', 'b', 'm', 'z', 'l'}

a & b                              # letters in both a and b
{'a', 'c'}

a ^ b                              # letters in a or b but not both
{'r', 'd', 'b', 'm', 'z', 'l'}
```


## 5.5. Dictionaries

- dictionaries are indexed by _keys_
- strings and numbers can always be keys
- tuples can be used as keys if they contain only strings, numbers, or tuples
- immutable items can be used as keys
- It is best to think of a dictionary as a set of _key: value_ pairs
- the keys are unique (within one dictionary)
- `list(set)` would return a list with all the keys

```python
tel = {'jack': 4098, 'sape': 4139}
tel['guido'] = 4127
print(tel) # {'jack': 4098, 'sape': 4139, 'guido': 4127}
print(tel['jack']) # 4098

list(tel)
# ['jack', 'guido', 'irv']

sorted(tel)
#['guido', 'irv', 'jack']
```

- `dict()` constructor can build dictionary 
```python
dict(sape=4139, guido=4127, jack=4098)
# {'sape': 4139, 'guido': 4127, 'jack': 4098}
```

## 5.6. Looping Techniques

- looping through dictionary

```python
knights = {'gallahad': 'the pure', 'robin': 'the brave'}
for k, v in knights.items():
    print(k, v)
```

- when looping through a sequence, the position index and corresponding value can be retrieved at the same time using the `enumerate()` function.
```python
for i, v in enumerate(['tic', 'tac', 'toe']):
    print(i, v)
#0 tic
#1 tac
#2 toe
```

## 5.7. More on Conditions

- the conditions used in `while` and `if` statements can contain any operators, not just comparisons.
- comparisons can be chained with `and`  / `or`
- `not` has the highest priority and `or` the lowest
- `A and not B or C` is equivalent to `(A and (not B)) or C`
- parentheses can be used to express the desired composition
- it is possible to assign the result of a comparison or other Boolean expression to a variable

## 5.8. Comparing Sequences and Other Types

- sequence comparisons use **lexicographical ordering**
- elements are compared one by one from left to right
- If elements differ, the comparison is decided at that point
- If equal, the next elements are compared until one sequence ends
- for strings, comparisons use Unicode code points
- comparisons between different types are generally allowed if a sensible comparison exists (e.g., numbers), but otherwise result in a `TypeError`

# 6. Modules

in long python code bases its normal to split the code and keep it in relevant files. to do such we can use modules. a python module is simply a python file. you can also import some parts of a python file instead of importing the whole thing.

- module is a file containing Python definitions and statements. The file name is the module name with the suffix `.py` appended

```python
# Fibonacci numbers module

def fib(n):    # write Fibonacci series up to n
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()

def fib2(n):   # return Fibonacci series up to n
    result = []
    a, b = 0, 1
    while a < n:
        result.append(a)
        a, b = b, a+b
    return result
```

- now you can import is like this `import fibo` 
- use functions like this`fibo.fib(1000)`
- using it as a local variable is also possible

## 6.1. More on Modules

- a module can contain executable statements as well as function definitions
- Each module has its own private namespace, which is used as the global namespace by all functions defined in the module. Thus, the author of a module can use global variables in the module without worrying about accidental clashes with a user’s global variables
- Modules can import other modules
- It is customary but not required to place all `import` statements at the beginning of a module (or script, for that matter)
- import specific functions `from fibo import fib, fib2` (note in this case `fibo` is no defined)
- import every function/name like this `from fibo import *` (does not include the ones starting with `_`)
- defining local names while importing `from fibo import fib as fibonacci`

### 6.1.1. Executing modules as scripts

when you import a module the code inside the module gets executes hence the name definitions are defined but that's a problem. because print statements and functions run in the file will be run while importing the file. to avoid it we can do 

```python
# main.py file
if __name__ == "__main__":
	main()
```

every python file has some variables reserved `__name__` being one of such. and it will have the value of `"__main__"` only if you are running the file directly for example

```
 ~ cat first_file.py
print(__name__)
 ~ cat second_file.py
import first_file
 ~ python first_file.py
__main__
 ~ python second_file.py
first_file
```

the file name will only return `__main__` if run directly or else if it is being run in a module it will return the module name.


### 6.1.2. The Module Search Path

### Summary

- When importing a module, Python first searches for a built-in module by that name.
- Built-in module names are listed in `sys.builtin_module_names`.
- If the module isn't built-in, Python looks for a file named `spam.py`.
- The search for `spam.py` is conducted in directories listed in `sys.path`.
- `sys.path` is initialized from:
	- The directory containing the input script (or the current directory if no file is specified).
	- `PYTHONPATH` environment variable (a list of directories, similar to the shell `PATH` variable).
	- An installation-dependent default directory (often includes a `site-packages` directory).
- On file systems which support `symlinks`, the directory containing the input script is calculated after the `symlink` is followed

### 6.1.3. “Compiled” Python files

- To speed up loading modules, Python caches the compiled version of each module in the `__pycache__` directory
- under the name `module._version_.pyc`, where the version encodes the format of the compiled file

## 6.2. Standard Modules

- some modules are built in and yet they are not part of the core language
- modules are *usually* platform independent 

## 6.3. The `dir()` Function

- returns the defined list of names a function/module has
- without the argument it will return currently reserved names
- note that it lists all types of names: variables, modules, functions, etc
- does not list the names of built-in functions and variables
- to list built-in ones use `builtins`
```python
print(dir(print))
['__call__', '__class__', '__delattr__', '__dir__', '__doc__', '__eq__', '__format__', '__ge__', '__getattribute__', '__getstate__', '__gt__', '__hash__', '__init__', '__init_subclass__', '__le__', '__lt__', '__module__', '__name__', '__ne__', '__new__', '__qualname__', '__reduce__', '__reduce_ex__', '__repr__', '__self__', '__setattr__', '__sizeof__', '__str__', '__subclasshook__', '__text_signature__']
```


## 6.4. Packages

-  a way of structuring Python’s module namespace by using “dotted module names”
- the module name `A.B` designates a sub module named `B` in a package named `A`
- The `__init__.py` files are required to make Python treat directories containing the file as packages
- individual packages can be imported like this `import sound.effects.echo`


### 6.4.1. Importing * From a Package

- importing sub-modules might have unwanted side-effects that should only happen when the sub-module is explicitly imported
- he only solution is for the package author to provide an explicit index of the package

- `__all__` in `__init__.py` defines which sub modules to import when using `from package import *`.
  - Example: `__all__ = ["echo", "surround", "reverse"]` imports `echo`, `surround`, `reverse`.
  - Locally defined names in `__init__.py` can shadow sub modules (e.g., a `reverse` function can hide `reverse.py`).

- If `__all__` is not set, `from package import *` only imports:
  - Names defined in `__init__.py`.
  - Sub modules explicitly loaded previously.

- Using `import *` is discouraged in production; prefer `from package import specific_submodule`.

### 6.4.2. `Intra-package` References

- **Absolute Imports**: Refer to sub modules using the full path.
  - Example: `from sound.effects import echo` (used in `sound.filters.vocoder` to access `echo`).

- **Relative Imports**: Use leading dots to refer to current or parent packages.
  - Examples in `sound.effects.surround`:
    - `from . import echo` (imports sibling module `echo`).
    - `from .. import formats` (imports from parent package).
    - `from ..filters import equalizer` (imports `equalizer` from sibling subpackage).

- **Main Module Restriction**: Relative imports do not work in modules run as `__main__`; use absolute imports instead.
### 6.4.3. Packages in Multiple Directories

- **`__path__` Attribute**: A list of directory names containing the package's `__init__.py`.
  - Initialized before `__init__.py` code runs.
  - Can be modified to change future searches for modules/subpackages in the package.

- **Use Case**: Rarely needed, but allows extending the set of modules found in a package.


# 7. Input and Output

There are several ways to present the output of a program; data can be printed in a human-readable form, or written to a file for future use. This chapter will discuss some of the possibilities.

## 7.1. Fancier Output Formatting

- we can use f-strings to format output data 
- `"The sum of 1 + 2 is {0}".format(1+2)` then we have `str.format()`
- you can convert any value to a string with the `repr()` or `str()` functions

### 7.1.1. Formatted String Literals

- also called f-strings for short
- an optional format specifier can follow the expression

```python
print(f'The value of pi is approximately {math.pi:.3f}.')
```

- other modifiers can be used to convert the value before it is formatted

```python
# Variable containing a string with a non-ASCII character.
animals = 'éels'

# Using an f-string without any modifier; it defaults to using str().
# This will print the value of 'animals' as it is.
print(f'Without modifier: {animals}')  
# Output: Without modifier: éels

# Using the !s modifier to explicitly convert using str().
# This is functionally the same as the default and shows the value as a simple string.
print(f'With !s: {animals!s}')         
# Output: With !s: éels

# Using the !r modifier to convert using repr().
# This will show the official string representation, including quotes around the value.
print(f'With !r: {animals!r}')         
# Output: With !r: 'éels'

# Using the !a modifier to convert using ascii().
# This converts any non-ASCII characters to escape sequences.
print(f'With !a: {animals!a}')         
# Output: With !a: '\xe9els'

```

- you can use `=` in `f-strings`

```python
# Define some variables
x = 42
name = 'Alice'
score = 95.5

# Use f-strings with the '=' sign to automatically show both the expression and its value.
print(f'{x=}')             # Outputs: x=42
print(f'{name=}')           # Outputs: name='Alice'
print(f'{score=}')          # Outputs: score=95.5

# You can also use it with expressions directly.
print(f'{x + 10=}')         # Outputs: x + 10=52
print(f'{name.upper()=}')   # Outputs: name.upper()='ALICE'
print(f'{score > 90=}')     # Outputs: score > 90=True

# It works inside larger strings too.
print(f'The result of x + 10 is {x + 10=}.')  # Outputs: The result of x + 10 is x + 10=52.

```

### 7.1.2. The String format() Method

```python
print('We are the {} who say "{}!"'.format('knights', 'Ni'))
print('{0} and {1}'.format('spam', 'eggs'))
```

### 7.1.3. Manual String Formatting

- `.rjust(n)` method will pad the output with n amount of white spaces

### 7.1.4. Old string formatting

```python
print('The value of pi is approximately %5.3f.' % math.pi)
```

- this old better if not used

## 7.2. Reading and Writing Files

```python
f = open('workfile.txt', 'w', encoding="utf-8")
```

- open returns a file object
- first argument if filename
- second is mode
	- `r` is read mode
	- `w` is write mode (**an existing file with the same name will be erased**)
	- `a` is used for appending 
	- `r+` will both read and write 
	- `rb+` is for reading and writing but in binary format
- if encoding is not specified default will be used
- in text mode, reading converts platform-specific line endings to `\n`, and writing converts `\n` back to platform-specific endings. This is fine for text files but can corrupt binary data, so use binary mode for non-text files.
- it is good practice to use the `with` keyword, advantage is that the file is properly closed after its suite finishes, even if an exception is raised at some point
- if you are not using `with` remember to close it with `f.close`
- *calling `f.write()` without using the `with` keyword or calling `f.close()` **might** result in the arguments of `f.write()` not being completely written to the disk, even if the program exits successfully.*

### 7.2.1. Methods of File Objects

```python
# Example code demonstrating various file operations in Python

# Assuming 'f' is an already opened file object

# Read the entire content of the file
content = f.read()
# Returns the entire file content as a string (in text mode) or bytes object (in binary mode)
# If file is empty, it returns an empty string ('')
print(content)

# Read the next chunk of the file after the previous read
content = f.read()
# If the file has been fully read, it will return an empty string
print(content)

# Read a single line from the file, including the newline character at the end
line1 = f.readline()
print(line1)  # Example: 'This is the first line of the file.\n'

line2 = f.readline()
print(line2)  # Example: 'Second line of the file\n'

# Reading a blank line, will return '\n'
line3 = f.readline()
print(line3)  # Output: ''

# Looping over the file object to read lines one by one
for line in f:
    print(line, end='')  # Using end='' to avoid adding an extra newline

# Read all lines at once and store them in a list
lines = list(f)
print(lines)

# Alternatively, you can use f.readlines() to achieve the same
lines = f.readlines()
print(lines)

# Write a string to the file
chars_written = f.write('This is a test\n')
# f.write() returns the number of characters written
print(chars_written)  # Example: 15

# Converting other types to string before writing them
value = ('the answer', 42)
s = str(value)  # Convert tuple to string
chars_written = f.write(s)
print(chars_written)  # Example: 18

# Get the current position of the file pointer
current_pos = f.tell()
print(current_pos)

# Change the file pointer's position using seek()
# Move to the 6th byte (offset 5) from the beginning of the file
f.seek(5)
print(f.read(1))  # Example: b'5'

# Move 3 bytes backwards from the end of the file
f.seek(-3, 2)
print(f.read(1))  # Example: b'd'

# In binary mode, you can seek to any position using offsets
# In text mode, seeking can only be done relative to the beginning of the file or the end (using seek(0, 2))

# For text files, using f.seek() with offsets not returned by f.tell() may cause undefined behavior

# Additional file methods
# Check if the file is attached to a terminal (useful for interactive programs)
is_tty = f.isatty()
print(is_tty)

# Truncate the file at the current position (removes any data after the pointer)
f.truncate()

```



- **`f.read(size)`**: Reads the specified number of bytes or characters from the file, returning the entire file if no size is provided.

- **`f.readline()`**: Reads a single line from the file, including the newline character (`\n`).

- **Looping over file object**: Reads the file line by line efficiently, reducing memory usage compared to reading the entire file.

- **`f.write(string)`**: Writes the provided string to the file.

- **`f.tell()`**: Returns the current position of the file pointer within the file.

- **`f.seek(offset, whence)`**: Moves the file pointer to a new position based on the offset and reference point (whence).

- **`f.isatty()`**: Checks if the file is connected to a terminal or interactive session.

- **`f.truncate()`**: Removes data from the current file pointer position to the end of the file.


### 7.2.2. Saving structured data with `json`

- when you want to save more complex data types like nested lists and dictionaries, parsing and serializing by hand becomes complicated.
- the process of converting a Python object (like a list, dictionary, or custom object) into a format that can be saved to a file or sent over a network is called `Serialization`
- format is often a byte stream or a text format like `JSON`
	- **`pickle`**: Converts Python objects to a byte stream and vice versa.
	- **`json`**: Converts Python objects (mainly simple ones like strings, numbers, lists, and dictionaries) to a `JSON` string and vice versa.
- the `JSON` format is commonly used by modern applications to allow for data exchange. Many programmers are already familiar with it, which makes it a good choice for interoperability.

- `JSON` Serialization:  You can serialize a Python object to a `JSON` string using the `json.dumps()` function.

- Saving to a `JSON` file:  Use `json.dump()` to serialize the object and save it directly to a text file.

- Reading from a `JSON` file:  Use `json.load()` to de-serialize the `JSON` data back into a Python object.

- Note:  `JSON` files must be encoded in `UTF-8`.

- Limitations of JSON:  `JSON` can handle simple Python objects like lists and dictionaries, but serializing complex Python class instances requires extra effort.

- Pickle Module:  Unlike `JSON`, the `pickle` module allows the serialization of more complex Python objects, including arbitrary class instances. However, it is **Python-specific** and **insecure** by default when loading data from un-trusted sources, as it can execute arbitrary code during de-serialization.



```python
import json

x = [1, 'simple', 'list']
json.dumps(x)  # Output: '[1, "simple", "list"]'

with open('data.json', 'w', encoding='utf-8') as f:
    json.dump(x, f)

with open('data.json', 'r', encoding='utf-8') as f:
    x = json.load(f)

import pickle

# Python object
data = {'name': 'Alice', 'age': 30}

# Serialize and save to a file
with open('data.pkl', 'wb') as f:
    pickle.dump(data, f)

# Deserialize from the file
with open('data.pkl', 'rb') as f:
    loaded_data = pickle.load(f)

print(loaded_data)  # Output: {'name': 'Alice', 'age': 30}

```

# 8. Errors and Exceptions

There are (at least) two distinguishable kinds of errors: _syntax errors_ and _exceptions_.

## 8.1. Syntax Errors

- syntax errors are also known as parsing errors
- parser repeats the offending line and displays little ‘arrow’s pointing at the token in the line where the error was detected
- file name and line number are printed so you know where to look in case the input came from a script
## 8.2. Exceptions

- if a statement or expression is syntactically correct, it may cause an error when an attempt is made to execute it
- errors detected during execution are called _exceptions_ and are not unconditionally fatal
- the last line of the error message indicates what happened

## 8.3. Handling Exceptions

- It is possible to write programs that handle selected exceptions


```python
while True:
    try:
        x = int(input("Please enter a number: "))
        break
    except ValueError:
        print("Oops!  That was no valid number.  Try again...")
```


- Try Clause: The statements between the `try` and `except` keywords are executed first.
- No Exception: If no exception occurs, the `except` clause is skipped, and execution proceeds after the `try/except` block.
- Exception Occurs: If an exception occurs:
	- If the exception type matches the one in the `except` clause, the `except` block is executed.
	- After the `except` block, execution continues after the `try/except` block.
- `Unhandled` Exceptions: If the exception does not match the `except` clause, it is passed on to outer `try` statements. If no handler is found, the exception is un-handled, and execution stops with an error message.
- try statement may have more than one _except clause_, to specify handlers for different exceptions


- **Order of `except` Clauses:**
    
    - The order of `except` clauses matters; the first matching clause is triggered.
    - If more general exceptions are placed before specific ones, they may unintentionally catch exceptions meant for later clauses.
- **Exception Arguments:**
    
    - Exceptions can have associated values called arguments.
    - The arguments' presence and types depend on the exception type.
    - The variable after the exception name in an `except` clause is bound to the exception instance, which usually has an `.args` attribute storing the arguments.
    - Built-in exceptions use `__str__()` to display arguments without direct access to `.args`.
- **Base Classes for Exceptions:**
    
    - `BaseException` is the root class of all exceptions.
    - `Exception` is a subclass of `BaseException` and the base for non-fatal exceptions.
    - Exceptions not subclassed from `Exception` (e.g., `SystemExit`, `KeyboardInterrupt`) typically signal the program should terminate.
- **Handling Exceptions:**
    
    - `Exception` can be used as a general catch-all, but it's better practice to catch specific exception types.
    - A common pattern: handle an exception, then re-raise it for further handling by the caller.
- **Optional `else` Clause:**
    
    - The `else` clause follows all `except` clauses and executes only if no exception is raised in the `try` block.
    - Using `else` helps avoid catching unexpected exceptions from code not intended to be protected by the `try` block.
- **Scope of Exception Handling:**
    
    - Exceptions caught in a `try` block include those raised inside called functions, not just those directly in the block.

```python
import sys

# 1. **Order of `except` Clauses** - Showing the importance of exception order.
try:
    # Code that might raise an exception
    raise ValueError("An example value error")
except ValueError as e:
    # Specific exception caught first
    print("Caught a ValueError:", e)
except Exception as e:
    # General exception would catch everything if placed first
    print("This will catch all exceptions (general handler):", e)


# 2. **Exception Arguments** - Handling an exception and unpacking its arguments.
try:
    raise Exception('spam', 'eggs')
except Exception as inst:
    print(type(inst))       # Output: <class 'Exception'>
    print(inst.args)        # Output: ('spam', 'eggs')
    print(inst)             # Output: ('spam', 'eggs')

    # Unpack args
    x, y = inst.args
    print('x =', x)         # Output: x = spam
    print('y =', y)         # Output: y = eggs


# 3. **Handling Specific Exceptions** - Using specific `except` blocks.
try:
    # Attempt to open a file and read an integer
    f = open('myfile.txt')
    s = f.readline()
    i = int(s.strip())
except OSError as err:
    print("OS error:", err)
except ValueError:
    print("Could not convert data to an integer.")
except Exception as err:
    # General handler for unexpected exceptions
    print(f"Unexpected {err=}, {type(err)=}")
    raise  # Re-raise the exception for further handling


# 4. **Using `else` Clause** - Demonstrating the `else` clause in exception handling.
for arg in sys.argv[1:]:
    try:
        f = open(arg, 'r')
    except OSError:
        print('cannot open', arg)
    else:
        print(arg, 'has', len(f.readlines()), 'lines')
        f.close()


# 5. **Scope of Exception Handling** - Catching exceptions raised in nested functions.
def this_fails():
    x = 1 / 0  # This will raise a ZeroDivisionError

try:
    this_fails()
except ZeroDivisionError as err:
    print('Handling run-time error:', err)
    # Output: Handling run-time error: division by zero

```


## 8.4. Raising Exceptions

- the `raise` statement allows the programmer to force a specified exception to occur
- either an exception instance or an exception class
- you can pass messages as arguments
- shorten the error name by removing `()`

```python
raise NameError('HiThere')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
    raise NameError('HiThere')
NameError: HiThere

raise ValueError  # shorthand for 'raise ValueError()'
raise NameError('HiThere')

```


## 8.5. Exception Chaining

- an un-handled exception occurs inside an `except` section will have the exception being handled attached to it and included in the error message
- To indicate that an exception is a direct consequence of another `raise RuntimeError from exc`

## 8.6. User-defined Exceptions

- programs may name their own exceptions by creating a new exception class
- exceptions should typically be derived from the `Exception` class
- classes can be defined which do anything any other class can do, but are usually kept simple
- exceptions are defined with names that end in “Error”

## 8.7. Defining Clean-up Actions

- `finally` statements will run no matter what

- If an exception occurs during execution of the `try` clause, the exception may be handled by an `except` clause. If the exception is not handled by an `except` clause, the exception is re-raised after the `finally` clause has been executed.
- An exception could occur during execution of an `except` or `else` clause. Again, the exception is re-raised after the `finally` clause has been executed.
- If the `finally` clause executes a `break`, `continue` or `return` statement, exceptions are not re-raised.
- If the `try` statement reaches a `break`, `continue` or `return` statement, the `finally` clause will execute just prior to the `break`, `continue` or `return` statement’s execution.
- If a `finally` clause includes a `return` statement, the returned value will be the one from the `finally` clause’s `return` statement, not the value from the `try` clause’s `return` statement.

```python
def divide(x, y):
    try:
        result = x / y
    except ZeroDivisionError:
        print("division by zero!")
    else:
        print("result is", result)
    finally:
        print("executing finally clause")

divide(2, 1)
result is 2.0
executing finally clause

divide(2, 0)
division by zero!
executing finally clause

divide("2", "1")
executing finally clause
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
    divide("2", "1")
    ~~~~~~^^^^^^^^^^
  File "<stdin>", line 3, in divide
    result = x / y
             ~~^~~
TypeError: unsupported operand type(s) for /: 'str' and 'str'
```


## 8.8. Predefined Clean-up Actions

- Some objects define standard clean-up actions to be undertaken when the object is no longer needed, regardless of whether or not the operation using the object succeeded or failed

- with statement allows objects like files to be used in a way that ensures they are always cleaned up promptly and correctly

## 8.9. Raising and Handling Multiple Unrelated Exceptions

- often the case in concurrency frameworks, when several tasks may have failed in parallel
- other use cases where it is desirable to continue execution and collect multiple errors rather than raise the first exception

```python
def f():

    excs = [OSError('error 1'), SystemError('error 2')]

    raise ExceptionGroup('there were problems', excs)

f()
  + Exception Group Traceback (most recent call last):
  |   File "<stdin>", line 1, in <module>
  |     f()
  |     ~^^
  |   File "<stdin>", line 3, in f
  |     raise ExceptionGroup('there were problems', excs)
  | ExceptionGroup: there were problems (2 sub-exceptions)
  +-+---------------- 1 ----------------
    | OSError: error 1
    +---------------- 2 ----------------
    | SystemError: error 2
    +------------------------------------

try:

    f()

except Exception as e:

    print(f'caught {type(e)}: e')

caught <class 'ExceptionGroup'>: e
```

- by using `except*` instead of `except`, we can selectively handle only the exceptions in the group that match a certain type
- Note that the exceptions nested in an exception group must be instances, not types
- because in practice the exceptions would typically be ones that have already been raised and caught by the program

## 8.10. Enriching Exceptions with Notes

- **Enriching Exceptions:**
  - Exceptions can be initialized with descriptive information.
  - Additional information can be added after catching using `add_note(note)`.
  - Notes are displayed in traceback in the order they were added.

- **Usage Example - Single Exception:**
  - `add_note` can provide more context about the error after it’s caught.

- **Exception Groups:**
  - Useful for handling multiple related errors.
  - Each exception in a group can have notes added for context (e.g., iteration info).
  - Exception groups show detailed traceback for each sub-exception.

- **Context Enhancement:**
  - Adding context is helpful when grouping exceptions to understand individual errors.


```python
# 1. **Enriching Exceptions** - Adding notes to exceptions after they are caught.
try:
    raise TypeError('bad type')
except Exception as e:
    e.add_note('Add some information')
    e.add_note('Add some more information')
    raise

# Example of exception group handling with notes added for context

def f():
    raise OSError('operation failed')

excs = []

for i in range(3):
    try:
        f()
    except Exception as e:
        e.add_note(f'Happened in Iteration {i+1}')
        excs.append(e)

# Raising an ExceptionGroup to group the exceptions
raise ExceptionGroup('We have some problems', excs)

```


# 9. Classes

- Classes provide a means of bundling data and functionality together
- a new class creates a new _type_ of object, allowing new _instances_ of that type to be made
- class instance can have attributes attached to it for maintaining its state
- instances can also have methods (defined by its class) for modifying its state
- classes provide all the standard features of Object Oriented Programming
	- class inheritance mechanism allows multiple base classes
	- a derived class can override any methods of its base class or classes
	- a method can call the method of a base class with the same name
- Objects can contain arbitrary amounts and kinds of data. As is true for modules, classes partake of the dynamic nature of Python
- classes themselves are objects

## 9.1. A Word About Names and Objects

aliasing allows multiple names to reference the same object, which can be beneficial for mutable objects, as changes to them are reflected across all aliases, making passing arguments efficient.

```python
# Aliasing with mutable objects
a = [1, 2, 3]
b = a  # b is an alias of a
b.append(4)  # Modify through b
print(a)  # Output: [1, 2, 3, 4] (a is affected because b and a point to the same list)
```

## 9.2. Python Scopes and Namespaces

- A _namespace_ is a mapping from names to objects
- Most namespaces are currently implemented as Python dictionaries, but that’s normally not noticeable in any way (except for performance)
- The important thing to know about namespaces is that there is absolutely no relation between names in different namespaces; for instance, two different modules may both define a function `maximize` without confusion — users of the modules must prefix it with the module name
- use the word _attribute_ for any name following a dot — for example, in the expression `z.real`, `real` is an attribute of the object `z`
- Namespaces are created at different moments and have different lifetimes
	- namespace containing the built-in names is created when the Python interpreter starts up, and is never deleted
	- global namespace for a module is created when the module definition is read in
	- normally, module namespaces also last until the interpreter quit
- local namespace for a function is created when the function is called, and deleted when the function returns or raises an exception that is not handled within the function
- A _scope_ is a textual region of a Python program where a namespace is directly accessible. “Directly accessible” here means that an unqualified reference to a name attempts to find the name in the namespace.
- scopes are determined statically, they are used dynamically
- At any time during execution, there are 3 or 4 nested scopes whose namespaces are directly accessible
	- the innermost scope, which is searched first, contains the local names
	- he scopes of any enclosing functions, which are searched starting with the nearest enclosing scope, contain non-local, but also non-global names
	- he next-to-last scope contains the current module’s global names
	- the outermost scope (searched last) is the namespace containing built-in names
- If a name is declared global, references and assignments go to the module’s global scope.
- The nonlocal statement can be used to rebind variables in outer but non-global scopes; otherwise, they are read-only.
- The local scope typically references the current function's local names or the module’s global namespace outside functions.
- Class definitions introduce another namespace in the local scope.
- Scopes are determined textually, with a function’s global scope being the module's namespace, regardless of how the function is called.
- Name resolution is dynamic at runtime, but the language is moving toward static resolution at compile time.
- Assignments always go into the innermost scope, and they bind names to objects without copying data.
- The del statement removes a name binding from the current namespace.
- Operations that introduce new names (e.g., imports, function definitions) use the local scope.
- The global statement rebinds variables to the global scope, while the nonlocal statement rebinds variables to an enclosing scope.

### 9.2.1. Scopes and Namespaces Example

```python
def scope_test():
    def do_local():
        spam = "local spam"

    def do_nonlocal():
        nonlocal spam
        spam = "nonlocal spam"

    def do_global():
        global spam
        spam = "global spam"

    spam = "test spam"
    do_local()
    print("After local assignment:", spam)
    do_nonlocal()
    print("After nonlocal assignment:", spam)
    do_global()
    print("After global assignment:", spam)

scope_test()
print("In global scope:", spam)

#After local assignment: test spam
#After nonlocal assignment: nonlocal spam
#After global assignment: nonlocal spam
#In global scope: global spam
```



## 9.3. A First Look at Classes

Classes introduce a little bit of new syntax, three new object types, and some new semantics.

### 9.3.1. Class Definition Syntax


so basically this is **bold** text 