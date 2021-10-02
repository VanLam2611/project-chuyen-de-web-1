//Click button 'Start'
const food = document.querySelector('#body-game .food-client img');
const start = document.querySelector('#start');
const timeOut = document.querySelector('.time-out');
const TIME_PLAY = document.querySelector('#time-game');
const gas_stove = document.querySelector('#body-game .gas-stove');
const broom = document.querySelector('#broom');
const MONEY = document.querySelector('#body-game .money');
const gas_wrong = document.querySelector('#body-game .cook-wrong');
//Items in right body
const menu_item = document.querySelector('#body-game .menu-item');
const pan = document.querySelector('#body-game .pan');
const child_pan = document.querySelector('#body-game .pan .child-pan');
//Time of gas-stove
let gas_time = 3000;
let gas_time_2 = 3000;

//Defaul food
let DEFAULT_FOOD = '';
let DEFAULT_ID = '';
//Value set attribute of img meterial
let DF_IMG = '';
//Array meterial after click
let PAN_FOOD = new Array();
//Array random food
let RD_FOOD = [];
let RD_NAME_FOOD = [];
//Total meterial
let TOTAL_METERIAL = ['public/images/material/ca-chua.png','public/images/material/eag.PNG','public/images/material/meet-buff.PNG','public/images/material/potato.png','public/images/material/three-roi.png','public/images/material/xuc-xich.png','public/images/material/hat.PNG','public/images/material/sua.PNG','public/images/material/tom.PNG','public/images/material/dog.jpg'];
//Number food choose right
let NUM_FOOD = 0;
//Win or Lose
let WIN = false;
//Create value for money
let money = 0;
// let foodClient = ['public/images/pizza.jpg','public/images/rice-meet.jpg','public/images/hamberger.jpg'];
let foodClient = new Array();
foodClient[0] = new Array('0', 'public/images/pizza.jpg')
foodClient[1] = new Array('1'   , 'public/images/rice-meet.jpg')   
foodClient[2] = new Array('2', 'public/images/hamberger.jpg')
foodClient[3] = new Array('3', 'public/images/ngucoc.jpg')
foodClient[4] = new Array('4', 'public/images/suptom.png')
// foodClient[5] = new Array('5', 'public/images/cake.png')
//Meterial
let meterrial = new Array();
meterrial[0] = ['public/images/material/meet-buff.PNG','public/images/material/eag.PNG','public/images/material/three-roi.png'];
meterrial[1] = ['public/images/material/ca-chua.png','public/images/material/xuc-xich.png','public/images/material/three-roi.png'];
meterrial[2] = ['public/images/material/three-roi.png','public/images/material/potato.png'];
meterrial[3] = ['public/images/material/hat.PNG','public/images/material/potato.png','public/images/material/sua.PNG'];
meterrial[4] = ['public/images/material/tom.PNG','public/images/material/xuc-xich.png','public/images/material/ca-chua.png'];
// meterrial[5] = ['public/images/material/eag.png','public/images/material/sua.PNG','public/images/material/pan.png'];

//Create array contain meterials temp
let CONTAIN_METERIAL = [];

start.onclick = function(){
    play_audio('play');
    this.style.display = 'none';
    timeOut.style.display = 'block';
    timeOut.classList.add('addAnimation');
    //Second 3
    let countdown3 = setTimeout(() => {
        timeOut.textContent = 3;
    }, 1000);
    //Second 2
    let removeAdd1 = setTimeout(()=>{
        timeOut.classList.remove('addAnimation');
    }, 1000);
    let countdown2 = setTimeout(() => {
        timeOut.classList.add('addAnimation');
        timeOut.textContent = 2;
    }, 1002);
    //Second 1
    let removeAdd3 = setTimeout(()=>{
        timeOut.classList.remove('addAnimation');
    }, 2000);
    let countdown1 = setTimeout(() => {
        timeOut.classList.add('addAnimation');
        timeOut.textContent = 1;
    }, 2002);
    //Second 0
    let removeAdd0 = setTimeout(()=>{
        timeOut.classList.remove('addAnimation');
    }, 3000);
    let countdown0 = setTimeout(() => {
        timeOut.classList.add('addAnimation');
        timeOut.textContent = 0;
    }, 3002);

    let setNoneTimeOut = setTimeout(()=>{
        timeOut.style.display = 'none';
    },4000);

    let time = setTimeout(() => {
        food.style.display = 'block';
        TIME_PLAY.style.display = 'block'
        MONEY.style.display = 'block';
        menu_item.style.display = 'flex'
        gas_stove.style.display = 'block'
        broom.style.display = 'block';
        pan.style.display = 'block'

        timeGame()
        // update();
        showImgMeterial();
        // checkTimeGame();
    }, 4000);
    
    //Get url food and ID of this food
    let i = getRandomInt(0, foodClient.length);
    RD_FOOD.push(i);
    RD_NAME_FOOD.push(foodClient[i][1])
    DEFAULT_FOOD = foodClient[i][1];
    DEFAULT_ID = foodClient[i][0];
    food.setAttribute('src', DEFAULT_FOOD);
    
}

