const valueBill = document.querySelector('#bill');
const valuePeople = document.querySelector('#number-people');
const valuePerPersonTotal = document.querySelector('#total-person');
const btnReset = document.querySelector('#btn-reset');
const valueTipAmount = document.querySelector('#tip-amount')
const btnCustom = document.querySelector('#btn-custom');
const custonContainer = document.querySelector('#custon-container')
const valueCustomTips = document.querySelector('#custom-tip');
let tips = '0%';

function clean() {
    if(document.querySelector('.current-tip')) {
        const remove = document.querySelector('.current-tip') 
        remove.classList.remove('current-tip')
        remove.style.backgroundColor = '' 
        remove.style.color = '' 
    }
    valuePeople.style.textAlign = 'right';
    valuePeople.style.color = 'black';
}

function totalPerPerson() {
    let bill = valueBill.value;
    let person = valuePeople.value;
    if(bill > 0 && person > 0) {
        valuePerPersonTotal.value = (bill / person).toFixed(2);
    }
    if (document.querySelector('.current-tip')) {          
        const tipSelect = document.querySelector('.current-tip')
        tips = tipSelect.value.replace('%', '');
        tipsTotal =   (+tips / 100) * bill          
        valueTipAmount.value = (tipsTotal / person).toFixed(2)
    }
}


btnReset.addEventListener('click', () => {
    valuePerPersonTotal.value = '';
    valueTipAmount.value = '';
    valueBill.value = '';
    valuePeople.value = '';
    clean()
    if (document.querySelector('#custom-tip')) {
        const valueCustomTips = document.querySelector('#custom-tip')
        valueCustomTips.remove()
        btnCustom.value = 'Custom'
    }
})

btnCustom.addEventListener('click', () => {
if (document.querySelector('#custom-tip')) {
    const valueCustomTips = document.querySelector('#custom-tip')
    valueCustomTips.remove()
} else {
    const newInput = document.createElement('input');
    newInput.type = 'number';
    newInput.id = 'custom-tip';
    newInput.name = 'tip'
    custonContainer.append(newInput)
}
});

document.addEventListener('keyup', () => {
    if (document.querySelector('#custom-tip')) {
        const valueCustomTips = document.querySelector('#custom-tip')
        btnCustom.value = `${valueCustomTips.value}%`
        totalPerPerson()
    }      
})

document.addEventListener('click', (event) => {
    const target = event.target    
if (target.classList.contains('btn-tips')) {    
    if (document.querySelector('.current-tip')) {
         clean()      
    }    
    target.classList.add('current-tip')
    target.style.backgroundColor = 'red'
    target.style.color = 'white'
    totalPerPerson()             
  }
});

valuePeople.addEventListener('keyup', () => {    
    const reg = new RegExp(/^[1-9]\d*$/)
    if (!reg.test(valuePeople.value)) {
        valuePeople.style.textAlign = 'center';
        valuePeople.style.color = 'red';
        valuePeople.value = 'apenas números';
    }
})

valueBill.addEventListener('keyup', totalPerPerson);
valuePeople.addEventListener('keyup', totalPerPerson);

