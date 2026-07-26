from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

driver = webdriver.Chrome(
    service=Service(ChromeDriverManager().install())
)

driver.maximize_window()

wait = WebDriverWait(driver, 10)

driver.get("https://testmuai.com/selenium-playground/checkbox-demo")

wait.until(
    EC.presence_of_element_located((By.TAG_NAME, "body"))
)

print("\n===== XPATH USING text() =====")

label = driver.find_element(
    By.XPATH,
    "//label[text()='Click on check box']"
)

print(label.text)

print("\n===== XPATH USING contains() =====")

labels = driver.find_elements(
    By.XPATH,
    "//label[contains(text(),'Option')]"
)

for i, item in enumerate(labels, start=1):
    print(f"{i}. {item.text}")

input("\nPress Enter to close...")

driver.quit()