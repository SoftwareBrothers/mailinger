# Mailinger
This is a system which allow to send many emails to people using a template in WYSIWYG editor and data from the spreadsheet. It has integration with Google API, Gmail API and Spreadsheet API. 

## Getting Started
Copy env file and edit it appropriately
```
cp .env .env.local
```
Install dependencies
```
yarn
```
Run the application
```
yarn start
```

## Tests

If you want to run tests in development mode, simply run `yarn test`. It will run tests for files that has been changed since last commit. It will run tests in `--watch` mode. 
You can also do one-time run with code coverage of all tests, run `yarn coverage`.

### How to setup test runner in IntelliJ IDEA / PHPStorm / WebStorm?

1. Click `Add Configurations`
2. Click `+` on the top-left corner of the screen, then select `Jest`
3. Give it a good name, like `All Tests`
3. Click 'Ok'

That's it! Now you have 3 icons available: `Run 'All Tests'`, `Debug 'All Tests'` and `Run 'All Tests' with Coverage`. Click on the last one and see that project tree will now have information about code coverage!

## License

mailinger is Copyright © 2019 SoftwareBrothers.co. It is free software, and may be redistributed under the terms specified in the [LICENSE](LICENSE) file.

## About SoftwareBrothers.co

<img src="https://softwarebrothers.co/assets/images/software-brothers-logo-full.svg" width=240>

We are a software company who provides web and mobile development and UX/UI services, friendly team that helps clients from all over the world to transform their businesses and create astonishing products.

- We are available to [hire](https://softwarebrothers.co/contact).
- If you want to work for us - checkout the [career page](https://softwarebrothers.co/career).
