# Database Vocab

## DBMS

*Database management system*

Something that handles the data on the computer-end
Manage data tables, specify foreign keys, other stuff

For example, MySQL, Postgres

The thing (a program) that actually manages the data

"SQL"

## Query language

For example, SQL

## Database

"SQL"

Something that stores data
- My brain
- Phone book
- DNA
- The universe?
- Our wikistack database

Accessible and persistent
- Accesible to a computer
- RAM is not persisten, not a database
- Passes the "hard reset" test

Structured data
- Data that can be identifiable
- Can be easily ("quickly") access and retrieved
- Possibly indexable, if so queries can be MUCH faster
- NOT files (sort of)
- Tied to querying

"Flatfile databse" — just files

## Relation

Connecting piece of data. For example let's say we've got users table and comments table. The users table might have a relation to the comments table through some id.

Not a relation. Better termed "association"/"relationship".

A relation is a table. That's it.

## Analogy

Database : phonebook :: DBMS : you

## Query

The DOM:

```js
document.findElementById()
```

```sql
SELECT * FROM users;
```

## Query plan

A todo list for a query that HAS NOT RUN YET.

query: "GET CEREAL"
query plan: "GO TO KITCHEN, POUR INTO BOWL, RETURN TO OMRI"

Queries are often declarative, but ultimately machines need imperative commands.

## Maintain a database

Dealing with indexes, dealing with permissions, dealing with scale.

---

# The workshop

You'll be building DMBS in Javascript.

## Data
You've got json files inside a folder. Think of each json file as a row. The folder that contains it is a table. The folder that contains a table folder is a database.

## Classes
- `Table`
- `FQL`
- `Plan`

## Logistics
- Pair up
- Work on parts I and II, stop at 1:00
- Review for parts 1:00-1:30
- Work on parts III and IV, 3:00-5:00
- Review for parts III and I 5:00-5:30

---

# Javascript

## Static methods (class methods)

Something should be a class method if it DOES NOT NEED an instance.

Perfect example: `Object.keys`.

```js
Thing.find = function () {};

function Thing () {
  this.find = function () {}; // nonexample of static/class method
}
var thingB = new Thing() {};
thingB.find(); // yay!
Thing.find(); // ERROR
```

## Instance methods

Something should be an instance method if it DOES NEED an instance.

Prototype method

```js
function Thing () {}
Thing.prototype.doStuff = function () {...};
var thingA = new Thing();
thingA.doStuff();
// thingA.doStuff() is an instance method
console.log(Thing.doStuff); // undefined
Thing.doStuff(); // ERROR
```

## `JSON.parse`

Takes a string and returns an object.

## `JSON.stringify`

Takes an object and returns a string.

## File system

We're going to be using synchronous methos to access the file system. `fs.readFileSync`, `fs.readdirSync`, that kind of thing
