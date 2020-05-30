document.addEventListener("DOMContentLoaded", () => {
    
    const tabs = document.querySelectorAll('.tabs__item'),
          tabsContent = document.querySelectorAll('.tabs__content__wrapper'),
          tabsParent = document.querySelector('.tabs');
          

    function hideTabContent () {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });

        tabs.forEach(item => {
            item.classList.remove('tabs__item_active')
        });
    }

    function showTabContent (i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.toggle('tabs__item_active');
    }

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('tabs__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
});