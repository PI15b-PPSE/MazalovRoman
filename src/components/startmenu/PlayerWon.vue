<template>
    <div class="wrapper">
        <div class="header">
            <p><span class="star">&#1645;</span> YOU WON <span class="star">&#1645;</span></p>
        </div>
        <div class="second-row">
            <div class='column'>
                <img src="/assets/images/bdd_ending.png"></img>
            </div>
        </div>
    </div>
</template>

<script>

/**
 * Компонент PlayerWon
 *
 * Компонент третей страницы стартового меню. На странице выводится список
 * персонажей. На этой страницк игрок выбирает персонажа, за которого он хочет
 * сыграть.
 *
 * @author      Роман Мазалов
 * @version     1.0.0
 * @copyright   The GNU General Public Lisense v3.0
 * @todo        Реализовать выбор персонажа и переход на следующую страницу
 */

export default {
    /**
     * Имя компонента.
     *
     * Имя компонента страницы стартового меню. Используется имя StartMenuPage3.
     *
     * @var     string name
     */
    name: 'playerwon',
    data () {
        return {}
    },
    methods: {
        keyHandler (e) {
            if (e.keyCode == 13) {
                this.tryAgain()
            }
        },
        tryAgain() {
            this.$parent.resetPageQueue()
            this.$parent.switchPage('StartMenuPage1')
        }
    },
    created () {
        window.addEventListener('keypress', this.tryAgain)
    },
    destroyed () {
        window.removeEventListener('keypress', this.tryAgain)
    }
}
</script>

<style scoped>
.wrapper {
    display: flex;
    flex-flow: column;
    height: 100%;
}

.header {
    flex: 0 1 auto;
}

.header p {
    color: #fff;
    font-size: 24px;
}

.column {
    margin: 0 auto;
    width: 550px;
}

.second-row {
    height: 100%;
}

.second-row img {
    width: 100%;
}

.star {
    position: relative;
    font-size: 48px;
}
</style>
