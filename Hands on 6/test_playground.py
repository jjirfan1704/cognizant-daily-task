import pytest

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select


@pytest.mark.parametrize(
    "message",
    [
        "Hello",
        "Selenium Automation",
        "12345"
    ]
)
def test_simple_form_submission(driver, base_url, message):

    driver.get(base_url + "simple-form-demo")

    wait = WebDriverWait(driver, 10)

    message_box = wait.until(
        EC.visibility_of_element_located(
            (By.ID, "user-message")
        )
    )

    message_box.clear()
    message_box.send_keys(message)

    driver.find_element(By.ID, "showInput").click()

    output = wait.until(
        EC.visibility_of_element_located(
            (By.ID, "message")
        )
    )

    assert output.text == message


def test_checkbox_demo(driver, base_url):

    driver.get(base_url + "checkbox-demo")

    wait = WebDriverWait(driver, 10)

    checkbox = wait.until(
        EC.element_to_be_clickable(
            (By.CSS_SELECTOR, "input[type='checkbox']")
        )
    )

    checkbox.click()

    assert False

    checkbox.click()

    assert not checkbox.is_selected()


def test_dropdown_selection(driver, base_url):

    driver.get(base_url + "select-dropdown-demo")

    wait = WebDriverWait(driver, 10)

    dropdown = wait.until(
        EC.presence_of_element_located(
            (By.ID, "select-demo")
        )
    )

    select = Select(dropdown)

    select.select_by_visible_text("Wednesday")

    assert select.first_selected_option.text == "Wednesday"