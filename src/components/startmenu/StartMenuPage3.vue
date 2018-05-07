<template>
    <div class="wrapper">
        <div class="header-background">
            <div class="header">
                <p>Select your character</p>
            </div>
            <div class="row second-row-background">
                <div class="characters-box">
                    <div class="character-box"
                    v-bind:class="selectedCharacter === RASH ? selectedClass : ''">
                        <img src="/assets/images/rash_icon.jpg">
                        <p><span class="character-name">Rash</span></p>
                    </div>
                    <div class="character-box"
                    v-bind:class="selectedCharacter === ZITZ ? selectedClass : ''">
                        <img src="/assets/images/zitz_icon.jpg">
                        <p><span class="character-name">Zitz</span></p>
                    </div>
                    <div class="character-box"
                    v-bind:class="selectedCharacter === PIMPLE ? selectedClass : ''">
                        <img src="/assets/images/pimple_icon.jpg">
                        <p><span class="character-name">Pimple</span></p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row footer-background">
            <div class="characters-box">
                <div class="character-box"
                    v-bind:class="selectedCharacter === BILLY ? selectedClass : ''">
                    <img src="/assets/images/billy_icon.jpg">
                    <p><span class="character-name">Billy</span></p>
                </div>
                <div class="character-box"
                    v-bind:class="selectedCharacter === JIMMY ? selectedClass : ''">
                    <img src="/assets/images/jimmy_icon.jpg">
                    <p><span class="character-name">Jimmy</span></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

/**
 * Компонент StartMenuPage3
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
    name: 'startmenupage3',
    data () {
        return {
            RASH: 0,
            ZITZ: 1,
            PIMPLE: 2,
            BILLY: 3,
            JIMMY: 4,
            CHARACTERS_COUNT: 5,
            selectedCharacter: 0,
            selectedClass: 'selected'
        }
    },
    methods: {
        selectCharacter (e) {
            if (e.keyCode === 37) {
                if (this.selectedCharacter > 0) {
                    --this.selectedCharacter
                }
            }

            if (e.keyCode === 39) {
                if (this.selectedCharacter < this.CHARACTERS_COUNT - 1) {
                    ++this.selectedCharacter
                }
            }
        }
    },
    created () {
        window.addEventListener('keypress', this.selectCharacter)
    },
    destroyed () {
        window.removeEventListener('keypress', this.selectCharacter)
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
    padding: 30px 0 0 0;
    flex: 0 1 auto;
}

.header p {
    display: inline-block;
    text-transform: uppercase;
    color: #c7b901;
    font-size: 20px;
    border: 5px solid #c7b901;
    border-radius: 5px;
    background-color: #000;
    box-shadow: 10px 8px rgba(0, 0, 0, .7);
    padding: 7px 5px 2px 5px;
}

.header-background {
    background: url('/assets/images/page3_tile_1.jpg') repeat;
}

.second-row-background {
    background-position-y: 24px;
}

.footer-background {
    box-shadow: 0px -35px rgba(0, 0, 0, .7);
    background: url('/assets/images/page3_tile_2.jpg') repeat;
}

.characters-box {
    display: inline-block;
    margin: 0 auto;
    height: 200px;
}

.character-box {
    position: relative;
    bottom: -28px;
    z-index: 1;
    float: left;
    height: auto;
    margin-right: 30px;
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
</style>
