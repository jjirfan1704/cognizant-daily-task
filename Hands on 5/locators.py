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

driver.get("https://testmuai.com/selenium-playground/simple-form-demo")

wait.until(
    EC.presence_of_element_located((By.ID, "user-message"))
)

print("\n===== LOCATOR STRATEGIES =====")

# By ID
driver.find_element(By.ID, "user-message")
print("✓ By.ID")

# By NAME (current site doesn't have name attribute)
try:
    driver.find_element(By.NAME, "user-message")
    print("✓ By.NAME")
except:
    print("✗ By.NAME not available on current website")

# By CLASS_NAME
driver.find_element(By.CLASS_NAME, "border")
print("✓ By.CLASS_NAME")

# By TAG_NAME
driver.find_element(By.TAG_NAME, "input")
print("✓ By.TAG_NAME")

# Absolute XPath
driver.find_element(
    By.XPATH,
    "/html/body//input[@id='user-message']"
)
print("✓ Absolute XPath")

# Relative XPath
driver.find_element(
    By.XPATH,
    "//input[@id='user-message']"
)
print("✓ Relative XPath")

print("\n===== CSS SELECTORS =====")

# CSS by ID
driver.find_element(
    By.CSS_SELECTOR,
    "#user-message"
)
print("✓ CSS by ID")

# CSS by Attribute
driver.find_element(
    By.CSS_SELECTOR,
    "[placeholder='Please enter your Message']"
)
print("✓ CSS by Attribute")

# CSS Parent > Child
driver.find_element(
    By.CSS_SELECTOR,
    "div.left-input > input"
)
print("✓ CSS Parent > Child")

print("\n===== LOCATOR RANKING =====")

ranking = [
    "1. ID",
    "2. CSS Selector",
    "3. NAME",
    "4. Relative XPath",
    "5. CLASS_NAME",
    "6. TAG_NAME",
    "7. Absolute XPath"
]

for item in ranking:
    print(item)

input("\nPress Enter to close...")

driver.quit()