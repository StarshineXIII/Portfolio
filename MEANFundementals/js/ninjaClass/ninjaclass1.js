function Ninja(name, health, speed, strength){
    var self = this;
    var speed = self.speed;
    var strength = self.strength;
    const privateStats = function(){
        console.log("Name: " + self.name + " Health:" + self.health + " Speed: " + self.speed + " Strength: " + self.strength);
    }
    this.name = name;
    this.health = health;

    this.sayName = function(){
        console.log("My ninja name is " + this.name + "!");
    }

    this.showStats = function(){
        console.log(privateStats);
    }

    this.drinkSake = function(){
        this.health = this.health + 10;
        console.log(this.name + ", you drink sake and gain " + this.health + " health.");
    }

    this.punch = function(puncher){
        var y = puncher;
        if(y instanceof Ninja){
            this.health = this.health - 5;
            console.log(this.health);
    
            console.log(puncher.name + " was punched by " + this.name + " and lost 5 health.");
        }
        else{
            console.log("Don't punch things.")
        }
    }

    this.kick = function(kicker){
        var x = kicker;
        if(x instanceof Ninja){
            this.health = this.health - 15;
            console.log(this.health);
    
            console.log(kicker.name + " was punched by " + this.name + " and lost 15 health.");
        }
        else{
            console.log("Don't kick things.")}
    }
}

const blueNinja = new Ninja("Goemon", 100, 3, 3);
const redNinja = new Ninja("Bill Gates", 100, 3, 3);

redNinja.punch(blueNinja);
blueNinja.punch(redNinja);

redNinja.kick(blueNinja);
blueNinja.kick(redNinja);

const Hayabusa = new Ninja("Hayabusa", 100, 3, 3);

Hayabusa.sayName();

Hayabusa.showStats();

Hayabusa.drinkSake();