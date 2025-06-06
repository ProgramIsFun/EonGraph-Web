# force-graph-visualizer-and-editor

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

1. You need to have a firebase project. Grab the credentials from the website. 
   go to client/src/firebase/config1_Example.js, replace credentials with your own firebase credentials.  Rename the file into config1.js.

   (make sure firestore is enabled)
   (make sure firebase github auth is enabled ( ref https://firebase.google.com/docs/auth/web/github-auth ), firebase will specify the callback url that YOU HAVE TO SET IN GITHUB OAUTH APP )
   (for my ref https://github.com/ProgramIsFun/github-repos-visualizer/blob/347604b23cc839086caa4dda1d1c0386a5fc5461/client/src/firebase/firebase.js#L16)

2a. if u dont use docker, you can run the app by running the following command in client directory:

- `yarn`

- `yarn start`


2b.if u use docker, ignore step 2a, and you can run the app by running the following command in root directory:

- `docker-compose up --build`
  ~~
  ~~
  3.then go to localhost:3000 to see the website

4.if you are using electron. you can run the following command in client directory:

- `yarn e`


## 

https://github.com/ProgramIsFun/github-repos-visualizer

## to do
- [] Removing the hardcode access token https://github.com/ProgramIsFun/force-graph-visualizer-and-editor/blob/ba80c903dbab324f062a369dc60f69b84359eb8c/client/src/util/helperfile.js#L466C20-L466C60
- [] building an Unreal Engine version
    - https://github.com/thomaswall/ue4-force-graph
        - successfully run in my window 11 and I installed Visual Studio 2022
        - https://github.com/everythingallaccount/ue4-force-graph-backupppp
        - An explanations on why to use the tree.
            - https://github.com/justinormont/Fastest-Force-Directed-Graph
    - https://github.com/thomaswall/ue4-force-graph
- [] when clicking on a node, there will be an option to show a simple one death tree graph, which is the graph that only contains the node and its children.
    - https://vasturiano.github.io/react-force-graph/example/tree/
- [] touchpad move the graph  ( Temporary give up on this one)
    - https://github.com/d3/d3-zoom/issues/255
    - reading source code of react-force-graph
    - d3.select("div").on("wheel", function(event) {
      // Your code to handle the wheel event
      event.preventDefault();
      console.log(event.deltaY, event.deltaX);
      svg.attr("transform", `translate(${event.deltaX},${event.deltaY}) scale(1)`);
      })
        - the Delta X&Y will be correctly shown if we listen to the wheel events but not the Zoom event.
- [] implement text collision detection
    - https://walkingtree.tech/d3-quadrant-chart-collision-in-angular2-application/
    -


- [] deploy the app to firebase hosting, and test it in ipad


- [] think about what will happen if these systems get improved to deal with maybe a line of code or a segment of code.
    - https://vasturiano.github.io/3d-force-graph-vr/example/large-graph/

- [] develop a file explorer function (macos finder
    - a easy version will be this https://vasturiano.github.io/react-force-graph/example/tree/
        - radialout
        - null
        - td (these have a very big problem which is let's say 2 notes belong to the same parent, but they might be separate by other nodes.)
- [ ] add google drive file into the graph

    - [] 1 quick check if the drive file heirarchy is fine first
        - implement slowly expand from root
    - [] 2 the drive root node need to be injected to the original graph
        - [] must not render all the files and folders in the drive?
    - [] clutter cleaning first
        - [] remove code
            - for loop
                - 1 detect the folder
                    - end with js file detection
                    - list full path to find the folder
                - 2 you could choose to
                    - remove the folder
                    - zip the folder and upload to drive
                        - only use this if important
                    - back up to somewhere and then remove the whole folder
                - 3 update the tree pickle
                    - delete some folder node in the pickle
                    - update with substitution
                        - give up on this? need rescan :(
                            - rescan after we clean all the code folder
        - re retrieve the tree using google api
    - [] add google drive file into the graph
        - drive Node property
            - [] node where some property is referring to Google Drive, should contain a googleDriveID attribute that equals the file ID in Google Drive
    - [] after we make sure all the files and folders inside Google Drive has already been on the graph
        - [] and then move all the files inside Google Drive to root directories. folders in Google Drive could be deleted because they are not used anyways.

    - [X] Google Drive API
        - [x] trying official libraries instead of Pydrive
            - how to list recursively of all things
                - how to list all files and folders within one specific folders?
        - [x] how should I get the whole tree
            - should I list all files and folders without any attributes so that they will be in random order with no hierarchy structures
            - [x] should I list all files and folders with attributes so that they will be in the hierarchy structure
                - this is chosen


- [x] visualize the tree

- [] exact progress of projecting the retrieved hierarchy slowly to the graph.
    - using a down top approach, we deal with the bottom of the hierarchy first
    - for example, in a very nested file we get his ID and then we populate it into the graph
    - we then moved these files to the root directory
    - they might not always want to list every file in the graph because there are too many. Sometimes this is acceptable for some files to stay in folders and we just ignore those notes representing those small files
- [] check what Google take out format will be
    - Additional Files
      Include named, published, and uploaded version
      Include additional info for files and folders
      c1="nextPageToken, files(id, name)"
    - check if it is alright to put all the folders and files in the root directory
- [] preferred filters and files to all arrange in the root directories
    - because we don't want Google to manage the structure for us.
        - A user's My Drive can't contain more than 100 levels of nested folders.
    - check if there is unlimited numbers of files and folders supported in 1 directory
        - https://stackoverflow.com/questions/27410444/google-drive-maximum-number-of-files-in-a-directory
        - unless it is a root directories,
          otherwise there is a 500k item Max per folder
    - how to
        - https://stackoverflow.com/questions/12778925/how-to-move-files-and-folders-using-google-drive-api
            - addParents and removeParents
- [x] hide children nodes when we click on the parent node
    - the collapse part
        - [x] find the example in the react-force-graph
            - https://github.com/vasturiano/react-force-graph/blob/9d9b663fd381c94ec15d9e5e481607225f3b7708/example/expandable-nodes
                - [X] check algorithm
                    - checking
                        - the original code to my project for a trial one
                    - after checking, I think the original code is not good to my use
                        - because it assume a tree because it traversed the tree from root
                        - it does not remember some node is processed,
                            - so if it's not a tree, it will run into an infinite loop,
                                - if there is a path from A to B&B to A, and none of the node in between is collapsed with true value.
        - [X] to implement my own algorithm,
            - a small optimization to prevent the whole graph recalculating when user turning off or on the collapse feature of some note.
                - at initial wandering of the whole component or the whole webpage, we do it a stupid way
                    - which is basically a slow way for Luke. Every node that have to collapsed feature turning on.
                - after first rendering, if you should have turned on or off the collapsed feature of some node, we then just compute the nodes near that node. without the need to calculate the whole graph again.
            - [X] maybe when collapse node A (a button to collapse the node)
                - [X] 1 simply check any node have an inward relationship into node A and that node does not have any other relations.
                    - if yes
                        - use setstate to set dd, trigger recalculation of the graph
                - [] 2 collapse Node that does not have a relationship with node that is not a descendant of node A.
                    - ignore this at the moment
    - [x] the design of the collapsed root node
        - a color change
            - ref https://github.com/vasturiano/react-force-graph/blob/9d9b663fd381c94ec15d9e5e481607225f3b7708/example/expandable-nodes
            - passing the nodecolor property to the component
- [] declutter empty github repo
    - 1
        - directly put the required string in the pasteboard
        - manually delete the empty github repo
        - remove the empty github repo from the graph
    - 2
        - check manually
        - press the button to
            - remove the empty github repo with api
                - frontend call directly
                - backend call
            - remove the empty github repo from the graph



- [] level restricted should be a feature that is restricted the tree level only at the initial render


- [] store online the graph data
    - wt database to use
        - firebase
            - not open source
        - mongodb
            - single bson limit is 16MB
        - neo4j
            - need conversion of data


- [] add a Revert one actions button




- [] test maximum number of nodes and links
    - https://vasturiano.github.io/force-graph/example/large-graph/
- [] do a calculation before filtering how many GitHub repositories, After filtering how many GitHub repositories



- [] Ref the neo4j bloom for beautiful UI
    - show the property when we left click on some notes.
    - To do

- [] adding some more methods of adding relationships
- [] Separate a ui out on right upper corner for adding repo
- [] add the function to reverse the direction of all the relations or specific relation
    - we right now do not know that weather A points to B or points to A, better represent B is a category in a.
- [] because sometimes user could have thousands of upholsteries,
  adding the connections simply by dragging the source nook to the destination node is not feasible.

- [ ] ensuring all the properties except the position and velocity will be saved.

- [x] color selected node to a non confusing color

- [x] an escape would deselect the selected node

- [x] add a button that will jump directly to the GitHub repository

- [x] add buttons in this table to delete the node, assume that no relations are with this node.

- [x] display the property when left click on the note.

- [x] disable the s key in vr mode

- [x] there is a bug where when loading a graph with some note being collapsed, those notes are not correctly collapsed.
    - checking console.log
    - it seems that no node is connected to the collapsed true note when first loading the graph
- [X] font size of the text in the node should be adjustable

- [X] implement the function to search for text in the node name
- [X] declutter empty github repo
    - will last 30 days

- [x] when adding a note, try to pause the position rerendering because it makes it hard to select and rename
    - https://github.com/vasturiano/react-force-graph/issues/253

- [X] check if in the links objects, does the source and target need to have the whole node object or just contain the node ID?
    - seems the graph library will replace the links objects into that source and target will be the whole node
- [X] prevent more than 1 relation between 2 nodes
- [X] add button to change display name of the node

- [X] number of nodes and links

- [X] if there is already some node selected, and we select another node, we add a relation between the two nodes.
- [X] add some style to the selected node
    - ref https://vasturiano.github.io/react-force-graph/example/highlight/
        - basically it will add style to the selected note and the one level neighbor
        - the link will also be styled.


- [X] left click on the node to view the property

- [X] Try migrate to electron
    - https://github.com/everythingallaccount/migrates-to-Electron
        - he shows the possibility of migrates to react JS to electrons.   i've also tried successfully to create a new file when clicking a button in a reactor. Yes, because it sends the message to the IPC channel of the main process of Electron.

- [X] Reform the layout to better view ( the text appear in popup )

- [X] Findout why node.current is used instead of directly use dd
    - Seems we could directly modify dd without using node.current
        - Proof: https://github.com/vasturiano/react-force-graph/blob/9d9b663fd381c94ec15d9e5e481607225f3b7708/example/tree/index.html
          https://github.com/vasturiano/react-force-graph/blob/9d9b663fd381c94ec15d9e5e481607225f3b7708/example/dynamic/index.html
    - Done
        - simply because we want some buffer, we do not want to change something directly which makes the graph rerender.

- [x] left click on the note to change the name. Seems do not change the display name but the underlying ID.
- [x] allow to hot store the get all report data because we do not want to abuse the GitHub API.
    - [x] having an error in saving because it exists the maximum allowed space for one document. Maybe we switch to use MongoDB or need to break the trunks into a lot of documents.
        - [x] simply download to local
- [X] implement a function that render a list of control fine tune special parameters of the whole graph.
- [x] when switching graphs type, nothing will be shown
    - go back to original commit
        - 99585887494251928426aef7e285b08d78e25dd5 no
          1917b3737a4d517378024dcef46ce008530b68b8  yes
    - ReactDOM.render(<App/>, document.getElementById('root'));
        - using legacy function will solve the problem
        - https://github.com/vasturiano/react-force-graph/issues/521
- [x] add shortcut to font size
## external references
- [ ] https://github.com/vasturiano/react-force-graph
    - Basic (source)  https://vasturiano.github.io/react-force-graph/example/basic/

    - Directional arrows (source) https://vasturiano.github.io/react-force-graph/example/directional-links-arrows/

    - Directional moving particles (source) https://vasturiano.github.io/react-force-graph/example/directional-links-particles/
    - Auto-colored nodes/links (source)
    - AR graph (source)
    - 2D Text nodes (source)
    - 3D Text nodes (source)
    - Image nodes (source)
    - HTML in nodes (source)
    - Custom 2D node shapes (source)
    - Custom 3D/VR node geometries (source)
    - Curved lines and self links (source)
    - Text in links (source)
    - Highlight nodes/links (source)
    - Larger graph (source)
      Dynamic data changes (source)
      Click to focus on node (source)
      Click to expand/collapse nodes (source)
      Fix nodes after dragging (source)
      Fit graph to canvas (source)
      Camera automatic orbitting (source)
      Node collision detection (source)
    - Emit link particles on demand (source)
      Force-directed tree (DAG mode) (source)
      Bloom Post-Processing Effect (source)
- [ ] https://github.com/vasturiano/force-graph
    - Basic (source)
      Load JSON (source)
      Medium size graph (~4k elements) (source)
      Large size graph (~75k elements) (source)
      --- Text as nodes (source)
      Images as nodes (source)
      Directional links (using arrows) (source)
        - Directional links (using moving particles) (source)
        - Curved lines and self links (source)
        - Automatic curvature for overlapping links (source)
          Text in links (source)
          Dash odd links (source)
          Highlight nodes/links (source)
          Multiple Node Selection (source)
        - Auto-colored nodes/links (source)
          Custom node shapes (source)
          Pre-computed layout (using dagre) (source)
          Zoom/pan viewport (source)
        - Click to focus on node (source)
        - Click to expand/collapse nodes (source)
          Fix nodes after dragging (source)
        - Fit graph to canvas (source)
          Dynamic data changes (source)
          Beeswarm chart (source)
          Node collision detection (source)
          Emit link particles on demand (source)
          Force-directed tree (DAG mode) (source)
          Expandable Tree (source)
          yarn.lock dependency graph (DAG mode) (source)
        - Usage as UI to construct graphs (source)

## a quick try on the build
https://gitvisual-7d9a8.web.app



## How to use

after starting, just login with github

then play around with the button there


## warning
- there are tons of unused codes in this repo ( actions, reducer, etc) . please ignore them. Or you could remove them.


## before u deploy
- check the security rules of firestore in client/firestore.rules and publish it to your firebase project


## how to deploy
- just init firebase hosting and deploy it very easily.





## screenshot

![image](https://user-images.githubusercontent.com/36737465/172355032-eda62d9d-a8e7-4b80-bb13-5b4e2a4dd4ac.png)

![image](https://user-images.githubusercontent.com/36737465/172355198-f20ab886-21ac-4dac-a876-4ecc1053d693.png)