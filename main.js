var app = new Vue({
    el: '#app',
    data: {
        //1~9 array
        tenth_num: Array.from(new Array(9).keys(),x => (x + 1)*10),
        //used number
        set_num: 0,
        row_nums: Array(11),
        col_nums: '',
        answers:[ 
            {row_ans: Array(10)},
            {row_ans: Array(10)},
            {row_ans: Array(10)},
            {row_ans: Array(10)},
            {row_ans: Array(10)},
            {row_ans: Array(10)},
            {row_ans: Array(10)},
            {row_ans: Array(10)},
            {row_ans: Array(10)},
            {row_ans: Array(10)}
        ],
        checked_ans:[Array(100)],
        correct_num: 0,
        
        //timer
        animateFrame: 0,
        now_time: 0,
        diff_time: 0,
        start_time: 0,
        isruntimer: false
    },
    computed: {
        hours: function() {
            return Math.floor(this.diff_time / 1000 / 60 / 60);
        },
        minutes: function() {
            return Math.floor(this.diff_time / 1000 / 60) % 60;
        },
        seconds: function() {
            return Math.floor(this.diff_time / 1000) % 60;
        },
        mseconds: function() {
            return Math.floor(this.diff_time % 1000);
        }
    },
    methods: {
        randomArray: function(array) {
            for(i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1))
                var tmp = array[i];
                array[i] = array[j];
                array[j] = tmp;
            }
        },
        //set rownumber and colnumber
        generate: function() {
            this.clearTable();
            this.row_nums = '';
            this.row_nums = Array.from(new Array(10).keys(),x => x + Number(this.set_num));
            this.randomArray(this.row_nums);
            this.row_nums.splice(0,0,'x');
            this.col_nums = Array.from(new Array(10).keys(),x => x + Number(this.set_num));
            this.randomArray(this.col_nums);

            this.clearTimer();
            this.startTimer();
        },
        doScoring: function() {
            this.correct_num = 0;
            for(var num=0; num<100;num++ ) {
                var r = num%10;
                var c = Math.floor(num/10);
                if(this.answers[c].row_ans[r]==this.row_nums[r+1]*this.col_nums[c]) {
                    this.checked_ans.splice(num,1,"green");
                    this.correct_num+=1;
                } else {
                    this.checked_ans.splice(num,1,"red");
                }
            };

            this.stopTimer();
        },

        clearTable: function() {
            this.answers=[ 
                {row_ans: Array(10)},
                {row_ans: Array(10)},
                {row_ans: Array(10)},
                {row_ans: Array(10)},
                {row_ans: Array(10)},
                {row_ans: Array(10)},
                {row_ans: Array(10)},
                {row_ans: Array(10)},
                {row_ans: Array(10)},
                {row_ans: Array(10)}
            ];
            this.checked_ans=[Array(100).fill("black")];
            this.correct_num= 0;
            },
        setStartTime: function(time) {
            var time = typeof time !== 'undefined' ? time: 0;
            this.start_time = Math.floor(performance.now() - time);
        },
        startTimer: function() {
            var vm = this;
            vm.isruntimer = true;
            vm.setStartTime(vm.diff_time);
            (function loop() {
                vm.now_time = Math.floor(performance.now());
                vm.diff_time = vm.now_time - vm.start_time;
                vm.animateFrame = requestAnimationFrame(loop);
            }());
        },
        stopTimer: function() {
            this.isruntimer = false;
            cancelAnimationFrame(this.animateFrame);
        },
        clearTimer: function() {
            this.start_time = 0;
            this.now_time = 0;
            this.diff_time = 0;
            this.animateFrame = 0;
        }
    },
    filters: {
        zeroPad: function(value, num) {
            var num = typeof num !== 'undefined' ? num : 2;
            return value.toString().padStart(num, "0");
        }
    }
})