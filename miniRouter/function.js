"use strict";

var Route = function(){

    this.route = "#!/",
    this.routes = [],

    this.test = function() {
        console.log("Hash was changed!!!", this);
    },

    this.home = function(){
    window.location.hash = this.route;
    },
//проверка на совпадение подстроки
    this.getFragment = function() {

        var fragment = '';
        var match = window.location.hash.match(/#!\/(.*)$/);
            fragment = match ? match[1] : '';
            return fragment;
    },
//проверка на совпадение и запуск коллбэка переданными атрибутами
    this.check = function(f) {

        var fragment = f || this.getFragment();

        for(var i=0; i<this.routes.length; i++) {

            var match = fragment.match(this.routes[i].address);

            if(match) {
                match.shift();
                this.routes[i].call.apply({}, match);
                return this;
            }  

        }
        return this;

    },
//пока просто home
    this.init = function() { 
        this.home();
    },
//добавляем адрес
    this.add = function(address, call) {

        this.routes.push({ address: address, call: call});

    }

}

var route = new Route();

route.add('home', function() {
    console.log('home');
});

route.add('user\/(.*)\/', function(arg) {
    console.log(arg);
});

route.init();

window.addEventListener("hashchange", function(){
    route.check();
});
