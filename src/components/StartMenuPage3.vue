<template>
    <div class="wrapper">
        <div class="header header-background">
            <p>Select your character</p>
        </div>
        <div class="row header-background second-row-background">
            <div class="characters-box">
                <div class="character-box">
                    <img src="../assets/images/rash_icon.jpg">
                    <p>Rash</p>
                </div>
                <div class="character-box">
                    <img src="../assets/images/zitz_icon.jpg">
                    <p>Zitz</p>
                </div>
                <div class="character-box">
                    <img src="../assets/images/pimple_icon.jpg">
                    <p>Pimple</p>
                </div>
            </div>
        </div>
        <div class="row footer-background">
            <div class="characters-box">
                <div class="character-box">
                    <img src="../assets/images/billy_icon.jpg">
                    <p>Billy</p>
                </div>
                <div class="character-box">
                    <img src="../assets/images/jimmy_icon.jpg">
                    <p>Jimmy</p>
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
    name: 'StartMenuPage3'
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
    display: inline-block;
    text-transform: uppercase;
    color: #fff;
    font-size: 20px;
    border: 5px solid #fff;
    padding: 0 5px;
}

.header-background {
    background: url('../assets/images/page3_tile_1.jpg') repeat;
}

.second-row-background {
    background-position-y: 24px;
}

.footer-background {
    background: url('../assets/images/page3_tile_2.jpg') repeat;
}

.characters-box {
    display: inline-block;
    margin: 0 auto;
    height: 200px;
}

.character-box {
    float: left;
    height: auto;
    margin-right: 30px;
}

.character-box img {
    height: 150px;
    border: 5px solid #fff;
}

.character-box p {
    margin: 10px;
    text-transform: uppercase;
    color: #fff;
    font-size: 20px;
}

.row {
    flex: 1;
    padding: 20px;
}
</style>
