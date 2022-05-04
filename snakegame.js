         /**
         * Created by HemantSingh on 7/31/2017.
         */
          function Scoreboard(options) {
            if (!options) options= {};
            
            this._message = options.message || '';
            this._score = options.score || 0;
            
            if (options.onTimeExpired) {
            this._countdown = new __Countdown({
                duration: options.countDownFrom
            });
            this.onTimeExpired(
                options.onTimeExpired ? options.onTimeExpired : function(){}
            );
            }
            }
            
            /****
            * Message
            */
            Scoreboard.prototype.showMessage = function() {
            this.ensureDom();
            this.message_el.style.display = 'block';
            return this;
            };
            
            Scoreboard.prototype.hideMessage = function() {
            this.message_el.style.display = 'none';
            return this;
            };
            
            Scoreboard.prototype.clearMessage = function() {
            this.setMessage();
            return this;
            };
            
            Scoreboard.prototype.setMessage = function(message) {
            if (!message) message = '';
            
            this.showMessage();
            this._message = message;
            this.message_el.innerHTML = this._message;
            
            this.message_el.scrollTop = this.message_el.scrollHeight;
            
            return this;
            };
            
            Scoreboard.prototype.appendMessage = function(message) {
            function div(s) { return '<div>' + s + '</div>'; }
            this.setMessage((this._message || '') + div(message));
            return this;
            };
            
            Scoreboard.prototype.addMessage = Scoreboard.prototype.appendMessage;
            Scoreboard.prototype.message = Scoreboard.prototype.setMessage;
            
            // Message
            
            /*****
            * Help
            */
            Scoreboard.prototype.showHelp = function() {
            this.ensureDom();
            this.help_el.style.display = 'block';
            return this;
            };
            
            Scoreboard.prototype.hideHelp = function() {
            this.help_el.style.display = 'none';
            return this;
            };
            
            Scoreboard.prototype.toggleHelp = function() {
            this.help_el.style.display = this.help_el.style.display == 'none' ?
            'block' : 'none';
            return this;
            };
            
            Scoreboard.prototype.showHelpFooter = function() {
            this.ensureDom();
            this.help_footer.style.display = 'block';
            return this;
            };
            
            Scoreboard.prototype.setHelp = function(help) {
            this.showHelpFooter();
            this._help = help;
            this.help_el.innerHTML = this._help;
            
            this.help_el.scrollTop = this.help_el.scrollHeight;
            
            return this;
            };
            
            Scoreboard.prototype.addHelp = Scoreboard.prototype.setHelp;
            Scoreboard.prototype.help = Scoreboard.prototype.setHelp;
            
            // Help
            
            /****
            * Score
            */
            
            Scoreboard.prototype.showScore = function() {
            this.ensureDom();
            this.score_el.style.display = 'block';
            return this;
            };
            
            
            Scoreboard.prototype.setScore = function(score) {
            this.showScore();
            this._score = score || 0;
            
            this.score_el.innerHTML = "Score: " + this._score;
            
            return this;
            };
            
            Scoreboard.prototype.getScore = function() {
            return this._score;
            };
            
            Scoreboard.prototype.score = Scoreboard.prototype.setScore;
            
            Scoreboard.prototype.addPoints = function(points) {
            this.setScore(this._score + points);
            };
            
            Scoreboard.prototype.subtractPoints = function(points) {
            this.setScore(this._score - points);
            };
            
            
            // Timer
            
            /*****
            * Timer
            */
            
            Scoreboard.prototype.showTimer = function() {
            this.ensureDom();
            this._showTimer = true;
            this.timer_el.style.display = 'block';
            this.setTimer();
            return this;
            };
            Scoreboard.prototype.timer = Scoreboard.prototype.showTimer;
            
            Scoreboard.prototype.hideTimer = function() {
            this.ensureDom();
            this._showTimer = false;
            this.timer_el.style.display = 'none';
            return this;
            };
            
            Scoreboard.prototype.setTimer = function() {
            var that = this;
            if (!this._timer) this._timer = new __Timer();
            this._timer.onUpdate(function(time) {
            that.timer_el.innerHTML = 'Time: ' + time;
            });
            this.timer_el.style.display = this._showTimer ? 'block' : 'none';
            };
            
            Scoreboard.prototype.stopTimer = function() {
            this._timer.stop();
            };
            
            Scoreboard.prototype.startTimer = function() {
            this._timer.start();
            };
            
            Scoreboard.prototype.resetTimer = function() {
            this._timer.reset();
            };
            
            Scoreboard.prototype.getTime = function() {
            return this._timer.diff() / 1000;
            };
            
            // Timer
            
            /*****
            * Countdown
            */
            
            Scoreboard.prototype.showCountdown = function(duration) {
            this.ensureDom();
            this._showCountdown = true;
            this.countdown_el.style.display = 'block';
            this.setCountdown(duration);
            return this;
            };
            
            Scoreboard.prototype.countdown = Scoreboard.prototype.showCountdown;
            
            Scoreboard.prototype.hideCountdown = function() {
            this.ensureDom();
            this._showCountdown = false;
            this.countdown_el.style.display = 'none';
            return this;
            };
            
            Scoreboard.prototype.setCountdown = function(duration) {
            var that = this;
            
            if (!this._countdown) this._countdown = new __Countdown({
            duration: duration
            });
            
            if (duration) this._countdown.reset(duration);
            this._countdown.onUpdate(function(time) {
            that.countdown_el.innerHTML = 'Remaining: ' + time;
            });
            this.countdown_el.style.display = this._showCountdown ? 'block' : 'none';
            };
            
            Scoreboard.prototype.stopCountdown = function() {
            this._countdown.stop();
            };
            
            Scoreboard.prototype.startCountdown = function() {
            this._countdown.start();
            };
            
            Scoreboard.prototype.resetCountdown = function(time) {
            this._countdown.reset(time);
            };
            
            Scoreboard.prototype.getTimeRemaining = function() {
            return this._countdown.diff() / 1000;
            };
            
            Scoreboard.prototype.onTimeExpired = function(cb) {
            if (!cb) return;
            
            var that = this;
            this._on_time_expired = (typeof(cb) == 'string') ?
            function() { that.setMessage(cb); } : cb;
            
            this._countdown.onTimeExpired(function() {
            that.stopCountdown();
            that._on_time_expired();
            });
            };
            
            // Countdown
            
            Scoreboard.prototype.ensureDom = function() {
            if (this.el) return;
            
            var el = this.el = document.createElement('div');
            el.id = 'scoreboard';
            el.style.position = 'absolute';
            el.style.backgroundColor = 'black';
            el.style.opacity = 0.7;
            el.style.borderRadius = "5px";
            el.style.padding = "5px 20px";
            el.style.right = "50px";
            el.style.top = "75px";
            el.style.width = (window.innerWidth * 0.2) + "px";
            el.style.minWidth = '200px';
            
            el.style.color = 'yellow';
            el.style.fontFamily = 'Arial, San Serif';
            el.style.fontWeight = 'bold';
            el.style.fontSize = (window.innerHeight * 0.033) + "px";
            
            var countdown_el = this.countdown_el = document.createElement('div');
            el.appendChild(countdown_el);
            
            var timer_el = this.timer_el = document.createElement('div');
            el.appendChild(timer_el);
            
            var score_el = this.score_el = document.createElement('div');
            el.appendChild(score_el);
            
            var message_el = this.message_el = document.createElement('div');
            message_el.style.fontWeight = 'normal';
            message_el.style.color = 'white';
            message_el.style.maxHeight = (window.innerHeight * 0.2) + "px";
            message_el.style.overflowY = 'auto';
            el.appendChild(message_el);
            
            var help_el = this.help_el = document.createElement('div');
            help_el.style.display = 'none';
            help_el.style.fontWeight = 'normal';
            help_el.style.color = 'white';
            help_el.style.fontSize = (window.innerHeight * 0.028) + "px";
            help_el.style.borderTop = "1px #676767 solid";
            help_el.style.marginTop = '5px';
            help_el.style.paddingTop = '3px';
            help_el.style.maxHeight = (window.innerHeight * 0.2) + "px";
            help_el.style.overflowY = 'auto';
            el.appendChild(help_el);
            
            var help_footer = this.help_footer = document.createElement('div');
            help_footer.style.display = 'none';
            help_footer.style.fontWeight = 'normal';
            help_footer.style.color = 'white';
            help_footer.style.maxHeight = (window.innerHeight * 0.2) + "px";
            help_footer.style.fontSize = (window.innerHeight * 0.02) + "px";
            help_footer.style.borderTop = "1px #676767 solid";
            help_footer.style.marginTop = '5px';
            el.appendChild(help_footer);
            
            var that = this;
            document.addEventListener('keypress', function(event) {
            if (event.keyCode == 63) that.toggleHelp();
            if (event.keyCode == 47) that.toggleHelp();
            });
            
            document.body.appendChild(el);
            };
            
            /****
            * Timer Class
            */
            function __Timer() {
            this._start = (new Date).getTime();
            }
            
            __Timer.prototype.toString = function() {
            var minutes = "" + this._minutes(),
            seconds = "" + this._seconds();
            
            if (minutes.length == 1) minutes = "0" + minutes;
            if (seconds.length == 1) seconds = "0" + seconds;
            
            return minutes + ":" + seconds;
            };
            
            __Timer.prototype.diff = function() {
            var now = this.last();
            return now - this._start;
            };
            
            __Timer.prototype.last = function() {
            if (this._last) return this._last;
            return (new Date).getTime();
            };
            
            __Timer.prototype.stop = function() {
            if (this._last) return;
            this._last = (new Date).getTime();
            };
            
            __Timer.prototype.start = function() {
            this._last = undefined;
            };
            
            __Timer.prototype.reset = function() {
            this._start = (new Date).getTime();
            this.start();
            };
            
            __Timer.prototype._minutes = function() {
            return Math.floor(this.diff()/(60*1000));
            };
            
            __Timer.prototype._seconds = function() {
            var ms = this.diff() % (60*1000);
            return Math.floor(ms / 1000);
            };
            
            __Timer.prototype.seconds = function() {
            return this.diff() / (60*1000);
            };
            
            __Timer.prototype.onUpdate = function(cb) {
            var that = this;
            cb(that.toString());
            setInterval(function() {cb(that.toString());}, 500);
            };
            
            // Timer
            
            /*****
            * Countdown
            */
            
            function __Countdown(options) {
            this._start = (new Date).getTime();
            this.duration = options.duration || 60;
            this._onTimeExpired = function(){};
            this.waitForTimeExpired();
            }
            
            __Countdown.prototype = new __Timer();
            
            __Countdown.prototype.diff = function() {
            var now = this.last(),
            diff = now - this._start;
            
            if (diff > this.duration * 1000) return 0;
            return this.duration * 1000 - diff;
            };
            
            __Countdown.prototype.reset = function(duration) {
            if (duration) this.duration = duration;
            this._start = (new Date).getTime();
            this.waitForTimeExpired();
            this.start();
            };
            
            __Countdown.prototype.waitForTimeExpired = function() {
            var that = this;
            
            function _wait() {
            if (that.diff() > 0) return setTimeout(_wait, 500);
            that.stop();
            return that._onTimeExpired(that.toString());
            }
            _wait();
            };
            
            __Countdown.prototype.onTimeExpired = function(cb) {
            this._onTimeExpired = cb;
            };
            
            // Countdown// .120 seconds is starting interval for snake.
            var snakeMovementInterval = 120;
            var canvas = document.getElementById("canvas");
            var ctx = canvas.getContext("2d");
            var width = canvas.width;
            var height = canvas.height;
            var blockSize = 10;
            var widthInBlocks = width / blockSize;
            var heightInBlocks = height / blockSize;
            var score = 0;
            var drawBorder = function () {
                ctx.fillStyle = "Gray";
                ctx.fillRect(0, 0, width, blockSize);
                ctx.fillRect(0, height - blockSize, width, blockSize);
                ctx.fillRect(0, 0, blockSize, height);
                ctx.fillRect(width - blockSize, 0, blockSize, height);
            };
            var drawScore = function () {
                var scoreboard = new Scoreboard();
                scoreboard.help(
                        " Use the arrow keys to move around," +
                        " Eat the apple," +
                        " Don't collide with yourself or the wall," +
                        " Press F5 to play the game again after the game is over" +
                        " Extra Information: The speed of the snake increases by 5% everytime the score increases"
                );
                scoreboard.showHelp();
                scoreboard.score(score);
            };
            var gameOver = function () {
                var scoreboard = new Scoreboard();
                clearInterval(intervalid);
                ctx.font = "150px Courier";
                ctx.fillStyle = "Black";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText('Game Over', width / 2, height / 2);
                scoreboard.message("GAME OVER!")
            
            };
            // Set the canvas to 80% of width and height
            function resizeCanvas() {
                var canvasNode = document.getElementById('canvas');
                var pw = canvasNode.parentNode.clientWidth;
                var ph = canvasNode.parentNode.clientHeight;
                canvasNode.height = pw * 0.5 * (canvasNode.height / canvasNode.width);
                canvasNode.width = pw * 0.5;
                canvasNode.style.top = (ph - canvasNode.height) / 2 + "px";
                canvasNode.style.left = (pw - canvasNode.width) / 2 + "px";
                width = canvasNode.width;
                height = canvasNode.height;
                widthInBlocks = width / blockSize;
                heightInBlocks = height / blockSize;
            }
            
            // On load and resize we will resize the game canvas.
            window.onload = window.onresize = resizeCanvas;
            var circle = function (x, y, radius, fillCircle) {
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2, false);
                if (fillCircle) {
                    ctx.fill()
                }
                else {
                    ctx.stroke()
                }
            };
            var Block = function (col, row) {
                this.col = col;
                this.row = row;
            };
            Block.prototype.drawSquare = function () {
                var x = this.col * blockSize;
                var y = this.row * blockSize;
            
                ctx.fillStyle = "Yellow";
                ctx.fillRect(x, y, blockSize, blockSize);
            };
            
            Block.prototype.drawCircle = function (color) {
                var centerX = this.col * blockSize + blockSize / 2;
                var centerY = this.row * blockSize + blockSize / 2;
                ctx.fillStyle = color;
                circle(centerX, centerY, blockSize / 2, true);
            };
            Block.prototype.equal = function (otherBlock) {
                return this.col === otherBlock.col && this.row === otherBlock.row
            };
            var Snake = function () {
                this.segments = [
                    new Block(7, 5),
                    new Block(6, 5),
                    new Block(5, 5)
                ];
                this.direction = "right";
                this.nextDirection = "right";
            
            };
            Snake.prototype.draw = function () {
                for (var i = 0; i < this.segments.length; i++) {
                    this.segments[i].drawSquare();
                }
            };
            Snake.prototype.move = function () {
                var head = this.segments[0];
                var newHead;
            
                if (this.direction !== this.nextDirection) {
                    //alert("Changing direction to : " + this.nextDirection + " from direction: " + this.direction);
                }
                this.direction = this.nextDirection;
            
                if (this.direction === "right") {
                    newHead = new Block(head.col + 1, head.row);
                } else if (this.direction === "bottom") {
                    newHead = new Block(head.col, head.row + 1);
                } else if (this.direction === "left") {
                    newHead = new Block(head.col - 1, head.row);
                } else if (this.direction === "up") {
                    newHead = new Block(head.col, head.row - 1);
                }
            
                if (this.checkCollision(newHead)) {
                    gameOver();
                    return;
                }
                this.segments.unshift(newHead);
                if (newHead.equal(apple.position)) {
                    score++;
                    apple.move();
            
                    // After score is changed, we will make snake 5% faster
                    // if score is divided by 3
                    if ((score % 3) === 0) {
                        // Make time 5% less
                        snakeMovementInterval = snakeMovementInterval - (snakeMovementInterval * 5 / 100);
                    }
            
                } else {
                    this.segments.pop()
                }
            };
            Snake.prototype.checkCollision = function (head) {
                var leftCollision = (head.col === 0);
                var topCollision = (head.row === 0);
                var rightCollision = (head.col === widthInBlocks-1);
                var bottomCollision = (head.row === heightInBlocks-1);
            
                var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
            
                var selfCollision = false;
            
                for (var i = 1; i < this.segments.length; i++) {
                    if (head.equal(this.segments[i])) {
                        selfCollision = true
                    }
                }
                return selfCollision || wallCollision
            };
            
            Snake.prototype.setDirection = function (newDirection) {
            
                //alert("Changing direction to " + newDirection);
                if (this.direction === "up" && newDirection === "bottom") {
                    //alert("this is not able to be done");
                    return;
                } else if (this.direction === "right" && newDirection === 'left') {
                    //alert("this is not able to be done");
                    return;
                } else if (this.direction === "bottom" && newDirection === 'up') {
                    //alert("this is not able to be done");
                    return;
                } else if (this.direction === "left" && newDirection === 'right') {
                    //alert("this is not able to be done");
                    return;
                }
                this.nextDirection = newDirection;
            
            };
            
            var Apple = function () {
                this.position = new Block(10, 10);
            };
            
            Apple.prototype.draw = function () {
                this.position.drawCircle("#FF0000");
            };
            
            Apple.prototype.move = function () {
                var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
                var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
                this.position = new Block(randomCol, randomRow);
            };
            var snake = new Snake();
            var apple = new Apple();
            
            var intervalid = setInterval(function () {
                ctx.clearRect(0, 0, width, height);
                drawScore();
                snake.move();
                snake.draw();
                apple.draw();
                drawBorder();
            }, snakeMovementInterval);
            
            var directions = {
                37: "left",
                38: "up",
                39: "right",
                40: "bottom"
            };
            
            $(document).keydown(function (event) {
                var keyPressed = event.which;
                var newDirection = directions[event.keyCode];
                if (newDirection !== undefined) {
                    snake.setDirection(newDirection)
                }
            });
            
            
   