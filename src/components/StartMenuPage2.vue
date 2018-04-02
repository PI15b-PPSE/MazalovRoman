<template>
    <div class='pageContent'>
        <h2>{{ ultimateTeam }}</h2>
        <div class="menuContent">
            <ul>
                <li>1 player</li>
            </ul>
            <p id="press-enter">Press Enter</p>
        </div>
    </div>
</template>

<script>

/**
 * Компонент StartMenuPage2
 *
 * Компонент первой страницы стартового меню. На странице выводится название
 * игры, логотип, лицензия, кнопка для переключения на следующую страницу и
 * список с выбором режима игры.
 *
 * @author      Роман Мазалов
 * @version     1.0.0
 * @copyright   The GNU General Public Lisense v3.0
 */

export default {
    /**
     * Имя компонента.
     *
     * Имя компонента страницы стартового меню. Используется имя StartMenuPage2.
     *
     * @var     string name
     */
    name: 'StartMenuPage2',

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
    top: 35%;
}

#press-enter {
    color: #8B8710;
    animation: pulseFading 1s cubic-bezier(1,0,1,0) infinite;
}

@keyframes pulseFading {
    0% {opacity: 0.0;}
    50% {opacity: 1.0;}
    100% {opacity: 0.0;}
}
</style>
