const vm = new Vue({
    el: '#app',

    data: {
        remainingTime: 0,
        inputTime: '00:00:00',
        intervalId: null,
        isRunning: false,
        pausedTime: 0
    },

    watch: {
        inputTime(newValue) {
            const [hours, minutes, seconds] = newValue.split(':').map(Number);
            this.remainingTime = hours * 3600 + minutes * 60 + seconds;
        }
    },

    computed: {
        formattedTime() {
            const hours = Math.floor(this.remainingTime / 3600);
            const minutes = Math.floor((this.remainingTime % 3600) / 60);
            const seconds = this.remainingTime % 60;
            return `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
        }
    },

    methods: {
        // タイマーを開始する関数
        startTimer() {
            if (this.pausedTime > 0) {
                // 一時停止から再開する場合
                this.remainingTime = this.pausedTime;
                this.pausedTime = 0;
            } else {
                // 新しいタイマーを開始する場合
                const [hours, minutes, seconds] = this.inputTime.split(':').map(Number);
                this.remainingTime = hours * 3600 + minutes * 60 + seconds;
            }
            this.intervalId = setInterval(this.updateTimer, 1000);
            this.isRunning = true;
        },

        // タイマーを一時停止する関数
        pauseTimer() {
            clearInterval(this.intervalId);
            this.pausedTime = this.remainingTime;
            this.isRunning = false;
        },

        // タイマーをリセットする関数
        resetTimer() {
            clearInterval(this.intervalId);
            this.remainingTime = 0;
            this.inputTime = '00:00:00';
            this.isRunning = false;
        },

        // タイマーを更新する関数
        updateTimer() {
            if (this.remainingTime === 0) {
                clearInterval(this.intervalId);
                this.isRunning = false;
                alert('時間になりました！');
            } else {
                this.remainingTime--;
            }
        },

        // hhを増やす関数
        incrementHours() {
            const [hours, minutes, seconds] = this.inputTime.split(':').map(Number);
            const newHours = (hours + 1) % 24;
            this.inputTime = `${this.padZero(newHours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;
        },

        // mmを増やす関数
        incrementMinutes() {
            const [hours, minutes, seconds] = this.inputTime.split(':').map(Number);
            const newMinutes = (minutes + 1) % 60;
            let newHours = hours;
            if (newMinutes === 0) {
                newHours = (hours + 1) % 24;
            }
            this.inputTime = `${this.padZero(newHours)}:${this.padZero(newMinutes)}:${this.padZero(seconds)}`;
        },

        // ssを増やす関数
        incrementSeconds() {
            const [hours, minutes, seconds] = this.inputTime.split(':').map(Number);
            let newSeconds = (seconds + 1) % 60;
            let newMinutes = minutes;
            let newHours = hours;
            if (newSeconds === 0) {
                newMinutes = (minutes + 1) % 60;
                if (newMinutes === 0) {
                    newHours = (hours + 1) % 24;
                }
            }
            this.inputTime = `${this.padZero(newHours)}:${this.padZero(newMinutes)}:${this.padZero(newSeconds)}`;
        },
        
        padZero(value) {
            return value.toString().padStart(2, '0');
        }
    }
});