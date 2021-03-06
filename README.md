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
It should work to use <kbd>CTRL</kbd>+<kbd>SHIFT</kbd> + <kbd>P</kbd> and select "Run Build Task" and then select - "run web api" to start the API.
 
The API will reload once changed and should be exposed at http://localhost:5135/ with the documentation shown under http://localhost:5135/swagger/index.html

# A few words about k6
* Scripting in JavaScript ES2015/ES6 
    * http://es6-features.org/#Constants
    * JavaScript API is found here: https://k6.io/docs/javascript-api/
* It does not run in NodeJS nor on a browser - It is a separate runtime.
* Can run locally `k6 run` and in the cloud `k6 cloud`
* The xk6 extensions does not run in k6 cloud
* VU is defined the following way(ref https://k6.io/docs/getting-started/running-k6/#adding-more-vus):
    >k6 works with the concept of virtual users (VUs), which run scripts - they're essentially glorified, parallel while(true) loops.
* Add `--http-debug` flag to get HTTP request and response logs: https://k6.io/docs/using-k6/http-debugging/

# Challenges 
You will need to to do changes to the k6-tests located in the [k6-tests](k6-tests) folder, while running the API under test found in the [api-under-test](api-under-test) folder.

In VS Code
<kbd>CTRL</kbd>+<kbd>SHIFT</kbd>+<kbd>P</kbd> > Run test task -> Run k6test Windows|Linux

## Challenge -1 - Verifying the API is running
* run task `run web api` or start the API in some other way
* run taks `ping api` or verify the API is running in some other way

## Challenge 0 - Get to know the API
Refer to [Readme for api-under-test](api-under-test/README.md)

## Challenge 1 - Basic k6-test
Verify that the API is running. Try running with additional HTTP logging:
`k6 run challenge1test.js --http-debug="full"`

To better understand the entries in the output report, refer to: https://k6.io/docs/using-k6/metrics/#http-specific-built-in-metrics

## Challenge 2 - Fix the checks
We want to check the HTTP status code and that a body has returned. Fix the tests, so they are according to the documentation.  

## Challenge 3 - Making the process fail
Refer to https://k6.io/docs/using-k6/thresholds/.

When you are using k6 in continous integration task, e.g. when using k6 for running core-/smoketests, you need to make sure that the process returns something other than 0. Othervise the CI pipeline will just continue. 

Make sure the test fails in a way that will return a number different from 0. When you run this as a task, the error code will be printed. It you run it in the console you need to print the return code 'echo $?' after running test.

## Challenge 4 - Understanding the test life cycle
Refer to https://k6.io/docs/using-k6/test-life-cycle/ for this challege.

A lot of stuff is going on. The test is setup with 3 iterations distributed over 2 VUs. Note that there is an additional VU number 0, which runs the setup and teardown.

Analyse the test life cycle and see if you can make sense of it.

## Challenge 5 - Inject environment variables
refer to https://k6.io/docs/using-k6/environment-variables/

It is very useful to be able to inject environment variables. Print a greeting to someone with both ways described in the referenced documentation. You can also try `export name=TODO`. What can you say about precendence?

## Challenge 6 - Import library using public link to JS
Just a demo. This is a way of importing code from the outside; By referencing a public js-file. In k6, however, every VU has a separate javascript virtual machine, duplicating the resource usage once each.

## Challenge 7: Import library using NPM
Just a demo. Importing modules is described her: https://k6.io/docs/using-k6/modules/#bundling-node-modules
I have chosen pragmatic solution, where i use the files imported into node_modules as "normal files" and refer to them explicitly. 

You can use webpack to bundle if you want a prettier solution for this. https://k6.io/docs/using-k6/modules/#setting-up-the-bundler

## Challenge 8: Scenario Test (and cloud run)
Make a more complex test where you:
* Setup:
    * Add participants
    * Create a poll
* Run:
    * Get current poll
    * Login user, i.e. get access token
    * Add votes

Cloud: We run a scenario test towards the deployed voting system, and discuss the results and potential improvements.
