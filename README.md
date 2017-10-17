# Ninjagoat-messages

## Introduction
A ninjagoat "toast like" messages presenter module.

## Installation

`
$ npm install ninjagoat-messages
`

Add this code to the bootstrapper.ts file:

```typescript
import {MessagesModule} from "ninjagoat-messages"

application.register(new MessagesModule());
```


Bind the messages service to the Master view:

```typescript
import {NinjagoatMessages} from "ninjagoat-messages";

class MasterView extends View<MasterViewModel> {

    render() {
        <div>
            {this.props.children}
                <NinjagoatMessages/>
        </div>
    }
}
```

and include the style to the bootstrapper.scss:

```scss
@import "../node_modules/ninjagoat-messages/styles/index";
```

## Usage

There three types of messages:

*Success*:
```typescript
messageService.success("Your messages to display!");
```

*Info*:
```typescript
messageService.info("Your info messages to display!");
```

*and Failure*:
```typescript
messageService.failure("Your failure messages to display!");
```

By default the *success* message will disappear after 5 seconds (defined via default configuration),
or you may specify a custom timeout:
```typescript
messageService.success("Your messages to display!", 7000);
```

If not otherwise specified, *failure* messages will stay on screen until the user dismisses them.

### Default configuration
The module provides a default initial configuration where the messages position and default timeout are set:

```typescript
class DefaultConfig implements IMessagesConfig {
    timeout = 5000;
    position = {
        vertical: "bottom",
        horizontal: "center"
    };
}
```

## Style
It is possible to customize the close button color using this variables:
```scss
$snackbar-btn-success-color: #3c763d !default;
$snackbar-btn-error-color: #a94442 !default;
$snackbar-btn-info-color: #2E96D6 !default;
```


## License

Copyright 2017 Tierra SpA

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
