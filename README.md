# React Flex Layout

React components for creating responsive flex layout inspired by [@angular/flex-layout](https://github.com/angular/flex-layout)

## Install

```
npm i -s react-flexylayout
```

## API

The api provides 3 components: **FlexProvider, FlexRow, , FlexItem**

`FlexProvider` is just the simple provider you need to wrap around

`FlexRow` is the row or container around your items

`FlexItem` is a single item inside a FlexRow

#### FlexRow properties

- **layout**: Defines the flow order of child items within a flexbox container
  `<FlexRow layout="row" />`
- **gap**: Defines if child items within a flexbox container should have a gap
  `<FlexRow gap="10px" />`
- **align**: Defines how flexbox items are aligned according to both the main-axis and the cross-axis, within a flexbox container `<FlexRow align="flex-start stretch" />`

#### FlexItem properties

- **size**: This markup specifies the resizing of its host element within a flexbox container flow `<FlexItem size="50%" />`
- **align**: Defines how flexbox items are aligned according to both the main-axis and the cross-axis, within a flexbox container `<FlexItem align="flex-start stretch" />`
- **offset**: Offset a flexbox item in its parent container flow layout `<FlexItem offset="15px" />`
- **order**: Defines the order of a flexbox item `<FlexItem order="2" />`
- **fill**: Maximizes width and height of element in a layout container `<FlexItem fill />`

### Responsive API

Out of the box the componet provides fallowing breakpoints

- **xs**: "screen and (max-width: 599px)"
- **sm**: "screen and (min-width: 600px) and (max-width: 959px)"
- **md**: "screen and (min-width: 960px) and (max-width: 1279px)"
- **lg**: "screen and (min-width: 1280px) and (max-width: 1919px)"
- **xl**: "screen and (min-width: 1920px) and (max-width: 5000px)"

All props have according responsive version, when responsive version is not provided it uses default one.
The sintaxis for those properties is `[prop][breakpoint]` like so `sizeXs` **_( notice the uppercase of the breakpoint )_**

Example:
`<FlexItem size="50%" sizeXs="100%" sizeXl="25%" />`

## Example

```
import { FlexRow, FlexProvider, FlexItem } from "react-flexlayout";

function App() {
  return (
      <FlexProvider>
        <FlexRow layout="row wrap" gap="10px">
          <FlexItem size="80px" sizeXs="50%" order="2" orderXs="1">
            Item 1
          </FlexItem>
          <FlexItem size="80px" sizeXs="50%" order="1" orderXs="2">
            Item 2
          </FlexItem>
          <FlexItem size="50px" sizeXs="50%" align="end">
            Item 3
          </FlexItem>
        </FlexRow>
      </FlexProvider>
  );
}
```

## Custom breakpoints

You can provide a config object to specify custom sizes and names for your media query breakpoints:

- **queries**: Object containign media queries
- **behaviour**: One of "replace" or "overrider", the default is replace.
  - **override** the whole default media queries has been overrided.
  - **replace** Its only update / append new media queries to default ones

## Example

```
const config = {
  queries: {
    xs: "screen and (max-width: 700px)",
    sm: "screen and (min-width: 701px) and (max-width: 959px)",
  },
  behaviour: "replace",
};

<FlexProvider config={config}>
 <App />
</FlexProvider>
```

## ToDo

- Add types
