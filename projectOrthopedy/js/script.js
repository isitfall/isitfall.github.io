document.addEventListener("DOMContentLoaded", () => {
    
    //tabs section Catalog
    function changeCatalogTabs() {
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
    }
    changeCatalogTabs();


    //tabs section Services

    function openServicesModals() {
        const modalOverlay = document.querySelector('.modal'),
              modalLinks = document.querySelectorAll('.services__descr__item'),
              frstModal = document.querySelector('#frstModal'),
              secModal = document.querySelector('#secModal'),
              closeBtn = document.querySelectorAll('.modal__item__closer');      
              
        console.log(frstModal, secModal, modalLinks);

        modalOverlay.classList.add('hide');        

        //открываем окно по нажатию

        function openFirstModalWin() {
            modalLinks[0].addEventListener('click', ()=> {
                   
                        frstModal.classList.add('fade');
                        frstModal.classList.remove('hide'); 
                        modalOverlay.classList.remove('hide');
                        modalOverlay.classList.add('fade');       
                        document.body.style = 'overflow: hidden';

            });         
        }

        function closeModals() {
            frstModal.classList.remove('fade');
            frstModal.classList.remove('add'); 
            frstModal.classList.add('hide');
            secModal.classList.remove('fade');
            secModal.classList.remove('add'); 
            secModal.classList.add('hide');
        }
        
        function openSecondModalWin() {
        
            modalLinks[1].addEventListener('click', ()=> {
                secModal.classList.add('fade');
                secModal.classList.remove('hide'); 
                modalOverlay.classList.remove('hide');
                modalOverlay.classList.add('fade');       
                document.body.style = 'overflow: hidden';  
            });
        
        }      

        openFirstModalWin();
        openSecondModalWin();

        function closeServiceModals() {
            closeBtn.forEach(item => {
                item.addEventListener('click', () => {
                    modalOverlay.classList.add('hide');
                    modalOverlay.classList.remove('fade');
                    closeModals();
                    document.body.style = '';

                });
            });
        }
        
        closeServiceModals();           
               
    }

    openServicesModals();

    //tabs Services
    //ДОПИЛИ
    function changeServicesTabs() {
        const tabsContent = document.querySelectorAll('.modal__item__descr')
              tabs = document.querySelectorAll('.modal__item__tabs__item'),
              tabsParent = document.querySelector('.modal__item__tabs');

              console.log(tabsContent);



        function hideTabContent () {
            tabsContent.forEach(item => {
                item.classList.add('modal__item__descr__hide');
                item.classList.remove('fade');
            });

            tabs.forEach(item => {
                item.classList.remove('modal__item__tabs__item_a')
            });
        }


        function showTabContent (i) {            
                 
            tabsContent[i+1].classList.add('fade');
            tabsContent[i+1].classList.remove('modal__item__descr__hide');
            tabs[i].classList.toggle('modal__item__tabs__item_a');
        }

        tabsParent.addEventListener('click', (e) => {
            const target = e.target;

            if (target && target.classList.contains('modal__item__tabs__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });


    
    }

    changeServicesTabs();

    //slow scroll

        const anchors = document.querySelectorAll('a[href*="#"]')

        for (let anchor of anchors) {
        anchor.addEventListener('click', function (e) {
            e.preventDefault()
            
            const blockID = anchor.getAttribute('href').substr(1)
            
            document.getElementById(blockID).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
            })
        })
    }


});