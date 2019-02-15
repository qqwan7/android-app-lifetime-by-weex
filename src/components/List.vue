<template>
    <div>
        <div class="header">
            致亲爱的您：截止今日{{curDate}},您已经走过了{{passNum}}{{type==='day'?'天':type==='month'?'月':type==='week'?'周':'年'}}。未来还有{{nextNum}}{{type==='day'?'天':type==='month'?'月':type==='week'?'周':'年'}}等着您去创造，且行且珍惜！
        </div>
        <div class="flex">
            <div class="item item-pass" :class="[type==='year'?'item-big':type==='week'||type==='day'?'item-small':'']" v-for="n in passNum" :key="'pass'+n" v-if="passNum>0"></div>
            <div class="item item-next" :class="[type==='year'?'item-big':type==='week'||type==='day'?'item-small':'']" v-for="n in nextNum" :key="n" v-if="nextNum>0"></div>
        </div>
        <div class="footer">无敌是多么多么寂寞。。。</div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                birthday: '1988.02.24',
                targetAge: 80,
                type: 'month',
                curDate: '',
                passNum: 3,
                nextNum: 6
            }
        },
        methods: {
            getCurDate () {
                const cur = new Date()
                this.curDate = cur.getFullYear() + '.' + (cur.getMonth() + 1) + '.' + cur.getDate()
            },
            setDate (time) {
                if (time === '') {
                    return new Date()
                }
                let cur = new Date()
                time.split('.').forEach((item, index) => {
                    if (index === 0) {
                        cur.setFullYear(item)
                    } else if (index === 1) {
                        cur.setMonth(parseInt(item) - 1)
                    } else if (index === 2) {
                        cur.setDate(item)
                    }
                })
                return cur
            },
            getPassNum () {
                const birth = this.setDate(this.birthday)
                const birthYear = parseInt(this.birthday.substring(0, 4))
                const targetYear = birthYear + this.targetAge
                const target = this.setDate(targetYear + this.birthday.substring(4, this.birthday.length))
                // console.log('--------' + birth.toDateString() + '--------' + target.toDateString())
                if (this.type === 'day') {
                    this.passNum = parseInt((new Date().getTime() - birth.getTime()) / (1000 * 3600 * 24))
                    this.nextNum = parseInt((target.getTime() - new Date().getTime()) / (1000 * 3600 * 24))
                } else if (this.type === 'week') {
                    this.passNum = parseInt((new Date().getTime() - birth.getTime()) / (1000 * 3600 * 24 * 7))
                    this.nextNum = parseInt((target.getTime() - new Date().getTime()) / (1000 * 3600 * 24 * 7))
                } else if (this.type === 'month') {
                    this.passNum = (new Date().getFullYear() - birth.getFullYear()) * 12
                    if (new Date().getMonth() > birth.getMonth()) {
                        this.passNum = this.passNum - (new Date().getMonth() - birth.getMonth())
                    } else {
                        this.passNum = this.passNum + 12 - (12 + new Date().getMonth() - birth.getMonth())
                    }
                    this.nextNum = this.targetAge * 12 - this.passNum
                } else if (this.type === 'year') {
                    this.passNum = new Date().getFullYear() - birth.getFullYear()
                    this.nextNum = this.targetAge - this.passNum
                }
                console.log('------' + this.passNum + '---' + this.nextNum)
            }
        },
        mounted () {
            this.getCurDate()
            this.getPassNum()
        }
    }
</script>
<style scoped>
    .flex {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
    }
    .item {
        width: 15px;
        height: 15px;
        border-width: 1px;
        border-style: solid;
        border-color: rgb(255, 255, 255);
        background-color: #b9c7da;
    }
    .item-big {
        width: 30px;
        height: 30px;
    }
    .item-small {
        width: 10px;
        height: 10px;
    }
    .item-pass {
        background-color: #b9c7da;
    }
    .item-next {
        background-color: #41c57c;
    }
</style>
