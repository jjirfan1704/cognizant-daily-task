"""
Hands-On 4
Selenium WebDriver Setup, Browser Drivers & Basic Commands

Selenium Components

1. WebDriver
   WebDriver is the main Selenium component used to automate web browsers.
   It communicates with browsers through browser-specific drivers like ChromeDriver.

2. Selenium Grid
   Selenium Grid allows tests to run in parallel on different machines,
   browsers and operating systems.

3. Selenium IDE
   Selenium IDE is a browser extension used for record-and-playback testing.
   It is useful for beginners and can also generate automation code.
"""

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


options = webdriver.ChromeOptions()


driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install()),
    options=options
)



driver.implicitly_wait(10)
# Task 1


driver.get("https://www.lambdatest.com/selenium-playground/")

print("Page Title:")
print(driver.title)


# Task 2 - Navigation
driver.find_element(By.LINK_TEXT, "Simple Form Demo").click()

assert "simple-form-demo" in driver.current_url

print("\nCurrent URL:")
print(driver.current_url)

driver.back()


driver.execute_script('window.open("https://www.google.com");')

print("\nWindow Handles:")
print(driver.window_handles)

driver.switch_to.window(driver.window_handles[1])

print("\nGoogle Tab Title:")
print(driver.title)



driver.switch_to.window(driver.window_handles[0])

driver.save_screenshot("playground_screenshot.png")

print("\nScreenshot saved successfully!")

print("\nCurrent Window Size:")
print(driver.get_window_size())

driver.set_window_size(1280, 800)

print("\nUpdated Window Size:")
print(driver.get_window_size())


input("\nPress Enter to close the browser...")

driver.quit()