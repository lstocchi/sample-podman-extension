# Sample podman extension

This extension has been created for a POC related to the onboarding of an extension in Podman Desktop (PD).

The idea is that by providing a JSON schema in the extension package.json that describe how the onboarding should work, PD would be able to interpret it and transform JSON into actual code.

An onboarding workflow can be useful to install some tools when the extension is installed or to update some settings or to explain how the extension works.

The onboarding has a title and a list of steps. It may also have an image and a description.
Only one onboarding workflow is allowed per extension.

```
"onboarding": {
      "title": <string>, // the title that is displayed on the top left of the onboarding workflwo page
      "media": {  // the media that is displayed on the top left of the onboarding workflwo page, left the title
        "path": <string>,
        "altText": <string>
      },
      "description": <string>, // the title that is displayed on the top left of the onboarding workflwo page, below the title
      "steps": [
        ...
      ]
}
```

Each step consists of an id, a title, an order, if it's skippable, the list of commands that can be invoked during its execution and a list of views.

Each step command must be registered beforehand by the extension.
Each command can provide the list of args (string) that are expected as input and its response. 
The response has this structure

```
"response": {
    "status": "failed" || "ok",
    "body": <any>
}
```

An example of command

```
{
    "id": "checkPodmanRequirements",
    "command": "sample-podman-extension.onboarding.checkPodmanRequirements", // this is the command id that has been used for register
    "response": {
        "status": "string",
        "body": {
            "warningsMarkdown": "string"
        }
    }
},
```

A view can be thought like a substep and its main role is to provide the actual content/items to be displayed during the onboarding and when this is considered completed and the user is allowed to step forward. 

### Example

Let's think at a step that install something - "Install X". 
It could contains 4 views. The first to check the system requirements, the second (optional - only if the first view fails) to show the error, the third to install X, the fourth to give a feedback about the installation.


The structure of a view is 

```
"id": <string>,
"title": <string>,
"description": <string>,
"media": {
    "path": <string>,
    "altText": <string>
},
"enableCompletionEvents": [ // when the button next can be enabled. E.g after a checkbox is selected
    <string>
],
"completionEvents": [ // when the view must be considered completed and the user can go to the next
    <string>
],
"order": number,
"commandAtActivation": [ // these are the commands that are executed when the view is displayed and do not require any user input
    {
        "command": <string>, //the id of the command defined by the step 
        "order": number                  
    }
],
"isSkippable": boolean //if the view can be skipped
"content": [ // the actual content, read below
    ...
]
```

The content of a view is the property that contains the actual content that will be interpreted and rendered by PD.
When creating the content of a view you can think at the page like a grid.
You must then define what each row and each column contain.

Each item is a component. This POC currently supports these different kind of components button, text, radiogroup and checkbox_card.

```
"content": [
    {
        "row": 1, // this defines the element in the first row
        "items": [ // each item represent the content of a square. The first item in the list define the element at (row 1, col 1), the second (row 1, col 2) ....
            { 
                "label": "Check requirements again", //the label displayed
                "value": "onCommand:recheckPodmanRequirements", //it will call this method when clicked
                "component": "button"
            },
            {
                "id": "kind_opt",
                "title": "Kind",
                "subtitle": "Experimental support",
                "media": {
                    "path": "media/onboarding/kind-logo.png",
                    "altText": "k8s logo"
                },
                "body": "Run a local Kubernetes cluster using containers as nodes. Useful for local development and testing Kubernetes.",
                "checkbox": "Set up Kind now",
                "component": "checkbox_card"
            }
        ]
    }
]
```

PD also stores of all inputs provided by the user so that they can be reused by next views.
So if you select a checkbox at view 1, you can display its content at step 3 by defining the right placeholder `<event_name>:<step>.<view>.<input>.<field>` -> `onRadioSelected:sampleChoiceSetup.kubernetesSetup.k8s_options.title`

A working example of an onboarding workflow can be found [here](https://github.com/lstocchi/sample-podman-extension/blob/main/package.json#L47 )