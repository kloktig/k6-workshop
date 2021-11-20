# Handling Modules
Refer to https://k6.io/docs/using-k6/modules/#using-local-modules-with-docker

## 1 - Importing built-in functions
The challenge is to import the built-in function 'sleep'. 

In addition you should:
* Become more familiar with the order of execution in a k6-test.
* Inject env variable: Ref https://k6.io/docs/using-k6/environment-variables/
  * Note that the recommended way is to use `k6 run test.js -e MY_ENV=Name` and not `MY_ENV=Name k6 run test.js` 

## TODO..