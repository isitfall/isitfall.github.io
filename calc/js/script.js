'use strict'

document.addEventListener('DOMContentLoaded', () =>{


    //запихваем все элементы страницы в один объект
    const mathObj = {
        numsBtns: document.querySelectorAll('.btn__nums'),
        operatorBtns: document.querySelectorAll('.btn__operator'),
        display: document.querySelector('.calc__display')
    },
    valueObj = {
        frstNum: [], //сюда будет заполняться первый операнд
        secNum: [], //сюда будет заполняться второй операнд
        operator: '', //сюда встанет символ оператора
        result: undefined,
        
    };
    
    //ограничим длину выводимых данных на дисплей
    console.log(mathObj.display.length);

    //та самая функция, которая меняет две верхние кнопки через Т секунд
    function changeFirstOperators() {
        let frstOper = mathObj.operatorBtns[0],
            secOper =  mathObj.operatorBtns[1];

        secOper.textContent = frstOper.innerHTML;
        frstOper.textContent = 'C';
    }
    setTimeout(changeFirstOperators, 1000);

    //заебошим вывод данных в инпут
    //РАБОТАЕТ С КНОПКАМИ ЧИСЛАМИ

    function placeNumToInput(numArray) {
        mathObj.display.value = numArray.join(''); 
    }
    
    //заебошим функцию, которая будет хуярить интерполяцию в инпут
    //РАБОТАЕТ С КНОПКАМИ ЧИСЛАМИ

    function interpolate(numsOfValArr, numBtnVal) {

        console.clear();
        if (numsOfValArr.includes('.') && numBtnVal.innerHTML ===".") {
            console.log('ТОЧКА ИСПОЛЬЗУЕТСЯ ПОВТОРНО');
        } 
        else {
            numsOfValArr.push(numBtnVal.innerHTML);
        }             
        
        placeNumToInput(numsOfValArr);      

        console.log(numsOfValArr.join(''));  
        console.log(valueObj);
        console.log(mathObj.display);
    }

    //заебошим функцию, которая при нажатии на равно вычислит значения из объекта,
    //вернет результат и очистит объект

    function calculateThisFknShit () {
        const firstOperand =  parseFloat(valueObj.frstNum.join('')),
              secondOperand = parseFloat(valueObj.secNum.join(''));
                
        switchKey();                

        function switchKey() {
                switch (valueObj.operator) {
                    case '✕':
                        valueObj.result = (firstOperand*secondOperand);
                        getQuantityAfterInt(valueObj.result);       
                        changeObj(); 
                        break;
                    case '÷':
                        valueObj.result = (firstOperand/secondOperand);
                        getQuantityAfterInt(valueObj.result);                   
                        changeObj();
                        break;
                    case '+':
                        valueObj.result = (firstOperand+secondOperand);
                        getQuantityAfterInt(valueObj.result);      
                        changeObj(); 
                        break;
                    case '-':
                        valueObj.result = (firstOperand-secondOperand); 
                        getQuantityAfterInt(valueObj.result);
                        changeObj();
                        break;
                }
        }


        //функция, которая будет изменять содержимое объекта
        function changeObj() {            
            valueObj.frstNum = valueObj.result.toString().split(', ');
            valueObj.secNum = [];
            valueObj.operator = '';
            valueObj.result = undefined;        
        }        
    }


    //функция для клавиши C

    function clearValueObj() {
        valueObj.frstNum = [];
        valueObj.secNum = [];
        valueObj.operator = '';
        valueObj.result = undefined; 
        mathObj.display.value = 0;
        console.clear();
        console.log(valueObj);
    }

    //функция для клавиши <-

    function deleteLastElem() {
        if (valueObj.operator === "") {
            valueObj.frstNum.pop();
            mathObj.display.value = valueObj.frstNum.join('');
        } else {
            valueObj.secNum.pop();
            mathObj.display.value = valueObj.secNum.join('');
        }
    }

    //функция корень

    function sqrtNum() {
        mathObj.display.value = Math.pow(Number(valueObj.frstNum.join('')), 1/2);
        valueObj.frstNum = mathObj.display.value.split(', ');
    } 
    
    //функция, РАБОТАЕТ С РЕЗУЛЬТАТОМ проверяющая количество знаков после запятой  и возвращающая значение в input

    function getQuantityAfterInt(result) {
        result.toString().includes('.');
        
        if (result.toString().split('.').pop().length>6 && !isNaN(result) && result !== Infinity) {
            mathObj.display.value = result.toFixed(4);
        } else if (isNaN(result) || result == Infinity) {
            setTimeout(clearValueObj, 2000);            
            mathObj.display.value = 'ERROR';            
        } else {
            mathObj.display.value = result;
        }

    }
   
    //заебошим обработчики событий на кнопки с числами

    function getOperand() {
        mathObj.numsBtns.forEach((numBtn) => {
            numBtn.addEventListener('click', () => {
                if (valueObj.operator === '') {                  
                    interpolate(valueObj.frstNum, numBtn);                    
                } else {
                    interpolate(valueObj.secNum, numBtn);
                }
            });
        });
    }
 

    //заебошим обработчик событий на кнопки с операторами
    
    function getOperator() {
        mathObj.operatorBtns.forEach((operatorBtn) => {
            operatorBtn.addEventListener('click', (e) => {
                
                if (e.target.innerHTML === '=') {
                    if (isNaN(parseInt(valueObj.frstNum)) && !isNaN(parseInt(valueObj.secNum))) {
                        valueObj.frstNum.push('0');
                        calculateThisFknShit();
                      } else if (isNaN(parseInt(valueObj.frstNum)) && isNaN(parseInt(valueObj.secNum))) {
                        valueObj.frstNum.push('0');
                        valueObj.secNum.push('0');
                        calculateThisFknShit(); 
                      } else {
                        calculateThisFknShit(); 
                      }
                                                             
                } else if (e.target.innerHTML === 'C') {
                    clearValueObj();
                } else if (e.target.innerHTML === '←') {
                    deleteLastElem();
                } else if (e.target.innerHTML === '√') {
                    sqrtNum();
                } else {
                    valueObj.operator = e.target.innerHTML;
                    console.log(valueObj);
                }

            });
        });
    }

    getOperand();
    getOperator();

});