//Function random food
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); 
}


/**
 * Set img for pan
 */
pan.addEventListener('click', ()=>{
    if(DF_IMG != ''){
        // child_pan.setAttribute('src', DF_IMG);   
        let temp = "<img src='" + DF_IMG +"' class='img-fluid' alt=''>";
        child_pan.insertAdjacentHTML('beforeend', temp);
        PAN_FOOD.push(DF_IMG);
    }
})
/**
 * Start cooking
 */
const cook = document.querySelector('#body-game .gas-stove #cooking');
let check_clear = true;
cook.addEventListener('click', function(){
    if (check_clear == true) {
        check_clear = false;
        let v_time = gas_time_2;
        cook.textContent =  gas_time_2/1000;
        gas_time_2 = gas_time_2-1000;
        let setTextTime = setInterval(function(){
            cook.textContent = gas_time_2/1000;
            gas_time_2 = gas_time_2 - 1000;
            if (gas_time_2 == -1000) {
                gas_time_2 = v_time;
                check_clear = true;
                let clearText = clearInterval(setTextTime);
            }
        },1000)
    }
    
    
    let setTimeFood = setTimeout(function(){
        if(JSON.stringify(meterrial[DEFAULT_ID])==JSON.stringify(PAN_FOOD)) {
            let row_random = 0;
            let a = 0;
            for (let i = 0; i < foodClient.length; i++) {
                a = getRandomInt(0,foodClient.length);
                // do {
                //     a = getRandomInt(0,foodClient.length);
                //     b++;
                // } while (a == RD_FOOD[b]);
                console.log(a);
                for (let j = 0; j < RD_FOOD.length; j++) {
                    // if(RD_FOOD[j] != a)
                    // {
                    //     row_random++;
                    // }
                    if (RD_NAME_FOOD[j] != foodClient[i]) {
                        row_random++;
                    }
                }
                // console.log(RD_FOOD);
                // console.log(row_random);
                if (row_random == RD_FOOD.length) {
                    console.log('Banwgd');
                    NUM_FOOD++;
                    RD_FOOD.push(a);
                    DEFAULT_FOOD = foodClient[a][1];
                    DEFAULT_ID = foodClient[a][0];
                    PAN_FOOD = [];
                    food.setAttribute('src', DEFAULT_FOOD);
                    $("#show-meterial").children().remove();
                    $("#parent").children().remove();
                    rd_meterial_right();
                    gas_wrong.style.visibility = 'hidden';
                    
                    if (NUM_FOOD === 3) {
                        WIN = true;
                        money = money + 100;
                        MONEY.textContent = money;
                        time_win()
                        // getResult();
                    }
                }
                
                return;
            }
        }
        else{
            gas_wrong.style.visibility = 'visible'
        }
    }, gas_time);
    
})
/**
 * Check time game
 */
 let time = 60;
const TIME_GAME = document.querySelector('#time-game')
let timeGame = function(){
    let setTimeGame = setInterval(function(){
        TIME_GAME.textContent = time;
        time--;
        if (time == -1) {
            time_lose()
            return;
        }
        if (WIN == true) {
            time++;
        }
    }, 1000);

}
const form_win = document.querySelector('.form-win');
const form_lose = document.querySelector('.form-lose');
function time_win(){
    console.log('WIN');
    TIME_PLAY.style.display = 'none';
    show.style.display = 'none';
    food.style.display = 'none';
    pan.style.display = 'none';
    gas_stove.style.display = 'none';
    broom.style.display = 'none';
    form_win.style.visibility = 'visible'
}
function time_lose(){
    TIME_PLAY.style.display = 'none';
    show.style.display = 'none';
    food.style.display = 'none';
    pan.style.display = 'none';
    gas_stove.style.display = 'none';
    broom.style.display = 'none';
    form_lose.style.visibility = 'visible'
}
/**
 * Show meterial after receive food
 */
const show = document.querySelector('#body-game .meterial #show-meterial');
let showImgMeterial = function(){
    //Check array all meterial with meterial of current food 
    for(i=0;i<=TOTAL_METERIAL.length-1;i++){
        let check_our_roll = 0;
        for(let j=0; j < meterrial[DEFAULT_ID].length; j++){
            if (meterrial[DEFAULT_ID][j] != TOTAL_METERIAL[i]) {
                check_our_roll++;
            }
        }
        if (check_our_roll === meterrial[DEFAULT_ID].length) {
            CONTAIN_METERIAL.push(TOTAL_METERIAL[i]);
        }
    }

    for (let index = 0; index < meterrial[DEFAULT_ID].length; index++) {
        CONTAIN_METERIAL.push(meterrial[DEFAULT_ID][index]);
    }
    rd_meterial_right();
}
/**
 * Random meterial when choose right
 */
