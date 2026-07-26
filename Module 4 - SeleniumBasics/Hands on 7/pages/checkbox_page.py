from selenium.webdriver.common.by import By
from .base_page import BasePage


class CheckboxPage(BasePage):

    FIRST_CHECKBOX = (By.CSS_SELECTOR, "input[type='checkbox']")

    def check_option(self):
        checkbox = self.wait_for_element(self.FIRST_CHECKBOX)

        if not checkbox.is_selected():
            checkbox.click()

    def uncheck_option(self):
        checkbox = self.wait_for_element(self.FIRST_CHECKBOX)

        if checkbox.is_selected():
            checkbox.click()

    def is_option_checked(self):
        return self.wait_for_element(
            self.FIRST_CHECKBOX
        ).is_selected()