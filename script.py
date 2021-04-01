import csv
from parsel import Selector
from time import sleep
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.common.keys import Keys
from validator_collection import checkers
from selenium.webdriver.common.keys import Keys
import re
import pymongo
import datetime

client = pymongo.MongoClient("mongodb+srv://admin:admin@cluster0.elo9f.mongodb.net/hr-supp?retryWrites=true&w=majority")
db = client[ "hr-supp" ]
col = db[ "profiles" ]

def get_profile_urls(driver, n_pages=5):
    """
    Return a list without repetitions of alphabetically sorted URLs
    taken from the results of a given query on Google search.

    :param driver: selenium chrome driver object
    :param n_pages: int number of google pages to loop over
    :return: list of linkedin-profile URLs
    """
    linkedin_urls = []
    for i in range(n_pages):
        urls = driver.find_elements_by_class_name("yuRUbf [href]")
        #links = [url.get_attribute('href') for url in urls]

        linkedin_urls += [url.get_attribute('href') for url in urls
                          if checkers.is_url(url.get_attribute('href')) and re.search("^https://[a-z]+\.linkedin\..*$", url.get_attribute('href'))]
        print(linkedin_urls)
        sleep(0.5)
        if i > 1:
            try:
                next_button_url = driver.find_element_by_css_selector(
                    '#pnnext').get_attribute('href')
                driver.get(next_button_url)
            except NoSuchElementException:
                break
    linkedin_urls_no_rep = sorted(
        list(dict.fromkeys([url for url in linkedin_urls])))
    return linkedin_urls_no_rep



writer = csv.writer(open('output.csv', 'w+', encoding='utf-8-sig', newline=''))
writer.writerow(['Name', 'Position', 'Company', 'Education', 'Location', 'URL'])


driver = webdriver.Chrome('C://Users//dell/chromedriver.exe')
driver.get('https://www.linkedin.com/')

#WebDriverWait wait = new WebDriverWait(driver, 10);

username = driver.find_element_by_name("session_key")
username.send_keys('slasmer93@gmail.com')
sleep(0.5)

password = driver.find_element_by_name('session_password')
password.send_keys('13051998gachi')
sleep(0.5)

sign_in_button = driver.find_element_by_class_name('sign-in-form__submit-button')
sign_in_button.click()
sleep(2)

driver.get("https://www.google.com")
sleep(1)
search_query = driver.find_element_by_name('q')
try:
    search_query.send_keys("site:tn.linkedin.com/in/ AND \"react developer\"")
except ElementNotInteractableException:
    print("ERROR :: Cannot send query. Google might be blocking")
    sys.exit(1)
sleep(0.5)
search_query.send_keys(Keys.RETURN)

profile_urls = get_profile_urls(driver, 5)
if len(profile_urls) == 0:
    print("WARNING :: " +
          "Could not get any URLs for the query\n" + query)
    print("Please double-check that Google is not " +
          "blocking the query")

#urls = driver.find_elements_by_xpath('//*[@class = "r"]/a[@href]')
#urls = [url.get_attribute('href') for url in urls]
#print(profile_urls)
sleep(0.5)

for url in profile_urls:
    try:
        user = {}
        sleep(2)
        body = driver.find_element_by_tag_name("body")
        driver.get(url)
        sleep(2)
        sel = Selector(text = driver.page_source)

        name = sel.xpath('//*[@class = "inline t-24 t-black t-normal break-words"]/text()').extract_first().split()
        name = ' '.join(name)

        position = sel.xpath('//*[@class = "mt1 t-18 t-black t-normal break-words"]/text()').extract_first().split()
        position = ' '.join(position)

        user["name"] = name
        user["position"] = position

        #experience = sel.xpath('//*[@class = "pv-top-card-v3--experience-list"]')
        experience_section = driver.find_element_by_id("experience-section")
        #experience_section = driver.find_element_by_xpath("//*[starts-with(@class, 'pv-profile-section__section-info')]")
        experience_summary = experience_section.find_elements_by_xpath(".//*[starts-with(@class, 'pv-entity__summary-info')]")
        experiences = []
        for exp in experience_summary:
            experience = {}
            experience["title"] = exp.find_element_by_tag_name('h3').text
            experience["date"] = exp.find_element_by_xpath(".//*[starts-with(@class, 'pv-entity__date-range')]").text[15:]
            try:
                experience["company"] = exp.find_element_by_xpath(".//*[starts-with(@class, 'pv-entity__secondary')]").text
            except:
                experience["company"] = "Undefined"
            experiences.append(experience)
        user["experience"] = experiences
        #print("############## exp", experiences)
        #experience_list_html = experience_html.find_element_by_tag_name('ul').find_elements_by_tag_name("li")
        
        #print("####################### experience", experience.find_element_by_tag_name('ul').find_elements_by_tag_name("li"))
        # experience = []
        # for exp in experience_list_html:
        #     experience.append(exp.find_element_by_tag_name('section').find_element_by_tag_name('div').find_element_by_tag_name('div').text)

        # experience = driver.find_elements_by_xpath("//a[@data-control-name=background_details_company]")
        # print("############ experience", experience)

        #locate link to expand skills
        try:
            show_more_skills_button = driver.find_element_by_class_name("pv-skills-section__chevron-icon")
            #expand
            show_more_skills_button.click()
            skills = driver.find_elements_by_xpath("//*[starts-with(@class,'pv-skill-category-entity__name-text')]")
            #create skills set
            skill_set = []
            for skill in skills:
                skill_set.append(skill.text)

            #print("############## skills", skill_set)
        except:
            skill_set = []

        user["skills"] = skill_set
        user["position"] = position
        #user["scraped_at"] = datetime.datetime.now()

        col.insert(user)

        
        #company = experience.xpath('./li[@data-control-name = "position_see_more"]//span/text()').extract_first()
        #company = ''.join(company.split()) if company else None
        #education = experience.xpath('.//li[@data-control-name = "education_see_more"]//span/text()').extract_first()
        #education = ' '.join(education.split()) if education else None

        location = ' '.join(sel.xpath('//*[@class = "t-16 t-black t-normal inline-block"]/text()').extract_first().split())

        
        #skills = driver.find_element_by_class_name("pv-skill-categories-section__top-skills pv-profile-section__section-info section-info pb1")
        #print("skills", skills)
        #skills = driver.find_elements_by_tag_name('section')
        #for skill in skills:
        #    print(skill.get_attribute("class"))

        url = driver.current_url

        print('\n')
        print('Name: ', name)
        print('Position: ', position)
        print('Location: ', location)
        print('URL: ', url)
        print('\n')
            
        # writer.writerow([name,
        #              position,
        #              company,
        #              education,
        #              location,
        #              url])
    except:
        print("Invalid profile")
          
driver.quit()
