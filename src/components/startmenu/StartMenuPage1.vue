<template>
    <div class='menu'>
        <div id="logo">
            <img src="/assets/images/bdd_logo.gif">
        </div>
        <h2>{{ ultimateTeam }}</h2>
        <div class="menuContent">
            <h3>{{ copyright }}</h3>
            <p v-for="item in menuContent" v-bind:key="item.id">
                {{ item.text }}
            </p>
        </div>
    </div>
</template>

<script>

/**
 * Компонент StartMenuPage1
 *
 * Компонент первой страницы стартового меню. На странице выводится название
 * игры, логотип, лицензия и кнопка для переключения на следующую страницу.
 *
 * @author      Роман Мазалов
 * @version     1.0.0
 * @copyright   The GNU General Public Lisense v3.0
 */

export default {
    /**
     * Имя компонента.
     *
     * Имя компонента страницы стартового меню. Используется имя StartMenuPage1.
     *
     * @var     string name
     */
    name: 'startmenupage1',

    /**
     * Функция данных
     *
     * Функция data () возвращает объект со свойствами данных компонента.
     * Компонент содержит одно свойства {@link ultimateTeam}, {@link copyright},
     * {@link menuContent}.
     *
     * @return      object      Возвращает объект со свойствами компонента
     */
    data () {
        return {
            /**
             * Название команды разработчиков
             *
             * @var     string ultimateTeam
             */
            ultimateTeam: '- the ultimate team -',

            /**
             * Авторские права разработчика ремейка
             *
             * @var     string copyright
             */
            copyright: '\u00A92018 fuxy',

            /**
             * Лицензия игры, отображаемая в нижней части страницы
             *
             * @var     array menuContent
             */
            menuContent: [
                { text: 'Licensed to tradewest by' },
                { text: 'Rare coin-it, inc.' }
            ]
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.pageContent {
    display: contents;
}

.menuContent {
    position: relative;
    top: 10%;
}
</style>
