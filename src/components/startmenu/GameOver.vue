<template>
    <div class="wrapper">
        <div class="header header-background">
            <p><span class="star">&#1645;</span> GAME OVER <span class="star">&#1645;</span></p>
        </div>
        <div class="second-row">
            <div class='column'>
                <p class="second-row-p"><img src="/assets/images/eagle.jpg"></img> CALL YOURSELVES THE ULTIMATE TEAM? DON'T MAKE ME LAUGH!</p>
                <div class="characters-box">
                    <div class="character-box">
                        <img src="/assets/images/rash_crashed_icon.png">
                        <p><span class="character-name">Rash</span></p>
                    </div>
                    <button v-on:click="tryAgain" class="try-button">TRY AGAIN</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

/**
 * Компонент GameOver
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
    name: 'gameover',
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
            this.$parent.switchPage('StartMenuPage3')
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

.second-row p img {
    float: left;
}

.second-row-p {
    display: inline-block;
    text-transform: uppercase;
    color: #fff;
    font-size: 20px;
    border: 5px solid #c7b901;
    border-radius: 5px;
    background-color: #000;
    box-shadow: 10px 8px rgba(0, 0, 0, .7);
    padding: 10px;
    width: 500px;
}

.column {
    margin: 0 auto;
    width: 550px;
}

.header-background {
    background: #015000;
}

.second-row {
    background: url('/assets/images/page3_tile_1.jpg') repeat;
    height: 100%;
}

.characters-box {
    margin: 0 auto;
    height: 200px;
}

.try-button {
    display: inline-block;
    text-transform: uppercase;
    color: #c7b901;
    font-family: 'NintendoNES', Helvetica, Arial, sans-serif;
    font-size: 20px;
    border: 5px solid #c7b901;
    border-radius: 5px;
    background-color: #000;
    box-shadow: 10px 8px rgba(0, 0, 0, .7);
    padding: 10px;
    float: left;
    margin-left: 10px;
    margin-top: 50px;
}

.character-box {
    float: right;
    height: auto;
    margin-right: 10px;
}

.character-box img {
    height: 150px;
    border: 5px solid #c7b901;
    border-radius: 5px;
    box-shadow: 10px 10px rgba(0, 0, 0, .7);
}

.character-box p {
    margin: 10px;
    text-transform: uppercase;
    color: #c7b901;
    font-size: 20px;
}

.character-name {
    background-color: #000;
}

.row {
    flex: 1;
    padding: 10px;
}

.selected img {
    border: 8px solid #fff;
}

.star {
    position: relative;
    font-size: 48px;
}
</style>