let rd_meterial_right = function(){
    let arr_repeat = [];
    for (let i = 0; i < CONTAIN_METERIAL.length; i++) {
        let temp = getRandomInt(0, CONTAIN_METERIAL.length);
        if (arr_repeat.length === 0) {
            arr_repeat.push(temp);
            let card_img = "<img src='"+ CONTAIN_METERIAL[temp] +"' class='img-fluid mr-1' alt=''>";
                show.insertAdjacentHTML('beforeend', card_img);
        }
        else{
            let checked = 0;
            for (let j = 0; j < arr_repeat.length; j++) {
                if (arr_repeat[j] !== temp) {
                    checked++;
                }   
            }
            if (checked === arr_repeat.length) {
                arr_repeat.push(temp);
                let card_img = "<img src='"+ CONTAIN_METERIAL[temp] +"' class='img-fluid mr-1' alt=''>";
                show.insertAdjacentHTML('beforeend', card_img);
            }
            else{
                i--;
            }
        }
    }
    /**
     * Set border of meterial after click
     */
    const imgItem = document.querySelectorAll('#body-game .meterial img');
    //Choose meterial
    let chooseMeterial = function(){
        imgItem.forEach((e)=>{
            e.style.border = '2px solid transparent';
        })
    }
    imgItem.forEach((e)=> {
        
        e.addEventListener('click',function(){
            chooseMeterial();
            e.style.border = '2px solid red';
            DF_IMG = e.getAttribute('src');
        })
    })
}
/**
 * Remove meterial in the pan
 */
$('#broom').on('click',function () {
    $("#parent").children().remove();
    DF_IMG = '';
    PAN_FOOD = [];
});

/**
 * Continue game when player win
 */
const CONTINUES = document.querySelector('#continue');
CONTINUES.addEventListener('click', function(){
    WIN = false;
    time = 60;
    DEFAULT_FOOD = '';
    DEFAULT_ID = '';
    //Value set attribute of img meterial
    DF_IMG = '';
    //Array meterial after click
    PAN_FOOD = [];
    //Array random food
    RD_FOOD = [];
    //Number food choose right
    NUM_FOOD = 0;
    //Get url food and ID of this food
    let i = getRandomInt(0, foodClient.length);
    RD_FOOD.push(i);
    DEFAULT_FOOD = foodClient[i][1];
    DEFAULT_ID = foodClient[i][0];
    food.setAttribute('src', DEFAULT_FOOD);
    
    TIME_PLAY.style.display = 'block';
    show.style.display = 'block';
    food.style.display = 'block';
    pan.style.display = 'block';
    gas_stove.style.display = 'block';
    broom.style.display = 'block';
    form_win.style.visibility = 'hidden';
})
/**
 * Try game when player lose
 */
 const TRY = document.querySelector('#try-again');
 TRY.addEventListener('click', function(){
     WIN = false;
     time = 60;
     DEFAULT_FOOD = '';
     DEFAULT_ID = '';
     //Value set attribute of img meterial
     DF_IMG = '';
     //Array meterial after click
     PAN_FOOD = [];
     //Array random food
     RD_FOOD = [];
     //Number food choose right
     NUM_FOOD = 0;
     //Get url food and ID of this food
     let i = getRandomInt(0, foodClient.length);
     RD_FOOD.push(i);
     DEFAULT_FOOD = foodClient[i][1];
     DEFAULT_ID = foodClient[i][0];
     food.setAttribute('src', DEFAULT_FOOD);
     
     TIME_PLAY.style.display = 'block';
     show.style.display = 'block';
     food.style.display = 'block';
     pan.style.display = 'block';
     gas_stove.style.display = 'block';
     broom.style.display = 'block';
     form_lose.style.visibility = 'hidden';
 })

 /**
  * Music in game
  */
 let check_music = true
const btn_music = document.querySelector('#body-game .item-music');
btn_music.addEventListener('click', function(){
    btn_music.classList.toggle('music');
    check_music = !check_music;
    if (check_music == false) {
        play_audio('stop');
    }
    else if(check_music == true){
        play_audio('play');
    }
})

/**
 * Buy gas-stove
 */
let array_image_gas = ['public/images/gas-2.png','public/images/gas-stove.png'];
const IMG_GAS = document.querySelector('#gas-stove');
const buy_gas = document.querySelector('#body-game .buy-gas');
const btn_buy = document.querySelectorAll('#body-game .buy-gas .get-buy');
let check_gas = false;
function showBuyGas(){
    check_gas = !check_gas;
    if (check_gas == true) {
        buy_gas.style.display = 'block';
    }
    else{
        buy_gas.style.display = 'none';
    }
}
function setImageGas(){
    btn_buy.forEach((e,i)=>{
        e.addEventListener('click', function(){
            if (money >= (e.textContent*1)) {
                money = money - e.textContent*1;
                gas_time = 1000;
                gas_time_2 = 1000;
                IMG_GAS.setAttribute('src', array_image_gas[i])
                MONEY.textContent = money;
                check_gas = !check_gas;
                buy_gas.style.display = 'none';
                e.style.display = 'none'
            }
            else{
                console.log('Khong du tien');
            }
        })
    })
}
setImageGas()
 