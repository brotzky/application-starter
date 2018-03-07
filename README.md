# Grow Admin Console

Grow Admin Console (GAC) is the admin for all our products. This is where we process Personal Loans, Deposit Accounts, and Financial Health Dashboard applications.

## Getting Started

```
# Use the one liner
git clone git@gitlab.com:poweredbygrow/software/grow-app-admin.git && cd grow-app-admin && git submodule init && git submodule update && yarn && yarn start <org> 
# ** if you don't include the <org> "organization" name, it will be defaulted to "grow", which may cause API call errors

# Or step by step:
# Clone the repository as grow-app-admin
git clone git@gitlab.com:poweredbygrow/software/grow-app-admin.git

# Change directories into grow-app-admin
cd grow-app-admin

# Setup ignored server config file
echo "module.exports = 'https://meridian-qa-gac.poweredbygrow.com';" >tools/webpack/server.config.js

# Init all the submodules
git submodule init

# Update the submodules
git submodule update

# Install all the node modules using yarn
yarn

# Start the local server
yarn start <org> 
# ** if you don't include the <org> "organization" name, it will be defaulted to "grow", which may cause API call errors


```

## Recommended Git aliases configurations

It is recommend to create [Git aliases](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases) to speed up development.

```
  
  # Standard aliases
  git config --global alias.co checkout
  git config --global alias.br branch
  git config --global alias.ci commit
  git config --global alias.st status

  # Pull down latest of all submodules
  git config --global alias.us 'submodule foreach --recursive git pull'


  // init the grow-app-actions submodule
  git submodule update --init --recursive
  cd grow-app-actions
  git pull origin master
  git checkout master

  // go back to grow-app-admin to start
  cd ..
  yarn start
````

---


## Developing Locally

When developing locally it is recommended to have your tests running along with a linter. There is a pre-commit hook that will run all local tests before allowing developers to commit and push to a branch

```
  yarn start <org> 
  # ** if you don't include the <org> "organization" name, it will be defaulted to "grow", which may cause API call errors
```


---

## Build & Deploy
```
  # Regular build that defaults to minor factor
  # 0.3.1 => 0.3.2
  yarn build

  # Increment version a major factor
  # 1.4.23 => 2.0.0
  yarn build -- --env.major

  # Increment version a minor factor
  # 1.4.23 => 1.5.0
  yarn build -- --env.minor

  # Increment version a minor factor
  # 1.4.23 => 1.4.24
  yarn build -- --env.patch
```

This will output hashed files into ```/build``` for you to push up
Our build process is a work in progress. Need CI and automated deploys