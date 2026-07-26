from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import NoSuchElementException
from webdriver_manager.chrome import ChromeDriverManager
import time

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install())
)

driver.maximize_window()

wait = WebDriverWait(driver, 10)

driver.get("https://testmuai.com/selenium-playground/simple-form-demo")

print("===== Explicit Wait =====")

message_box = wait.until(
    EC.visibility_of_element_located((By.ID, "user-message"))
)

message_box.send_keys("Hello Selenium")

print("Input box is visible.")

print("\n===== element_to_be_clickable =====")

button = wait.until(
    EC.element_to_be_clickable((By.ID, "showInput"))
)

button.click()

print("Button clicked successfully.")

print("\n===== time.sleep() vs Explicit Wait =====")

driver.refresh()

start = time.time()

time.sleep(3)

print("time.sleep():", round(time.time() - start, 2), "seconds")

driver.refresh()

start = time.time()

wait.until(
    EC.visibility_of_element_located((By.ID, "user-message"))
)

print("Explicit Wait:", round(time.time() - start, 2), "seconds")

print("\n===== Fluent Wait =====")

fluent_wait = WebDriverWait(
    driver,
    timeout=10,
    poll_frequency=0.5,
    ignored_exceptions=[NoSuchElementException]
)

element = fluent_wait.until(
    EC.presence_of_element_located((By.ID, "user-message"))
)

print("Fluent Wait completed successfully.")

input("\nPress Enter to close...")

driver.quit()