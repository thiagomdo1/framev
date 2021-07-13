# framev

## Send and receive data across iframes.

[![npm version](https://badge.fury.io/js/framev.svg)](https://badge.fury.io/js/framev)

## Installation

```sh
npm i framev
```

## Usage

Import framev:

```ts
import { Framev } from "framev";
```

Or add it via script tag:

```ts
<script src="framev.js" />
```

Events can be created with the Framev constructor as follows:

Emitting an event:

```ts
const framev = new Framev();
framev.emit("helloworld", "Hello world"); 

// sending objects
framev.emit("helloworld2", {message: "Hello world"});
```

Receiving an event:

```ts
const framev = new Framev();
framev.on("helloworld", (message) => {
  console.log(message);
});
```

To remove a subscription:

```ts
framev.off("helloworld");
```