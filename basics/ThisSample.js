const apple = {
  name: "apple",
  eat: function() {
    console.log(`eat: `, this.name);
  }
};

const banana = {
  name: "banana"
};
banana.eat = apple.eat;

banana.eat();