
var Vector = Vector || function() {

/*если длинна аргументов равна 2 то х равно первому аргументу а у второму иначе по 0*/
    this.x = arguments.length == 2 ? arguments[0] : 0;
    this.y = arguments.length == 2 ? arguments[1] : 0;
}


/*метод установления координат для объекта вектора ЕСЛИ ПРИ СОЗДАНИИ ОНИ НЕ БЫЛИ УКАЗАНЫ*/
/*******************************************************************/
Vector.prototype.set = function(x,y) {
    this.x = x;
    this.y = y;
    return this;
}


// operate on self если 1 аргумент умножаем координаты на него по очереди и возвращаем изменённые

Vector.scale = function() {
//функция масштабирования
    if( arguments.length == 1) {        
        this.x *= arguments[0]; this.y *= arguments[0];
        return this;
    } else if( arguments.length == 2){  // operand, k
        return new Vector( arguments[0].x * arguments[1], arguments[0].y * arguments[1]);
    }
}

//заливаем функцию в прототип с аргументами 

Vector.prototype.scale = function(){ this.constructor.scale.apply(this, arguments); }


/*******************************************************************/



//ДЛИННА 
//метод вычисляющий расстояние между точками
//ВОЗВОДИТ В КВАДРАТНЫЙ КОРЕНЬ СУММУ КООРДИНАТ ВО ВТОРОЙ СТЕПЕНИ
//расстояние до точки до которой нужно дойти
/*******************************************************************/

Vector.prototype.length = function(){
    return Math.sqrt( Math.pow(this.x, 2) + Math.pow( this.y, 2));
}


//МЕТОД ЕСЛИ ДЛИННА НА КОТОРУЮ НУЖНО ПЕРЕМЕСТИТЬСЯ ШАРУ ВЫШЕ ЛИМИТА ОНА ДЕЛИТЬСЯ НА ЛИМИТ
/*******************************************************************/

Vector.prototype.limit = function( lim) {
    //console.log(this.length());
    //this это объект Vector
    //len это длинна, равняется длинне объекта
    //lim статичная величина передающася в качестве атрибута
    var len = this.length();
    if( len > lim) this.scale( lim/len);
    return this;
}



//МЕТОД ИЗМЕНЕНИЯ(СМЕНЫ) КООРДИНАТ
/*******************************************************************/
Vector.add = function(){

    //если аргумент один и этот аргумент имеет свойство х плюсуем к Х и У этого объекта
    // переданные аргументы и возвращаем объект

    if( arguments.length == 1  &&  arguments[0].hasOwnProperty('x')) {      // operate on self
        this.x += arguments[0].x; this.y += arguments[0].y;
        return this;
    }

    // если аргумента два возвращаем новый объект Vector с суммами старых и переданных атрибутов

     else if( arguments.length == 2){  // vector A, vector B
        return new Vector( arguments[1].x + arguments[0].x, arguments[1].y + arguments[0].y);
    } else {
        console.log("shit:", arguments[0]);
    }
}

Vector.prototype.add = function(){ this.constructor.add.apply(this, arguments); }

/****************************************************************************/


//метод обратный add

Vector.sub = function(){
    if( arguments.length == 1) {        // operate on self
        this.x -= arguments[0].x; this.y -= arguments[0].y;
        return this;
    } else if( arguments.length == 2){  // vector A, vector B
        return new Vector( arguments[0].x - arguments[1].x, arguments[0].y - arguments[1].y);
    }
}
/*вызывает метод родителя передавая ему текущие аргументы*/
//Vector.prototype.sub = function(){ this.constructor.sub.apply(this, arguments); }

/*********************/


//МЕТОД УСТАНАВЛИВАЕТ РАССТОЯНИЕ МЕЖДУ РАДИУСОМ ОКРУЖНОСТИ И РАДИУСОМ КОНТЕЙНЕРА


Vector.radDifferent = function(R) {
    //координаты центра поля - координаты окружности

    this.containerRadius = {
    x: F.w/2,
    y: F.w/2
  }


    this.circleRadius = {
    x: R.o/2,
    y: R.o/2
  }

//расстояние между координатами большого и маленького круга
    this.xDiffer = this.containerRadius.x - this.x,
    this.yDiffer = this.containerRadius.y - this.y;
    
    
    //функция расстояния между точками

    this.lengthBetweenCircle = Math.sqrt( Math.pow(this.xDiffer, 2) + Math.pow(this.yDiffer, 2));     

  }
 
  Vector.prototype.radDifferent = function(){ this.constructor.radDifferent.apply(this, arguments); }


  /*********************/

//  Field
var F = {
    w: 360,
    h: 360,
}


// Circle 
var C = {
    $el: $('#circle'),
    mass:   1,          
    dumping: 57,         
    R: {i:1, o:50},    
    P: new Vector(),    
    V: new Vector(100,50), 
    A: new Vector(),   

    ts_prev: null,   

    stable: false,     

    frame: function(ts) {
        var dt;
        if( !this.ts_prev) return (this.ts_prev = ts); 

        dt = (ts - this.ts_prev)/1000; 
        if( dt > 1000 ) {
            console.log('too big dt');
            return;
        }
        
        var B = jQuery.extend({}, this.P);  //копируем объект с информацией о позиции до движения в переменную В position Before the move
    
        this.P.add( Vector.scale( this.V, dt))
        this.translate();
        


        var CM = Vector.sub( M.P, this.P);
        var dist = CM.length();

        
        if( dist > this.R.o) {
  
        } else if( dist < this.R.i) {   

        } else {
            // в активной зоне придать ускорение
            this.V.add( Vector.sub( this.P, M.P));

        }


        // обновить ускорение и скорость
        this.V.add( Vector.scale( this.A, dt));
        this.V.scale( Math.sqrt( dt * this.dumping));

        if( this.V.length() < 1) this.V.scale(0);
        this.V.limit(1000);

        this.ts_prev = ts;
    },
    translate: function(){

        this.P.radDifferent(this.R);
console.log(this.P.x);
console.log(this.P.lengthBetweenCircle);
       if( this.P.lengthBetweenCircle > 130 && this.P.lengthBetweenCircle <= 140) {
            this.V.x *= -1.4;
            this.V.y *= -1.4;
        } 

        if (this.P.lengthBetweenCircle > 140 && this.P.x > 0 && this.P.x < 310 || this.P.lengthBetweenCircle > 140 && this.P.y > 0 && this.P.y < 310){
            
            this.P.x = 145;
            this.P.y = 145;
   } 

        this.$el.attr('transform', "translate("+Math.floor(this.P.x)+","+Math.floor(this.P.y)+")");
    },
    mouseEnabled: true,
    mouseOff: function(){ this.mouseEnabled = false; },
    refresh: null,
    update: function(ts){
        this.frame(ts);
        if( !this.stable) {
            this.refresh 
            = window.requestAnimationFrame( this.update.bind(this));
        } else {
            console.log("parked");
        }
    },
    init: function() {
        this.P.set( F.w/2, F.h/2);
        this.update();
    }
    
};

var M = {   

    Off: new Vector(31, 31),  
    P: new Vector(),
    hasMoved: function(e) {

        this.P.x = e.pageX-this.Off.x; 
        this.P.y = e.pageY-this.Off.y;

    },
    init: function(){
        $('body').on('mousemove', this.hasMoved.bind(this));
    }
};


M.init();
C.init();