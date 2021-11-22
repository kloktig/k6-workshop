# k6 Workshop
This repository contains a workshop to improve your understanding of how to use k6 https://k6.io/. The aim is not to be a complete step-by-step guide, but it is more focused helping you avoid time consuming pitfalls.

# How to run
If you struggle to understand something in this README, please let med know by submit a github issue, pinging me on linkedIn or something. 
On mac, use <kbd>⌘</kbd> instead of <kbd>ctrl</kbd>.

(There is a troubleshooting chapter on the bottom of this document with some errors and solutions people have encountered. Beware of ports that are already in use etc)
You should not have anything running at port 5135, 8086, 10000, 10001, 10002.

To run the workshop clone the repo, install VS Code from https://code.visualstudio.com/

Install docker. On Windows, use the WSL2 backend.

Open VS Code and choose "File" - "Open Folder" (<kbd>CTRL</kbd> <kbd>K</kbd> + <kbd>CTRL</kbd> <kbd>O</kbd>) and select the folder where you cloned the repo. Wait for the popup and choose "Reopen folder to develop in a container".

![Reopen folder to develop in a container](https://user-images.githubusercontent.com/1174441/92221305-9082f880-ee9d-11ea-8e31-28dd9729b110.png)

You will get a lot of these ![install  extension](https://user-images.githubusercontent.com/1174441/82751431-85590080-9db7-11ea-8a6a-7728a0a1c877.png) 
asking you to install extensions, and then asked to relead the folder in the Docker images and just go yes, yes, sure, reload etc. And wait when it asks you too, downloading and building all the images can take a while the first time.

If the docker images for some reason does not build and open automatically hit ctrl+shift+p and type "remote-containers Open work" - or enough for the autocomplete to find the following task: 

![Open the folder in the workspace](https://user-images.githubusercontent.com/1174441/82751510-04e6cf80-9db8-11ea-9040-47e122c98e11.png)

### On Windows
Depending on versions of docker and WSL you might have to share the repo in Docker
![Turn on filesharing](https://user-images.githubusercontent.com/1174441/82738627-4c7a4680-9d39-11ea-9b6a-ab42b9accec3.png)

# Starting the API
It should work to use <kbd>CTRL</kbd>+<kbd>SHIFT</kbd> + <kbd>P</kbd> and select "Run Build Task" and then select - "watch" to start the API.
 
The API will reload once changed and should be exposed at http://localhost:5135/ with the documentation shown under http://localhost:5135/swagger/index.html

The watch and test commands runs in different terminal tabs, see the red ring in the bottom picture of K6 in this README to see how to select the tab if you can not see anything happenning as you run tasks.

# Run the tests
<kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>P</kbd> and "Run Test Task" - "k6 test", then select the number of the test you want to run. This should run the loadtest.

# Challenges 
You will need to to do changes to the k6-tests located in the [k6-tests](k6-tests) folder, while running the API under test found in the [api-under-test](api-under-test) folder.

In VS Code
<kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>P</kbd> > Run test task -> Run k6test Windows|Linux

## Challenge 1 - Get to know the API
Refer to [Readme for api-under-test](api-under-test/README.md)

## Challenge 1 - Basic k6-test