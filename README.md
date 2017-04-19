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


And bind the messages service to the Master view:

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


## Usage

There two types of messages, *Success*:
```typescript
messageService.success("Your messages to display!", "Headline Title");
```

and *Failure*:
```typescript
messageService.failure("Your failure messages to display!", "Headline Title");
```

By default the *success* message will disappear after 5 seconds (defined via default configuration),
or you may specify a custom timeout:
```typescript
messageService.success("Your messages to display!", "Headline Title", 7000);
```

If not otherwise specified, *failure* messages will stay on screen until the user dismisses them.

### Default configuration
The module provides a default initial configuration where the messages position and default timeout are set:

```typescript
class DefaultConfig implements IMessagesConfig {
    timeout = 5000;
    position = MessagePosition.topRight;
}
```

## Style
It is possible to customize the looks of the messages.
Here is an example of a base style template:
```css
.alert {
    padding: 15px;
    margin-bottom: 20px;
    border: 1px solid transparent;
    border-radius: 4px;
}

.alert-dismissible {
    padding-right: 35px;
}

/*
 * success messages
 */
.alert-success {
    color: #3c763d;
    background-color: #dff0d8;
    border-color: #d6e9c6;
}

/*
 * failure messages
 */
.alert-danger {
    color: #a94442;
    background-color: #f2dede;
    border-color: #ebccd1;
}
}
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
