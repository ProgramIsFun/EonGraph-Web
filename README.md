# force-graph-visualizer-and-editor

## dev log

https://github.com/ProgramIsFun/force-graph-visualizer-and-editor/blob/8036c6306726cad4b7c1bd167d0bd16681f2a6d1/client/package.json#L25 Using a modified version because https://github.com/vasturiano/react-force-graph/issues/582#issuecomment-2978644840      https://github.com/everythingallaccount/to-do-/issues/16 

## What is this project?

project aims to provide an editing and visualizations of a forced directed graph.

## Introduction
In very simple English, this project is for you to edit a graph in a 2D space, and you can also visualize the graph in a 3D space.

There will be function to export the graph in a Json format . 

You can also import the graph in a Json format.

Every node in the graph is either a very simple plain text node, with only a name, or a GitHub repository node, which contains a lot of properties.

The graph is a force-directed graph, which means that the nodes will be repelled by each other, and the links will be attracted to each other.

This project originally want to make me organize all my projects and repositories in Github in a graph, so that it is more intuitive to see the relationship between them.

## Screenshot

![image](https://github.com/user-attachments/assets/3461010f-0639-4f52-96f7-2ec6c781ad48)


## How to run in dev mode
1. clone the repo

2.

if u dont use docker, you can run the app by running the following command in client directory:

- `yarn`

- `yarn start`

if u use docker, ignore step 2a, and you can run the app by running the following command in root directory:
- `docker-compose up --build`

3. then go to localhost:3000 to see the website

4. if you are using electron. you can run the following command in client directory:

- `yarn e`


## 

https://github.com/ProgramIsFun/github-repos-visualizer

## a quick try on the build
https://gitvisual-7d9a8.web.app



## How to use

play around with the button there

## how to deploy
- just init firebase hosting and deploy it very easily.

## screenshot

![image](https://user-images.githubusercontent.com/36737465/172355032-eda62d9d-a8e7-4b80-bb13-5b4e2a4dd4ac.png)

![image](https://user-images.githubusercontent.com/36737465/172355198-f20ab886-21ac-4dac-a876-4ecc1053d693.png)
