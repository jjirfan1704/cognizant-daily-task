# Hands-On 7 - Page Object Model (POM)

## What is POM?

Page Object Model (POM) is a Selenium design pattern where all page elements and actions are stored in separate page classes. Test files only contain the test logic and assertions.

## Why is it useful?

Without POM, every test directly uses driver.find_element(). If a locator changes, every test must be updated.

With POM, locators are stored in one place. If a locator changes, only the corresponding page class needs to be updated, while all tests continue to work.

This makes automation code easier to maintain, reusable, and more readable.